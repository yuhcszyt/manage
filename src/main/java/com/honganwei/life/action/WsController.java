package com.honganwei.life.action;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.honganwei.common.SysResult;
import com.honganwei.life.dao.impl.WsPhoneDao;
import com.honganwei.life.service.IWsPhoneService;
import com.honganwei.life.service.impl.WsPhoneService;

@Controller
@RequestMapping("/Ws")
public class WsController {
	
	
	@Autowired
	private IWsPhoneService wsPhoneService;
	
	@RequestMapping("/queryPhoneInfo")
	@ResponseBody
	public SysResult queryPhoneInfo(String phoneNum ){
		
		SysResult sysResult=new SysResult();
		
		String result=wsPhoneService.queryPhoneInfo(phoneNum);
		if(StringUtils.isNoneBlank(result)){
			
			sysResult.setData(result);
			sysResult.setOk("OK");
		}
		return sysResult;
	}
}
