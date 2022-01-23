package com.rugbyaholic.communityPG.auth.account;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.common.ImageFile;

public class ProfileEditForm implements Serializable {

	private static final long serialVersionUID = -7763715831163230164L;

	private long userId;

	@Size(max = 64)
	private String name;
	
	private String email;
	
	private String empNo;
	
	private String deptName;
	
	private String posName;
	
	private String hobby = "";
	
	private List<String> hobbys = new ArrayList<String>();
	
	private TreeMap<Long, ProfileEditForm> sujestUsers;
	
	// 個人情報
	@Size(max = 256)
	private String aboutMe;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date birthday;
	
	@Size(min = 7, max = 7)
	private String zipcode;

	@Size(max = 8)
	private String pref;

	@Size(max = 64)
	private String city;

	@Size(max = 64)
	private String bldg;

	@Size(max = 32)
	private String phoneNo;

	@Size(max = 32)
	private String mobilePhoneNo;
	
	private ImageFile profileImage = new ImageFile();
	
	private MultipartFile uploadFile;

	@Size(min = 8, max = 20)
	private String password;
	
	@Size(min = 8, max = 20)
	private String passwordConfirm;
	
	// テストメソッド
	@AssertTrue
	public boolean isPasswordConfirmed() {
		return ObjectUtils.nullSafeEquals(password, passwordConfirm);
	}

	//Setter,Getter
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getHobby() {
		return hobby;
	}

	public void setHobby(String hobby) {
		this.hobby = hobby;
	}
	
	public List<String> getHobbys() {
		return hobbys;
	}

	public void setHobbys(List<String> hobbys) {
		this.hobbys = hobbys;
	}
	
	public TreeMap<Long, ProfileEditForm> getSujestUsers() {
		return sujestUsers;
	}

	public void setSujestUsers(TreeMap<Long, ProfileEditForm> sujestUsers) {
		this.sujestUsers = sujestUsers;
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getPref() {
		return pref;
	}

	public void setPref(String pref) {
		this.pref = pref;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getBldg() {
		return bldg;
	}

	public void setBldg(String bldg) {
		this.bldg = bldg;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getMobilePhoneNo() {
		return mobilePhoneNo;
	}

	public void setMobilePhoneNo(String mobilePhoneNo) {
		this.mobilePhoneNo = mobilePhoneNo;
	}
	
	public ImageFile getProfileImage() {
		return profileImage;
	}
	
	public void setProfileImage(ImageFile profileImage) {
		this.profileImage = profileImage;
	}
	
	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	
	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}
}