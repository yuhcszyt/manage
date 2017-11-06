package com.honganwei.platform.entity;

public class UserEntity {

	/*CREATE TABLE USER
	(
	  ICODE     VARCHAR(40) NOT NULL,
	  NO        VARCHAR(20),
	  NAME      VARCHAR(40) NOT NULL,
	  PHONE     VARCHAR(20),
	  EMAIL     VARCHAR(40),
	  STOPFLAG  INTEGER,
	  LOGINNAME VARCHAR(20) NOT NULL,
	  PASSWORD  VARCHAR(20) NOT NULL,
	  AREAICODE VARCHAR(40) NOT NULL
	)*/
	private String icode;
	private String no;
	private String name;
	private String phone;
	private String email;
	private short stopFlag;
	private String loginName;
	private String password;
	private String areaIcode;
	
	public String getIcode() {
		return icode;
	}
	public void setIcode(String icode) {
		this.icode = icode;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public short getStopFlag() {
		return stopFlag;
	}
	public void setStopFlag(short stopFlag) {
		this.stopFlag = stopFlag;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAreaIcode() {
		return areaIcode;
	}
	public void setAreaIcode(String areaIcode) {
		this.areaIcode = areaIcode;
	}
	
}
