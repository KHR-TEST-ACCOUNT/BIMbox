package com.rugbyaholic.communityPG.auth.account;

import java.util.Objects;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
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
import com.rugbyaholic.communityPG.common.util.NotificationMessage;

@Controller
public class ProfileController {

	@Autowired
	private ProfileService profileService;

	@Autowired
	private NotificationMessage notificationMessage;

	// プロフィール表示（ここにサジェスト機能を追加する。）
	@GetMapping("/profile/UserProfile.html")
	public String onProfileRequested(@RequestParam(value = "id", required = false) Long id, Model model,
			@AuthenticationPrincipal AuthenticatedUser user) {
		if(Objects.isNull(id)){
			model.addAttribute("targetUser", user);
		}else{
			model.addAttribute("targetUser",  profileService.provideUserInfo(id));
		}
		model.addAttribute("profileEditForm", profileService.providePersonalInfo(user));
		return "profile/UserProfile.html";
	}

	// プロフィール更新画面
	@GetMapping("/profile/Profile.html")
	public String onProfileRequested(@RequestParam(value = "id", required = true) Long id,
			 Model model) {
		AuthenticatedUser targetUser = profileService.provideUserInfo(id);
		model.addAttribute("profileEditForm", profileService.providePersonalInfo(targetUser));
		return "profile/Profile.html";
	}

	// プロフィールの更新処理
	@PostMapping("/profile/ProfileEdit.do")
	public String onProfileEditRequested(@Valid @ModelAttribute ProfileEditForm profileEditForm,
			BindingResult bindingResult, Model model, @AuthenticationPrincipal AuthenticatedUser user) {
		if (bindingResult.hasErrors()) {
			return "profile/Profile.html";
		}
		try {
			profileService.editProfile(profileEditForm, user);
		} catch (Exception e) {
			return "errorPage.html";
		}
		model.addAttribute("notificationMessage",
				notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_SUCCESS)
						.messageCode("communityPG.web.message.proc.success").build());
		// 初期表示
		AuthenticatedUser targetUser = profileService.provideUserInfo(profileEditForm.getUserId());
		model.addAttribute("targetUser", targetUser);
		model.addAttribute("profileEditForm", profileService.providePersonalInfo(targetUser));
		return "profile/UserProfile.html";
//		return "profile/Profile.html";
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