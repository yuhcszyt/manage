package com.honganwei.work.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/risesoft")
public class WorkController {

	@RequestMapping("/toSerachTips")
	public String toSerchTips(){
		
		return "/risesoft/contractPreAudit";
	}
	
	@RequestMapping("/test")
	public String test(){
		
		return "/risesoft/test";
	}
}
