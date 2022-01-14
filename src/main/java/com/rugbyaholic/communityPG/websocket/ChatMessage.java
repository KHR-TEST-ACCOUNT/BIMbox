package com.rugbyaholic.communityPG.websocket;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.common.ImageFile;

public class ChatMessage {
	private MessageType type;
	private long msgId;
	private long fromUserId;
	private String fromUser;
	private ImageFile fromUserIcon = new ImageFile();
	private String content;
	private ImageFile messageImg;
	// Demo
	private String encodedString;
	private MultipartFile uploadFile;
	private Timestamp sentAvf;
	private String AVF;
	private long toUserId;
	private String toUser;
	private ImageFile toUserIcon = new ImageFile();
	private int deleteFlg;

	// JSONの情報を格納する際に使用するコンストラクター
	public ChatMessage() {
	}

	// 初チャットかどうかを判別する
	public Boolean isHistories(List<ChatMessage> messageHist) {
		if(messageHist.isEmpty() || messageHist.get(0).fromUserId == 0) return false;
		return true;
	}
	
	// 初チャットかどうかを判別する
	public Boolean isForFirstTime(List<ChatMessage> messageHist, Long id) {
		for(ChatMessage chatUser : messageHist) {
			// Chatの履歴があれば非表示（False）
			if(chatUser.getToUserId() == id)  return false;
		}
		return true;
	}
	
	// FromUser, toUser を判別する
	public Boolean isUsersMessage(Long fromUserId, AuthenticatedUser user) {
		if(fromUserId != user.getId()) return false;
		return true;
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
		this.AVF = new SimpleDateFormat("M月d日 H:mm").format(sentAvf);
	}

	public Timestamp getSentAvf() {
		return sentAvf;
	}

	public String getAVF() {
		return AVF;
	}

	// Getter,Setter
	public long getMsgId() {
		return msgId;
	}

	public void setMsgId(long msgId) {
		this.msgId = msgId;
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

	public String getEncodedString() {
		return encodedString;
	}

	public void setEncodedString(String encodedString) {
		this.encodedString = encodedString;
		messageImg.setEncodedString(encodedString);
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

	public int getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(int deleteFlg) {
		this.deleteFlg = deleteFlg;
	}
}
