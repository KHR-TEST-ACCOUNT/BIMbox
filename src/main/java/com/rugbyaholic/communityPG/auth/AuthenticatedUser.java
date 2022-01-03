package com.rugbyaholic.communityPG.auth;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.rugbyaholic.communityPG.common.ImageFile;
import com.rugbyaholic.communityPG.common.Option;

public class AuthenticatedUser implements UserDetails {

	private static final long serialVersionUID = -3047963961151549314L;

	private long id;

	private String email;
	
	private String age;

	private String birthday;

	private String avf;
	
	private String username;

	private String password;

	private boolean expired;

	private boolean locked;

	private List<Option> roles;

	// private String usersRole;
	
	private String empNo;

	private String deptCd;

	private String deptName;

	private String posCd;

	private String posName;

	private ImageFile profileImage = new ImageFile();

	private String aboutMe;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles.stream().map((o) -> new SimpleGrantedAuthority(o.getName())).collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return !expired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return !locked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return !expired;
	}

	@Override
	public boolean isEnabled() {
		return !locked;
	}

	// Date型をStringに変換する
	public String getDateFormat(Date content) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy年M月d日");
		return dateFormat.format(content);
	}
	
  // 年齢を計算するメソッド（第１引数：誕生日、第2引数：現在日）
	public static String calcAge(Date birthday, Date now) {
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	    int calcResult = (Integer.parseInt(sdf.format(now)) - Integer.parseInt(sdf.format(birthday))) / 10000;
        return String.valueOf(calcResult);
	}	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAge() {
		return age;
	}

	public String getBirthday() {
		return birthday;
	}
	
	public void setBirthday(Date birthday) {
		if(!Objects.isNull(birthday)) {
			this.birthday = getDateFormat(birthday);
			this.age = calcAge(birthday , new Date());
		}
	}

	public String getAvf() {
		return avf;
	}

	public void setAvf(Date avf) {
		this.avf = getDateFormat(avf);
	}

	public List<Option> getRoles() {
		return roles;
	}

	public void setRoles(List<Option> roles) {
		this.roles = roles;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPosName() {
		return posName;
	}

	public void setPosName(String posName) {
		this.posName = posName;
	}

	public ImageFile getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(ImageFile profileImage) {
		this.profileImage = profileImage;
	}
	
	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public String getDeptCd() {
		return deptCd;
	}

	public void setDeptCd(String deptCd) {
		this.deptCd = deptCd;
	}

	public String getPosCd() {
		return posCd;
	}

	public void setPosCd(String posCd) {
		this.posCd = posCd;
	}
}