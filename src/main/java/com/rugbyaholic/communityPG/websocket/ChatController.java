package com.rugbyaholic.communityPG.websocket;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.auth.account.ProfileService;
import com.rugbyaholic.communityPG.common.util.NotificationMessage;

@Controller
public class ChatController {

	
	@Autowired
	private ChatRoomService chatRoomService;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private NotificationMessage notificationMessage;
	
	// サジェストされたユーザーを追加。
	@GetMapping("/conversationTo/ChatRoom.html")
	public String conversationDo(@RequestParam(value = "id", required = false) Long toUserId, 
					Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		if(Objects.isNull(toUserId)) toUserId = chatRoomService.findMostFirst(user);
		List<ChatMessage> conversationalUsers = chatRoomService.getConversationalUsers(user, null);
		convertModelInit(user, toUserId, model, new ChatMessage(), conversationalUsers);
		return "websocket/UserSugest.html";
	}

	// 検索されたユーザーを追加。
	@PostMapping("/searchConversationDo/ChatRoom.html")
	public String searchConversationDo(@ModelAttribute ChatMessage chatMessage, Model model,
					@AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		// ユーザーを検索（時間で昇順）
		String searchWord = chatMessage.getSearchWord();
		List<ChatMessage> conversationalUsers = chatRoomService.getConversationalUsers(user, searchWord);
		
		if(conversationalUsers.isEmpty()) {
			// 検索結果がない場合はアラートでメセージを送信する。
			model.addAttribute("notificationMessage",
					notificationMessage.builder().messageLevel(NotificationMessage.MESSAGE_LEVEL_ERROR)
							.messageCode("communityPG.web.message.proc.notFind").build());
			Long toUserId = chatRoomService.findMostFirst(user);
			conversationalUsers = chatRoomService.getConversationalUsers(user, null);
			convertModelInit(user, toUserId, model, new ChatMessage(), conversationalUsers);
		} else {
			Long toUserId = conversationalUsers.get(0).getToUserId();
			convertModelInit(user, toUserId, model, chatMessage, conversationalUsers);
			model.addAttribute("chatMessage", new ChatMessage(searchWord)); 
		}
		return "websocket/UserSugest.html";
	}
	
	// Ajaxの非同期通信で実装。最初の画面はHiddenで非表示にする。
	@GetMapping("/ChatRoom.html")
	public String toEnterToChatRoom(@RequestParam(value = "id", required = true) Long id,
				 Model model, @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		chatRoomService.deleteMessageHistDemo();
		model.addAttribute("chatMessage", new ChatMessage()); 
		model.addAttribute("messageHist", chatRoomService.getMessageHist(user, id)); 
		model.addAttribute("idSet", new ChatMessage(user.getId(), id)); 
		return "websocket/ChatRoom.html";
	}

	
    // メッセージをDBに登録する
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage,
    		 @AuthenticationPrincipal AuthenticatedUser user) throws Exception {
//    	ImageFile messageImg = chatMessage.getMessageImg();
//    	if(messageImg != null) messageImg.setEncodeImgFile(messageImg);
    	chatRoomService.registMessageInfo(chatMessage);
    	Long msgId = chatRoomService.getLastMsgId(chatMessage);
		user = profileService.provideUserInfo(chatMessage.getFromUserId());
		chatMessage.setMsgId(msgId);
		chatMessage.setFromUserIcon(user.getProfileImage());
        return chatMessage;
    }
 
    
    // メッセージを削除する
    @MessageMapping("/chat.delete")
    @SendTo("/topic/public")
    public ChatMessage deleteMessage(@Payload ChatMessage chatMessage) throws Exception {
    	chatRoomService.deleteMessageHist(chatMessage);
    	return chatMessage;
    }
    
    
    // 後で実装
    public void convertModelInit(AuthenticatedUser user, Long toUserId, Model model,
				ChatMessage chatMessage, List<ChatMessage> conversationalUsers) throws Exception {
		chatRoomService.deleteMessageHistDemo();
		model.addAttribute("toUsersInfo", profileService.provideUserInfo(toUserId)); 
		model.addAttribute("messageHist", chatRoomService.getMessageHist(user, toUserId)); 
		model.addAttribute("conversationalUsers", conversationalUsers);
		model.addAttribute("chatMessage", new ChatMessage()); 
		model.addAttribute("idSet", new ChatMessage(user.getId(), toUserId)); 
    }
    
    
	/*
    // メッセージを復元する
    @MessageMapping("/chat.restore")
    @SendTo("/topic/public")
    public ChatMessage toRestoreMessage(@Payload ChatMessage chatMessage) throws Exception {
    	chatRoomService.restoreMessageHist(chatMessage);
    	return chatMessage;
    }

    
	// Chat中のユーザーを検索
	@GetMapping("/userSearchDo/ChatRoom.html")
	public String userSearchDo(@RequestParam(value = "id", required = true) Long toUserId, 
			@RequestParam(value = "content", required = true) String content, Model model, 
			@AuthenticationPrincipal AuthenticatedUser user) throws Exception {
		chatRoomService.deleteMessageHistDemo();
		model.addAttribute("toUsersInfo", profileService.provideUserInfo(toUserId)); 
		model.addAttribute("messageHist", chatRoomService.getMessageHist(user, toUserId)); 
		model.addAttribute("profileEditForm", profileService.providePersonalInfo(user));
		model.addAttribute("conversationalUsers", chatRoomService.getConversationalUsers(user)); 
		model.addAttribute("chatMessage", new ChatMessage()); 
		return "websocket/UserSugest.html";
	}
	 */
	
}
