package com.rugbyaholic.communityPG.auth.account;

import java.io.Serializable;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Size;

import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.rugbyaholic.communityPG.common.ImageFile;

public class ProfileEditForm implements Serializable {

	private static final long serialVersionUID = -7763715831163230164L;

	private long userId;

	private MultipartFile uploadFile;
	
	private ImageFile profileImage = new ImageFile();
	
	@Size(max = 64)
	private String name;
	
	private String email;
	
	private String empNo;
	
	private String deptName;
	
	private String posName;
	
	@Size(min = 8, max = 20)
	private String password;
	
	@Size(min = 8, max = 20)
	private String passwordConfirm;
	
	// 個人情報
	@Size(max = 256)
	private String aboutMe;

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

	public ImageFile getProfileImage() {
		return profileImage;
	}

	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	
	public void setProfileImage(ImageFile profileImage) {
		this.profileImage = profileImage;
	}

	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
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

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public ProfileEditForm(String name) {
		this.name = name;
	}
	
	@AssertTrue
	public boolean isPasswordConfirmed() {

		return ObjectUtils.nullSafeEquals(password, passwordConfirm);
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
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

}