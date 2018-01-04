package com.honganwei.common.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/frame/{page}")
	public String toFramePage(@PathVariable String page){
		System.out.println("to"+page);
		return "/frame/"+page;
	}
	
	@RequestMapping("/ws/{page}")
	public String toWsPage(@PathVariable String page){
		System.out.println("to"+page);
		return "/ws/"+page;
	}
	
}
