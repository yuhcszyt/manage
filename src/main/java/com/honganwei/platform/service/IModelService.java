package com.honganwei.platform.service;

import java.util.List;


public interface IModelService {

	/**
	 * 
	 * @param userIcode
	 * @param levelMenu 1为1级菜单也就是最上面的,2为2级,具体菜单为3
	 * @param parentIcode 上级菜单的父icode,而获得子菜单的数据
	 * @return
	 */
	public List findLoginMenu(String userIcode,String levelMenu,String parentIcode);
}
