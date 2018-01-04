package com.honganwei.life.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.honganwei.life.dao.IWsPhoneDao;
import com.honganwei.life.service.IWsPhoneService;

@Service
public class WsPhoneService implements IWsPhoneService {

	@Autowired
	private IWsPhoneDao wsPhoneDao;
	
	public String queryPhoneInfo(String no) {
		return wsPhoneDao.queryPhoneInfo(no);
	}

}
