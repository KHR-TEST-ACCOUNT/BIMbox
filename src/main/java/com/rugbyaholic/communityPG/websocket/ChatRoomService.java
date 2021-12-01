package com.rugbyaholic.communityPG.websocket;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

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
		if(Objects.isNull(toUserId)) {
			toUserId = repository.findMostFirstOfUser(user.getId());
		}
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
	 * チャットメッセージをのDelete_flgを１に変更する
	 * 
	 * @param id
	 * @param user
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void deleteMessageHist(ChatMessage chatMessage) throws Exception {
		repository.deleterMessageHist(chatMessage.getMsgId(), chatMessage.getFromUserId());
	}

	
	/**
	 * メッセージを復元する
	 * 
	 * @param msgId
	 * @param user
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void restoreMessageHist(ChatMessage chatMessage) throws Exception {
		repository.restoreMessageHist(chatMessage.getMsgId(), chatMessage.getFromUserId());
	}
	
	
	/**
	 * デモ用の削除メソッド
	 * 
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void deleteMessageHistDemo() throws Exception {
		repository.deleterMessageHistFor3Minute();	}
	
}