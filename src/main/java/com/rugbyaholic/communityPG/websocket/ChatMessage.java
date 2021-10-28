package com.rugbyaholic.communityPG.websocket;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

public class ChatMessage {
	//ここに格納された情報をDBに登録する。
    private String content;
    private String sender;
    private MessageType type;
    
	private long fromUserId;
    private String fromUser;
//	private ImageFile messageImg = new ImageFile();
	private MultipartFile uploadFile;
	private Timestamp sentAvf;
    private long toUserId;
    private String toUser;

//    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 hh:mm a");

    public enum MessageType {
    	CHAT, LEAVE, JOIN
    }
    
	public void setSentAvf(Timestamp sentAvf) {
		// ブレークポイント
		this.sentAvf = sentAvf;
	}
	public Timestamp getSentAvf() {
		return sentAvf;
	}

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }
	public long getFromUserId() {
		return fromUserId;
	}
	public void setFromUserId(long fromUserId) {
		this.fromUserId = fromUserId;
	}
	public String getFromUser() {
		return fromUser;
	}
	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}
//	public ImageFile getMessageImg() {
//		return messageImg;
//	}
//	public void setMessageImg(ImageFile messageImg) {
//		this.messageImg = messageImg;
//	}
	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	public long getToUserId() {
		return toUserId;
	}
	public void setToUserId(long toUserId) {
		this.toUserId = toUserId;
	}
	public String getToUser() {
		return toUser;
	}
	public void setToUser(String toUser) {
		this.toUser = toUser;
	}

//	public String getMessage() {
//		return content;
//	}
//
//	public void setMessage(String content) {
//		this.content = content;
//	}
	
    
    
}
