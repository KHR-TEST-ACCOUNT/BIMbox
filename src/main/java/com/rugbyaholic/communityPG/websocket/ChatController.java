package com.rugbyaholic.communityPG.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.auth.account.ProfileService;

@Controller
public class ChatController {

	
	@Autowired
	private ChatRoomService service;
	
	@Autowired
	private ProfileService profileService;
	
	
	// サジェストされたユーザーを追加。
	@GetMapping("/conversationTo/chatRoom.html")
	public String conversationDo(Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		service.deleteMessageHistDemo();
		model.addAttribute("profileEditForm", profileService.providePersonalInfo(user));
		model.addAttribute("conversationalUsers", service.getConversationalUsers(user)); 
		return "UserSugest.html";
	}

	
	// Ajaxの非同期通信で実装。最初の画面はHiddenで非表示にする。
	@GetMapping("/chatRoom.html")
	public String toEnterToChatRoom(@RequestParam(value = "id", required = true) Long id,
				 Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		service.deleteMessageHistDemo();
		model.addAttribute("messageHist", service.getMessageHist(user, id)); 
		model.addAttribute("idSet", new ChatMessage(user.getId(), id)); 
		return "chatRoom.html";
	}

	
    // メッセージをDBに登録する
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage,
    		 @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		service.registMessageInfo(chatMessage);
		user = profileService.provideUserInfo(chatMessage.getFromUserId());
		chatMessage.setFromUserIcon(user.getProfileImage());
        return chatMessage;
    }
 
    
    // メッセージを削除する
    @MessageMapping("/chat.delete")
    @SendTo("/topic/public")
    public ChatMessage deleteMessage(@Payload ChatMessage chatMessage) throws Exception {
    	service.deleteMessageHist(chatMessage);
    	return chatMessage;
    }
    
    
    // メッセージを復元する
    @MessageMapping("/chat.restore")
    @SendTo("/topic/public")
    public ChatMessage toRestoreMessage(@Payload ChatMessage chatMessage) throws Exception {
    	service.restoreMessageHist(chatMessage);
    	return chatMessage;
    }


//    
//    // メッセージを削除する（週次のバッチで完全に削除する。）
//    @GetMapping("/websocket/DeleteMessage.do")
//    public String toDeleterMessage(@RequestParam(value = "id", required = true) Long msgId,
//    			Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
//    	//service.deleteMessageHist(msgId, user);
//    	return "redirect:/chatRoom.html";
//    }
    
    
//    // メッセージを復元する
//    @GetMapping("/websocket/restoreMessage.do")
//    public String toRestoreMessage(@RequestParam(value = "id", required = true) Long msgId,
//    		Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
//    	service.restoreMessageHist(msgId, user);
//    	return "redirect:/chatRoom.html";
//    }
    
}
