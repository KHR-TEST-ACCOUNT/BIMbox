package com.rugbyaholic.communityPG.websocket;

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

	@Transactional(rollbackFor = Throwable.class)
	public List<MessageForm> getConversationalUsers(AuthenticatedUser user) throws Exception {
		List<MessageForm> conversationalUsers = repository.findConversationalUser(user.getId());
		return conversationalUsers;
	}

	@Transactional(rollbackFor = Throwable.class)
	public List<MessageForm> getMessageHist(AuthenticatedUser user, Long toUserId) throws Exception {
		List<MessageForm> messageHist = repository.findMessages(user.getId(), toUserId);
		return messageHist;
	}

	@Transactional(rollbackFor = Throwable.class)
	public void registMessageInfo(ChatMessage chatMessage) throws Exception {
		repository.registerMessage(chatMessage);
	}

}