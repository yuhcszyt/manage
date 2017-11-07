package com.honganwei.platform.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.honganwei.platform.dao.IUserDao;
import com.honganwei.platform.entity.UserEntity;
import com.honganwei.platform.service.IUserService;

@Service
public class UserServiceImple implements IUserService  {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImple.class);
	
	@Autowired
	private IUserDao userDao;
	
	public UserEntity queryUser(UserEntity user) {
		
		Map<String,Object> map=new HashMap<String,Object>();
		
		map.put("loginName",user.getLoginName());
		map.put("password", user.getPassword());
		
		  List<UserEntity>list=userDao.queryList(map);
		  
		  if(list.size()!=1){
			  LOGGER.error("查询出多个登录用户");			 
		  }
		 return list.get(0);
	}

}
