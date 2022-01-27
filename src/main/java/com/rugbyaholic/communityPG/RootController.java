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
	

	// ログイン成功時のページ遷移
	@GetMapping("/")
	public String onActivated(Model model) {
		return "home/Top.html"; 
	}

	// ログイン画面遷移
	@GetMapping("/Login.html")
	public String onLoginRequested(Model model) {
		model.addAttribute("userRegistrationForm", new UserRegistrationForm());
		return "Login.html";
	}
	
	// ログインでのエラーメッセージを送信
	@PostMapping("/Login.err")
	public String onLoginFailed(@RequestAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) 
								AuthenticationException ex, Model model) {
		model.addAttribute("authenticationException", ex);
		return "Login.html";
	}
	
	// エラーページに遷移
	@GetMapping("/onError")
	public String onError() {
		return "errorPage.html";
	}
	
	
	// 初期登録時の処理
	@PostMapping("/userRegistrationDo")
	public String onInitialUserRequested(@Valid @ModelAttribute UserRegistrationForm registrationForm,
			BindingResult bindingResult, Model model) throws Exception {
		// Emailがあればエラーを表示する
		if(service.isMail(registrationForm.getEmail())) {
			model.addAttribute("notificationMessage",
					notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_ERROR)
					.messageCode("AbstractUserDetailsAuthenticationProvider.alreadyRegisteredIfEmail").build());
		} else {
			// User権限を設定
			registrationForm.setLoginUserRoles(service.isUserPermission());
			service.registerInitialUser(registrationForm);
			model.addAttribute("notificationMessage",
					notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_SUCCESS)
					.messageCode("communityPG.web.message.proc.success").build());
		}
		return "Login.html";
	}
	
}