package com.rugbyaholic.communityPG.comms;

import java.util.Date;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;

public class PostRating {

	private AuthenticatedUser rater;

	private int rating;

	private int ratingLow;
	
	private Date ratedAt;

	public AuthenticatedUser getRater() {
		return rater;
	}

	public void setRater(AuthenticatedUser rater) {
		this.rater = rater;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
	
	public int getRatingLow() {
		return ratingLow;
	}
	
	public void setRatingLow(int ratingLow) {
		this.ratingLow = ratingLow;
	}

	public Date getRatedAt() {
		return ratedAt;
	}

	public void setRatedAt(Date ratedAt) {
		this.ratedAt = ratedAt;
	}

}