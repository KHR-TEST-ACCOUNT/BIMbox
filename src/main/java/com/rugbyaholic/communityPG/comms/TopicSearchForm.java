package com.rugbyaholic.communityPG.comms;

import java.util.Date;

import javax.validation.constraints.Size;

public class TopicSearchForm {

	@Size(max = 64)
	private String subjectContent;
	
	@Size(max = 640)
	private String postContent;
	
	private String createByUser;

	private Date postDate_from;
	
	private Date postDate_until;

	//Getter, Setter
	public String getSubjectContent() {
		return subjectContent;
	}

	public void setSubjectContent(String subjectContent) {
		this.subjectContent = subjectContent;
		if(subjectContent.isBlank()) this.subjectContent = null;
		
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
		if(postContent.isBlank()) this.postContent = null;
	}

	public String getCreateByUser() {
		return createByUser;
	}

	public void setCreateByUser(String createByUser) {
		this.createByUser = createByUser;
		if(createByUser.isBlank()) this.createByUser = null;
	}

	public Date getPostDate_from() {
		return postDate_from;
	}

	public void setPostDate_from(Date postDate_from) {
		this.postDate_from = postDate_from;
	}

	public Date getPostDate_until() {
		return postDate_until;
	}

	public void setPostDate_until(Date postDate_until) {
		this.postDate_until = postDate_until;
	}

}