package com.rugbyaholic.communityPG.comms.repositories;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.rugbyaholic.communityPG.websocket.ChatMessage;

@Mapper
public interface ChatRoomRepository {
	
	public void registerMessage(@Param("msgInfo") ChatMessage msgInfo);
	
	public List<ChatMessage> findMessages(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);
	
	public List<ChatMessage> findConversationalUser(@Param("userId") Long userId);
		
	public void deleterMessageHist(@Param("msgInfo") ChatMessage msgInfo);
	
	public void closerChatRoom(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);
	
}