package com.honganwei.platform.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.honganwei.common.SysResult;
import com.honganwei.common.action.BaseController;
import com.honganwei.platform.entity.ModelEntity;
import com.honganwei.platform.service.IModelService;

@Controller
public class ModelController extends BaseController{
	
	@Autowired
	private IModelService modelService;
	
	@RequestMapping("MODELFindLgoinFirstMenu")
	@ResponseBody
	public SysResult findLoginFirstMenu(HttpServletRequest rq){
		
		HttpSession session=rq.getSession();
	    String userIcode=session.getAttribute("icode").toString();
		
		List<ModelEntity>getList=modelService.findHeadMenu(userIcode);
		
		this.result.setData(getList);
		
		return result;
	}

}
