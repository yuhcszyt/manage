package com.honganwei.platform.entity;

/**
 * 菜单实体类
 * @author admin
 *
 */
public class ModelEntity {
	
	
	public String icode;
	public String name;
	public String url;
	public String parentIcode;
	public String level;
	public String getIcode() {
		return icode;
	}
	public void setIcode(String icode) {
		this.icode = icode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParentIcode() {
		return parentIcode;
	}
	public void setParentIcode(String parentIcode) {
		this.parentIcode = parentIcode;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	
	

}
