package com.rugbyaholic.communityPG;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;

import com.rugbyaholic.communityPG.common.util.NotificationMessage;
import com.rugbyaholic.communityPG.manage.users.UserManagementService;
import com.rugbyaholic.communityPG.manage.users.UserRegistrationForm;

@Controller
public class RootController {
	
	@Autowired
	private UserManagementService service;
	
	@Autowired
	private NotificationMessage notificationMessage;

	@GetMapping("/")
	public String onActivated(Model model) {
		return "Top.html";
		// return "errorPage.html";
	}
	
	@GetMapping("/Login.html")
	public String onLoginRequested() {
		return "Login.html";
	}
	
	@PostMapping("/Login.err")
	public String onLoginFailed(@RequestAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) 
								AuthenticationException ex,
								Model model) {
		model.addAttribute("authenticationException", ex);
		return "Login.html";
	}
	
	// 初期登録時の処理
	@PostMapping("/UserRegistration.do")
	public String onInitialUserRequested(@Valid @ModelAttribute UserRegistrationForm registrationForm,
			BindingResult bindingResult, Model model) {
		try {
			if(service.isMail(registrationForm.getEmail()) != 0) throw new Exception();
			service.registerInitialUser(registrationForm.getEmail(), registrationForm.getPassword());
		} catch(Exception ex) {
			model.addAttribute("notificationMessage",
					notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_ERROR)
							.messageCode("AbstractUserDetailsAuthenticationProvider.badCreations").build());
		}
		return "Login.html";
	}
	
}