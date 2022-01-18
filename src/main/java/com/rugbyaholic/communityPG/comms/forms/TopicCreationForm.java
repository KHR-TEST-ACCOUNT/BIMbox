package com.rugbyaholic.communityPG.comms.forms;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.common.ImageFile;

public class TopicCreationForm implements Serializable {

	private static final long serialVersionUID = -7763715831163230164L;
		
	@NotBlank
	@Size(max = 64)
	private String subject;

	@NotBlank
	@Size(max = 640)
	private String primaryPost;

	private MultipartFile uploadFile;
	
	private ImageFile primaryPostImg = new ImageFile();
	
	private String postImgEncodeString;
	
	private String topicNo;

	
	private boolean error;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getPrimaryPost() {
		return primaryPost;
	}

	public MultipartFile getUploadFile() {
		return uploadFile;
	}

	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	
	public ImageFile getPrimaryPostImg() {
		return primaryPostImg;
	}

	public void setPrimaryPostImg(ImageFile primaryPostImg) {
		this.primaryPostImg = primaryPostImg;
	}

	public void setPrimaryPost(String primaryPost) {
		this.primaryPost = primaryPost;
	}
	
	public String getPostImgEncodeString() {
		return postImgEncodeString;
	}
	
	public void setPostImgEncodeString(String postImgEncodeString) {
		this.postImgEncodeString = postImgEncodeString;
	}
	
	public String getTopicNo() {
		return topicNo;
	}

	public void setTopicNo(String topicNo) {
		this.topicNo = topicNo;
	}

	public boolean isError() {
		return error;
	}

	public void setError(boolean error) {
		this.error = error;
	}

}