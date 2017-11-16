package com.honganwei.platform.dao.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.honganwei.common.dao.impl.BaseDao;
import com.honganwei.platform.dao.IModelDao;
import com.honganwei.platform.entity.ModelEntity;

@Repository
public class ModelDao extends BaseDao<ModelEntity> implements IModelDao {

	public List<ModelEntity> queryModelLevel1ByUserId(Map map) {

		List list=this.getSqlSession().selectList("ModelEntity.queryModelLevelByUserId",map);
		
		return list;
	}

	

}
