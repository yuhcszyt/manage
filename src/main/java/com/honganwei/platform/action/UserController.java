package com.honganwei.platform.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.honganwei.common.SysResult;
import com.honganwei.platform.entity.UserEntity;
import com.honganwei.platform.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserService userService;
	
	/**
	 * 用户登录
	 * @param userName
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/login")
	@ResponseBody
	public SysResult login(UserEntity user,HttpServletRequest re) {
		
		UserEntity getUser=userService.queryUser(user);
		String loginName;
		String password;
		if(getUser!=null){
			 loginName=getUser.getLoginName();
			 password=getUser.getPassword();
			 re.getSession().setAttribute("loginName", loginName);
			 re.getSession().setAttribute("icode",getUser.getIcode());
			return  SysResult.ok();
		}else{
			return SysResult.build(404,"用户名或者密码错误");
		}
	}
	
	@RequestMapping(value="/index")
	public String index(){
		
		return "main";
	} 
	
}
