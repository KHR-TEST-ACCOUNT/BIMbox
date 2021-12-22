package com.rugbyaholic.communityPG.comms;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.common.ImageFile;

public class Post {

	private int postNo;

	private String postText;
	
	private ImageFile postImg;

	private Date postedAt;

	private AuthenticatedUser author;

	private List<PostRating> ratings;

	
	public boolean isFirstPost() {
		return postNo == 1;
	}

	
	public boolean isLastPost(List<Post> posts) {
		return postNo == posts.size();
	}
	
	
	public boolean is1OrMore(List<Post> posts) {
		return posts.size() > 1;
	}
	
	
	// ラムダでPostRatingの中に格納されているBeanの中から、Rantigを検索して返す。
	public PostRating getRateByUser(AuthenticatedUser user) {
		PostRating postRating = ratings.stream().filter(p -> Objects.equals(p.getRater().getId(), user.getId()))
				.findFirst().orElse(new PostRating());
		postRating.setGoodRatings(ratings);
		postRating.setBadRatings(ratings);
		return postRating;
	}

	// ログインユーザー 又は 管理者権限でない場合、Trueを返す。
	public boolean isPostedBy(AuthenticatedUser user) {
		return Objects.equals(user.getId(), author.getId()) || !user.getRoles().get(0).getCode().equals("03");
	}

	public int getPostNo() {
		return postNo;
	}

	public void setPostNo(int postNo) {
		this.postNo = postNo;
	}

	public String getPostText() {
		return postText;
	}

	public void setPostText(String postText) {
		this.postText = postText;
	}

	public ImageFile getPostImg() {
		return postImg;
	}

	public void setPostImg(ImageFile postImg) {
		this.postImg = postImg;
	}
	
	public Date getPostedAt() {
		return postedAt;
	}

	public void setPostedAt(Date postedAt) {
		this.postedAt = postedAt;
	}

	public AuthenticatedUser getAuthor() {
		return author;
	}

	public void setAuthor(AuthenticatedUser author) {
		this.author = author;
	}

	public List<PostRating> getRatings() {
		return ratings;
	}

	public void setRatings(List<PostRating> ratings) {
		this.ratings = ratings;
	}

}