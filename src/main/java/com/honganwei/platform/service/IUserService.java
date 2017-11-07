package com.honganwei.platform.service;

import org.springframework.stereotype.Service;

import com.honganwei.platform.entity.UserEntity;


public interface IUserService {
		
		public UserEntity queryUser(UserEntity user); 
	
}
