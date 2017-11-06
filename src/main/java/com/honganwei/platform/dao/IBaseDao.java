package com.honganwei.platform.dao;

import java.util.List;
import java.util.Map;

import com.honganwei.common.pagination.Page;
import com.honganwei.common.pagination.PageList;


public interface IBaseDao<T> {

	int insert(T entity);
	int update(T entity);
	int delete(T entity);
	List<T> queryAll();
	List<T> queryList(Map<String, Object> map);
	PageList<T> queryPage(Page page, Map<String, Object> map);
	int getMaxId();
	/*int saveInMongo(String collectionName);
	*/
	/*ServiceResult<T> update(MongoEntity mongo);*/
/*	int insert(T entity, String collectionName);*/
	/*List<T> queryList(MongoEntity mongo);
	PageList<T> queryPage(MongoEntity mongo, Page page);*/
	
}
