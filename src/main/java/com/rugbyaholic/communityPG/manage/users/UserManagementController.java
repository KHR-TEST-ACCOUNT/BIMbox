package com.rugbyaholic.communityPG.manage.users;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.common.ui.SearchResult;
import com.rugbyaholic.communityPG.common.util.NotificationMessage;

@Controller
@Scope("session")
public class UserManagementController {

	@Autowired
	private UserManagementService service;

	@Autowired
	private NotificationMessage notificationMessage;

	private UserSearchForm form;

	// 初期表示
	@GetMapping("/manage/users/UserList.html")
	public String onUserListRequested(Model model) {
		model.addAttribute("userSearchForm", service.initializeSearchForm());
		return "redirect:/manage/users/UserSearch.do";
	}

	// ユーザー登録・変更処理
	@PostMapping("/manage/users/UserRegistration.do")
	public String onUserUpdateRequested(@Valid @ModelAttribute UserRegistrationForm userRegistrationForm,
			BindingResult bindingResult, @AuthenticationPrincipal AuthenticatedUser user, Model model) {
		if (bindingResult.hasErrors()) {
			service.restoreRegistrationForm(userRegistrationForm);
			model.addAttribute("userRegistrationForm", userRegistrationForm);
			return "/manage/users/UserRegistration.html";
		} else {
			try {
				service.registerUser(userRegistrationForm, user);
				model.addAttribute("userRegistrationForm",
						service.initializeRegistrationForm(userRegistrationForm.getUser().getId(), user));
				model.addAttribute("notificationMessage",
						notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_SUCCESS)
								.messageCode("communityPG.web.message.proc.success").build());
			} catch (Exception e) {
				System.out.print(e);
				return "/errorPage.html";
			}
			return "/manage/users/UserRegistration.html";
		}
	}

	// ユーザー情報を削除
	@PostMapping("/manage/users/UserDelete.do")
	public String onUserDeleteRequested(@ModelAttribute UserRegistrationForm userRegistrationForm, Model model,
				@AuthenticationPrincipal AuthenticatedUser user) {
		
		try {
			Long userID = userRegistrationForm.getUser().getId();
			// ユーザーIDがログイン中のユーザーと同一の場合はエラーを表示。
			if(userID == user.getId()) {
				model.addAttribute("userRegistrationForm",
						service.initializeRegistrationForm(userID, user));
				model.addAttribute("notificationMessage",
						notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_ERROR)
								.messageCode("communityPG.web.message.proc.notDeletable").build());
				return "/manage/users/UserRegistration.html";
			}
			// ユーザーを削除し検索画面へ遷移
			service.userDeleteForm(userID);
			this.form = service.initializeSearchForm();
			service.convertSerchForm(form, model);
			// 処理完了メッセージの追加
			model.addAttribute("notificationMessage",
					notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_SUCCESS)
							.messageCode("communityPG.web.message.proc.success").build());
		} catch (Exception e) {
			System.out.print(e);
			return "/errorPage.html";
		}
		return "manage/users/UserList.html";
	}
	
	// ユーザー登録画面に遷移
	@GetMapping("/manage/users/UserRegistration.html")
	public String onUserRegistrationRequested(@RequestParam(value = "id", required = false) Long id, Model model,
			@AuthenticationPrincipal AuthenticatedUser user) {
		
		try {
			UserRegistrationForm form = service.initializeRegistrationForm(id, user);
			model.addAttribute("userRegistrationForm", form);
		} catch (Exception e) {
			System.out.print(e);
			return "/errorPage.html";
		}
		return "manage/users/UserRegistration.html";
	}

	@GetMapping("/manage/users/UserPageView.do")
	public String onPageViewRequested(@RequestParam("p") int pageNo, Model model,
			@AuthenticationPrincipal AuthenticatedUser user) {
		model.addAttribute("userSearchForm", form);
		SearchResult<AuthenticatedUser> searchResult = new SearchResult<>(service.countUser(form), UserManagementService.PAGE_LIMIT);
		if (pageNo < 1 || pageNo > searchResult.getTotalPageCount()) {
			return "manage/users/UserList.html";
		}
		searchResult.moveTo(pageNo);
		form.setPageFrom((pageNo - 1) * UserManagementService.PAGE_LIMIT);
		searchResult.setEntities(service.loadUserList(form));
		searchResult.setLoginUserId(user.getId());
		model.addAttribute("searchResult", searchResult);
		return "manage/users/UserList.html";
	}

	@GetMapping("/manage/users/UserSearch.do")
	public String onSearchRequested(@ModelAttribute UserSearchForm form, Model model) {
		this.form = form;
		service.convertSerchForm(form,model);
		return "manage/users/UserList.html";
	}
	
	/**
	 * 未入力項目はバリデーションの対象外とするメソッド
	 * 
	 * @param binder
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
	}
}