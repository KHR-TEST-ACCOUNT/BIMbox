package com.rugbyaholic.communityPG.comms;

import java.util.Date;

public class TopicSearchForm {

	private String subject;

	private String postContent;
	
	private String createByUser;

	private Date postDate;

	//Getter, Setter
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

	public String getCreateByUser() {
		return createByUser;
	}

	public void setCreateByUser(String createByUser) {
		this.createByUser = createByUser;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

}