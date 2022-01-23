//package com.rugbyaholic.communityPG.websocket;
//
//import java.sql.Timestamp;
//import java.text.SimpleDateFormat;
//
//import org.springframework.web.multipart.MultipartFile;
//
//public class MessageForm {
//	private long fromUserId;
//    private String fromUser;
//    private String content;
////	private ImageFile messageImg = new ImageFile();
//	private MultipartFile uploadFile;
//	private String AVF;
//	private Timestamp sentAvf;
//    private long toUserId;
//    private String toUser;
//
//	public MessageForm(Long toUserId) {
//		this.toUserId = toUserId;
//	}
//
//	public void setSentAvf(Timestamp sentAvf) {
//		// ブレークポイント
////		this.sentAvf = new SimpleDateFormat("yyyy年MM月dd日 hh:mm a").format(sentAvf);
//		this.sentAvf = sentAvf;
//		this.AVF = new SimpleDateFormat("yyyy年MM月dd日 h:mm a").format(sentAvf);
//	}
//	
//	public Timestamp getSentAvf() {
//		return sentAvf;
//	}
//
//	public String getAVF() {
//		return AVF;
//	}
//	
//	public long getFromUserId() {
//		return fromUserId;
//	}
//
//	public void setFromUserId(long fromUserId) {
//		this.fromUserId = fromUserId;
//	}
//
//	public String getFromUser() {
//		return fromUser;
//	}
//
//	public void setFromUser(String fromUser) {
//		this.fromUser = fromUser;
//	}
//
//	public String getContent() {
//		return content;
//	}
//
//	public void setContent(String content) {
//		this.content = content;
//	}
//
////	public ImageFile getMessageImg() {
////		return messageImg;
////	}
////
////	public void setMessageImg(ImageFile messageImg) {
////		this.messageImg = messageImg;
////	}
//
//	public MultipartFile getUploadFile() {
//		return uploadFile;
//	}
//
//	public void setUploadFile(MultipartFile uploadFile) {
//		this.uploadFile = uploadFile;
//	}
//
//	public long getToUserId() {
//		return toUserId;
//	}
//
//	public void setToUserId(long toUserId) {
//		this.toUserId = toUserId;
//	}
//
//	public String getToUser() {
//		return toUser;
//	}
//
//	public void setToUser(String toUser) {
//		this.toUser = toUser;
//	}
//
//}
