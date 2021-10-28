package com.rugbyaholic.communityPG.comms.repositories;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.rugbyaholic.communityPG.websocket.ChatMessage;
import com.rugbyaholic.communityPG.websocket.MessageForm;

@Mapper
public interface ChatRoomRepository {
	
	public void registerMessage(@Param("msgInfo") ChatMessage msgInfo);
	
	public List<MessageForm> findMessages(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);
	
	public List<MessageForm> findConversationalUser(@Param("userId") Long userId);
		
}