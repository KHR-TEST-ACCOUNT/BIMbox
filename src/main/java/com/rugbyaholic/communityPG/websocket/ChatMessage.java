package com.rugbyaholic.communityPG.websocket;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.common.ImageFile;

public class ChatMessage {
    private MessageType type;
	private long fromUserId;
    private String fromUser;
    private ImageFile fromUserIcon = new ImageFile();
    private String content;
//    private ImageFile messageImg = new ImageFile();
	private ImageFile messageImg;
	private MultipartFile uploadFile;
	private Timestamp sentAvf;
	private String AVF;
    private long toUserId;
    private String toUser;
    private ImageFile toUserIcon = new ImageFile();
    
	// JSONの情報を格納する際に使用するコンストラクター
    public ChatMessage() {
    }
    // メッセージの記録がない場合に送信先のIDを格納しインスタンスを生成するための処理
    public ChatMessage(Long fromUserId, Long toUserId) {
    	this.fromUserId = fromUserId;
		this.toUserId = toUserId;
    }
    // 格納したメッセージタイプ
    public enum MessageType {
    	CHAT, LEAVE, JOIN
    }
	public MessageType getType() {
    	return type;
    }
    public void setType(MessageType type) {
    	this.type = type;
    }
    // 日付をString型に変換
	public void setSentAvf(Timestamp sentAvf) {
		this.sentAvf = sentAvf;
		this.AVF = new SimpleDateFormat("yyyy年M月d日 H:mm").format(sentAvf);
	}
	public Timestamp getSentAvf() {
		return sentAvf;
	}
	public String getAVF() {
		return AVF;
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
	public ImageFile getFromUserIcon() {
		return fromUserIcon;
	}
	public void setFromUserIcon(ImageFile fromUserIcon) {
		this.fromUserIcon = fromUserIcon;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public ImageFile getMessageImg() {
		return messageImg;
	}
	public void setMessageImg(ImageFile messageImg) {
		this.messageImg = messageImg;
	}
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
	public ImageFile getToUserIcon() {
		return toUserIcon;
	}
	public void setToUserIcon(ImageFile toUserIcon) {
		this.toUserIcon = toUserIcon;
	}
}
