package com.rugbyaholic.communityPG.comms;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.common.ImageFile;
import com.rugbyaholic.communityPG.common.aspects.LogRequired;
import com.rugbyaholic.communityPG.common.repositories.NumberingRepository;
import com.rugbyaholic.communityPG.comms.forms.TopicCreationForm;
import com.rugbyaholic.communityPG.comms.repositories.MeetingRoomRepository;

@Service
public class MeetingRoomService {

	@Autowired
	private NumberingRepository numberingRepository;

	@Autowired
	private MeetingRoomRepository meetingRoomRepository;

	@LogRequired
	public List<Topic> loadTopics(TopicSearchForm form) {
		return meetingRoomRepository.searchAllTopics(form);
	}

	/**
	 * @メソッド説明：		新規トピックトしてをDBに登録します。
	 * 
	 * @param form
	 * @param user
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public void registerNewTopic(TopicCreationForm form, AuthenticatedUser user) throws IllegalStateException, IOException {
		// トピック番号の発番
		String availYear = new SimpleDateFormat("yyyy").format(new Date());
		String issueNum = numberingRepository.issueNumber(NumberingRepository.NUMBERING_CODE_TOPICNO, availYear);
		form.setTopicNo(availYear + issueNum);
		
		MultipartFile uploadFile = form.getUploadFile();
		
		//　画像を保存
		if (!uploadFile.isEmpty()) {
			ImageFile primaryPostImg = new ImageFile();
			primaryPostImg.encode(uploadFile);
			form.setPostImgEncodeString(primaryPostImg.getEncodedString());
		}
		// 番号管理台帳の更新
		numberingRepository.next(NumberingRepository.NUMBERING_CODE_TOPICNO, availYear, user);
		// トピックテーブルへの新規登録
		meetingRoomRepository.registerTopic(form, user);
		// 投稿テーブルへの新規登録
		meetingRoomRepository.registerPost(form, user);
	}

	/**
	 * @メソッド説明：		新規の投稿を登録します。
	 * 
	 * @param form
	 * @param user
	 * @return
	 */
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public void appendPost(TopicCreationForm form, AuthenticatedUser user) {
		if(form.getPostImgEncodeString().isBlank()) form.setPostImgEncodeString(null);
		meetingRoomRepository.registerPost(form, user);
	}

	/**
	 * @メソッド説明：		投稿を編集するメソッドを呼び出します。
	 * 
	 * @param postText	投稿内容
	 * @param topicNo	トピック番号
	 * @param postNo	ポスト番号
	 * @return			投稿内容変更後の投稿一覧データを検索して返します。
	 */
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public void editPost(String postText, String postImg, String topicNo, int postNo) {
		if(postImg.isBlank()) postImg = null;
		meetingRoomRepository.editerPost(postText, postImg, topicNo, postNo);
	}

	/**
	 * @メソッド説明：		投稿を削除するメソッドを呼び出します。
	 * 
	 * @param postText	投稿内容
	 * @param topicNo	トピック番号
	 * @param postNo	ポスト番号
	 * @return			投稿内容削除後の投稿一覧データを検索して返します。
	 */
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public void deletePost(String topicNo, int postNo) {
		meetingRoomRepository.deleterPost(topicNo, postNo);
	}
	
	/**
	 * @メソッド説明：		投稿トピックを削除するメソッドを呼び出します。
	 * 
	 * @param topicNo	トピック番号
	 * @return			投稿トピック削除後の投稿一覧データを検索して返します。
	 */
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public List<Topic> deleteTopic(String topicNo) {
		meetingRoomRepository.deleterTopic(topicNo);
		return meetingRoomRepository.searchAllTopics(new TopicSearchForm());
	}
	
	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public Topic reloadTopic(String topicNo) {
		return meetingRoomRepository.findTopic(topicNo).orElse(new Topic());
	}

	@Transactional(rollbackFor = Throwable.class)
	@LogRequired
	public void postRating(String topicNo, int postNo, int rating, AuthenticatedUser user) {
		if (rating == meetingRoomRepository.currentRating(topicNo, postNo, user).orElse(0)) rating = 0;
		meetingRoomRepository.updateRating(topicNo, postNo, user, rating);
	}
}