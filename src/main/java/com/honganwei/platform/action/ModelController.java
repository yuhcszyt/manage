package com.honganwei.platform.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.honganwei.common.CommonConst;
import com.honganwei.common.SysResult;
import com.honganwei.common.action.BaseController;
import com.honganwei.platform.entity.ModelEntity;
import com.honganwei.platform.service.IModelService;

@Controller
public class ModelController extends BaseController {

	@Autowired
	private IModelService modelService;

	@RequestMapping("MODELFindLgoinFirstMenu")
	@ResponseBody
	public SysResult findLoginFirstMenu(HttpServletRequest rq) {

		HttpSession session = rq.getSession();
		String userIcode = session.getAttribute("icode").toString();

		List<ModelEntity> getList = modelService.findLoginMenu(userIcode, CommonConst.LEVELONE, null);

		this.result.setData(getList);

		return result;
	}

	@RequestMapping("MODELFindLgoinSubMenu")
	@ResponseBody
	public List findLoginSubMenu(HttpServletRequest rq, String maindatauuid) {

		HttpSession session = rq.getSession();
		String userIcode = session.getAttribute("icode").toString();

		List<ModelEntity> menu2List = modelService.findLoginMenu(userIcode, CommonConst.LEVELTwo, maindatauuid);
		List<Map<String, Object>> menuResult = toEasyUiTreePattern(menu2List);
		if (menuResult != null && menuResult.size() > 0) {
			for (int i = 0; i < menuResult.size(); i++) {
				List<ModelEntity> menu3List = modelService.findLoginMenu(userIcode, CommonConst.LEVELThree,
						menuResult.get(i).get("id").toString());

				if (null != menu3List && menu3List.size() > 0) {
					List<Map<String, Object>> menuSubResult = toEasyUiTreePattern(menu3List);
					menuResult.get(i).put("children", menuSubResult);
				}
			}

		}

		return menuResult;
	}

	/**
	 * 为了easyutree对菜单内的格式进行转换为适合tree的格式
	 * 
	 * @param list
	 * @return
	 */
	public List<Map<String, Object>> toEasyUiTreePattern(List<ModelEntity> menulist) {

		List<Map<String, Object>> resultList = null;

		if (null != menulist && menulist.size() > 0) {
			String id = "";
			String text = "";
			String url = "";
			// 用来接收数据,返回到前台的json
			resultList = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < menulist.size(); i++) {
				id = menulist.get(i).getIcode().toString();
				text = menulist.get(i).getName().toString();
				url = null == menulist.get(i).getUrl() ? "" : menulist.get(i).getUrl().toString();
				resultList.add(i, new HashMap<String, Object>());
				resultList.get(i).put("id", id);
				resultList.get(i).put("text", text);
				
				if (url!=null&&url.length() > 0) {
					Map<String, Object> map111 = new HashMap<String, Object>();
					map111.put("href", url);
					resultList.get(i).put("attributes", map111);
				}

			}
		}
		return resultList;
	}

}
