package com.rugbyaholic.communityPG.comms;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;

public class PostRating {

	private AuthenticatedUser rater;

	private int rating;

	private Date ratedAt;
	
	private List<PostRating> goodRatings;
	
	private List<PostRating> badRatings;

	
	
	public List<PostRating> getGoodRatings() {
		return goodRatings;
	}

	public void setGoodRatings(List<PostRating> goodRatings) {
		this.goodRatings = goodRatings.stream().filter(p -> p.getRating() == 1).collect(Collectors.toList());
	}

	public List<PostRating> getBadRatings() {
		return badRatings;
	}

	public void setBadRatings(List<PostRating> badRatings) {
		this.badRatings = badRatings.stream().filter(p -> p.getRating() == -1).collect(Collectors.toList());
	}

	
	
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
	
	public Date getRatedAt() {
		return ratedAt;
	}

	public void setRatedAt(Date ratedAt) {
		this.ratedAt = ratedAt;
	}

}