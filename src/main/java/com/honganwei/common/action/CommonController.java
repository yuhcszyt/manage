package com.honganwei.common.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("frame")
public class CommonController {

	@RequestMapping("{page}")
	public String toPage(@PathVariable String page){
		System.out.println("to"+page);
		return "/frame/"+page;
	}
	
}
