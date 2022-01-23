package com.rugbyaholic.communityPG.auth.account;

import java.util.Objects;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.common.ImageFile;
import com.rugbyaholic.communityPG.common.repositories.UserRepository;


@Service
public class ProfileService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	/**
	 * プロフィールの更新処理
	 * 
	 * @param form
	 * @param user
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void editProfile(ProfileEditForm form, AuthenticatedUser user) throws Exception {
		// DB更新件数
		int updateCount = 0;
		// DB登録用の画像ファイル名を生成
		MultipartFile uploadFile = form.getUploadFile();
		
		// （Profileタグ）自分以外のユーザー情報を更新する場合、Userに更新対象の情報を格納する。
		if(form.getUserId() != user.getId()) user = provideUserInfo(form.getUserId());
		// 名前変更時の処理
		if(!Objects.isNull(form.getName())) {
			if(!user.getUsername().equals(form.getName())) user.setUsername(form.getName());
		}
		// （Accontタグ）Email変更時の処理
		if(!Objects.isNull(form.getEmail())) {
			if(!user.getEmail().equals(form.getEmail())) user.setEmail(form.getEmail());
		}
		// （Accontタグ）パスワード更新時の処理
		if(!Objects.isNull(form.getPassword())) {
			user.setPassword(passwordEncoder.encode(form.getPassword()));
		}
		// (共通)ファイルアップロード時の処理
		if (!uploadFile.isEmpty()) {
			ImageFile imageFile = new ImageFile();
			imageFile.encode(uploadFile);
			user.setProfileImage(imageFile);
		}
		// USERSテーブル更新
		updateCount += repository.changeProfile(user);
		// USER_HOBBYSテーブルの更新。Emptyの場合は処理されない。
		repository.deleterUserHobbys(form.getUserId());
		if(!form.getHobbys().isEmpty()) {
		    String userHobbys= form.getHobbys().stream().collect(Collectors.joining(", "));
			form.setHobby(userHobbys);
			repository.registerHobbys(form.getUserId(), form.getHobbys());
		}
		// PERSONAL_INFOテーブル更新
		updateCount += repository.updatePersonalInfo(form);
		// USERS、PERSONAL_INFOの一方が更新されなかった場合の例外処理
		if (updateCount < 2) throw new Exception();
	}

	
	/**
	 * 初期情報格納用SQL
	 * 
	 * @param user
	 * @return
	 */
	public ProfileEditForm providePersonalInfo(AuthenticatedUser user) {
		ProfileEditForm  profileEditForm = repository.createProfileEditForm(user.getId()).orElse(repository.newProfileEditForm(user.getId()));
		profileEditForm.setHobbys(repository.findUserHobbys(profileEditForm.getUserId()));
		convertSuggestUsers(0, user.getId(), new TreeMap<Long, ProfileEditForm>(), profileEditForm);
		return profileEditForm;
	}
	
	
	   /**
		 * 再帰処理で趣味をリストに追加する
		 * i番目の趣味に合致するユーザーのIDとNameをマップに追加する。
		 * 
		 * @param i
		 * @param sujestUsers
		 * @param profileEditForm
		 */
		public void convertSuggestUsers(int i, Long userId, TreeMap<Long, ProfileEditForm> sujestUsers, ProfileEditForm profileEditForm) {
			if(profileEditForm.getHobbys().size() > i) {
				for(ProfileEditForm userHobby : repository.getSuggestUsers(profileEditForm.getHobbys().get(i), userId)) {
					if(userId != userHobby.getUserId()){
						sujestUsers.put(userHobby.getUserId(), userHobby);
					}
				}
				convertSuggestUsers(i+1, userId, sujestUsers, profileEditForm);
			}
			profileEditForm.setSujestUsers(sujestUsers);
		}
	
		
	/**
	 * DBからユーザー情報を検索しUserを返す。
	 *
	 * @param id
	 * @return
	 */
	public AuthenticatedUser provideUserInfo(long id) {
		return repository.findUserById(id).orElse(new AuthenticatedUser());
	}
	
}