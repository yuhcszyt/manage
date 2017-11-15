package com.honganwei.platform.dao;

import java.util.List;
import java.util.Map;

import com.honganwei.common.dao.IBaseDao;
import com.honganwei.platform.entity.ModelEntity;

public interface IModelDao extends IBaseDao<ModelEntity> {
	
	/**
	 * 通过用户Icode查到model的第一集菜单
	 * @param map
	 * @return
	 */
	public List<ModelEntity> queryModelLevel1ByUserId(Map map);


}
