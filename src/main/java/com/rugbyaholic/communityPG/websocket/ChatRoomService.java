package com.rugbyaholic.communityPG.websocket;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.comms.repositories.ChatRoomRepository;

@Service
public class ChatRoomService {

	@Autowired
	private ChatRoomRepository repository;

	/**
	 * チャット中のユーザーを取得
	 * 
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public List<ChatMessage> getConversationalUsers(AuthenticatedUser user) throws Exception {
		List<ChatMessage> conversationalUsers = repository.findConversationalUser(user.getId());
		return conversationalUsers;
	}

	/**
	 * メッセージ履歴を取得
	 * 
	 * @param user
	 * @param toUserId
	 * @return
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public List<ChatMessage> getMessageHist(AuthenticatedUser user, Long toUserId) throws Exception {
		List<ChatMessage> messageHist = repository.findMessages(user.getId(), toUserId);
		if(messageHist.isEmpty()) messageHist = Arrays.asList(new ChatMessage());
		return messageHist;
	}

	/**
	 * チャットメッセージをDBに格納する
	 * 
	 * @param chatMessage
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void registMessageInfo(ChatMessage chatMessage) throws Exception {
		repository.registerMessage(chatMessage);
	}

	/**
	 * チャットメッセージをDBに格納する
	 * 
	 * @param id
	 * @param user
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void deleteMessageHist(Long msgId, AuthenticatedUser user) throws Exception {
		repository.deleterMessageHist(msgId, user.getId());
	}

	@Transactional(rollbackFor = Throwable.class)
	public void restoreMessageHist(Long msgId, AuthenticatedUser user) throws Exception {
		repository.restoreMessageHist(msgId, user.getId());
	}
	
}