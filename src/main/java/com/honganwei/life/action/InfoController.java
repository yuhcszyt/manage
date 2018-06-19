package com.honganwei.life.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/info")
public class InfoController {
	
	
	
	@RequestMapping("/personInfo")
	public String personInfo(){
		System.out.println("http://localhost:8082/manage/info/personInfo.do");
		return "info/personInfo";
	}
	@RequestMapping("/editReason")
	public String editReason(){
		System.out.println("http://localhost:8082/manage/info/editReason.do");
		return "info/editReason";
	}
	
	@RequestMapping("/toSerachTips")
	public String toSerchTips(){
		
		return "/risesoft/contractPreAudit";
	}
}
