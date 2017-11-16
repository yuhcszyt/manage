package com.honganwei.platform.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.honganwei.common.CommonConst;
import com.honganwei.platform.dao.IModelDao;
import com.honganwei.platform.entity.ModelEntity;
import com.honganwei.platform.service.IModelService;

@Service
public class ModelServiceImple implements IModelService{

	@Autowired
	private IModelDao modelDao;
	


	public List findLoginMenu(String userIcode, String levelMenu,String partentIcode) {
		
		Map map=new HashMap<String,Object>();
		 
		map.put("icode", userIcode);
		map.put("menuLevel", levelMenu);
		map.put("parenticode", partentIcode);
		
		List<ModelEntity>getList=modelDao.queryModelLevel1ByUserId(map);
		
		return getList;
	}}
