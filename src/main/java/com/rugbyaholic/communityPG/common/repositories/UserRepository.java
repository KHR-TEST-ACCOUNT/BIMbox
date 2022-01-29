package com.rugbyaholic.communityPG.common.repositories;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.rugbyaholic.communityPG.auth.AuthenticatedUser;
import com.rugbyaholic.communityPG.auth.account.ProfileEditForm;
import com.rugbyaholic.communityPG.manage.users.UserRegistrationForm;
import com.rugbyaholic.communityPG.manage.users.UserSearchForm;

@Mapper
public interface UserRepository {

	public void depriveAuthority(@Param("user") AuthenticatedUser user, @Param("role") String userRole);

	public void registerUser(UserRegistrationForm form);

	public Optional<AuthenticatedUser> findUserById(Long id);

	public Optional<AuthenticatedUser> identifyUser(String email);

	public Optional<ProfileEditForm> createProfileEditForm(long userId);
	
	public ProfileEditForm newProfileEditForm(long userId);
	
	public int changeProfile(AuthenticatedUser user);
	
	public int updateUserName(ProfileEditForm profileEditForm);
	
	public int updatePersonalInfo(ProfileEditForm profileEditForm);
	
	public int registerHobbys(@Param("id")Long id, @Param("hobbys")List<String> hobbys);
	
	public int deleterUserHobbys(Long id);
	
	public List<String> findUserHobbys(Long userId);
	
	public List<ProfileEditForm> getSuggestUsers(@Param("hobby") String hobby, @Param("id") Long id);
	
	public List<AuthenticatedUser> loadUserList(UserSearchForm form);

	public int countUser(UserSearchForm form);

	public int findUserEmail(String mail);
	
	public int findAdminUser();
	
	public int registerInitialUser(AuthenticatedUser user);

	public int grantAuthority(@Param("user") AuthenticatedUser user, @Param("role") String userRole);
	
	public int deleterUser(Long id);

	public int deleterUsersInfo(Long id);
	
}