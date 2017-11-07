package com.honganwei.common.dao.impl;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.honganwei.common.CommonConst;
import com.honganwei.common.dao.IBaseDao;
import com.honganwei.common.pagination.Page;
import com.honganwei.common.pagination.PageList;
import com.honganwei.common.util.ReflectionUtils;


public class BaseDao<T> extends SqlSessionDaoSupport implements IBaseDao<T>{

	private Logger LOGGER = LoggerFactory.getLogger(getClass());

	
	private Class<T> entityClass;
	private String className;
	private String insert;
	private String update;  
	private String delete;
	private String queryList;
	private String count;
	private String queryPage;
	private String queryAll;
	private String getMaxId;
//	private static Jedis jedis;
	
//	static {
////		JedisShardInfo shardInfo = new JedisShardInfo("d77d060b3e8e4767.m.cnsza.kvstore.aliyuncs.com", 6379);
////		shardInfo.setPassword("ZXH520zxh123");
////		jedis = new Jedis(shardInfo);
////		jedis.connect();
//		
//		JedisShardInfo shardInfo = new JedisShardInfo("127.0.0.1", 6379);
//		jedis = new Jedis(shardInfo);
//		jedis.connect();
//	}
	
	public BaseDao() {
		LOGGER.info("BaseDao() " + className);//RoleEntity
		this.entityClass = ReflectionUtils.getSuperClassGenericType(getClass());
		this.className = this.entityClass.getSimpleName();
		this.insert = MessageFormat.format("{0}.insert", new Object[] {this.className});
		this.update = MessageFormat.format("{0}.update", new Object[] {this.className});
		this.delete = MessageFormat.format("{0}.delete", new Object[] {this.className});
		this.queryList = MessageFormat.format("{0}.queryList", new Object[] {this.className});
		this.count = MessageFormat.format("{0}.count", new Object[] { this.className});
		this.queryPage = MessageFormat.format("{0}.queryPage", new Object[] {this.className});
		this.queryAll = MessageFormat.format("{0}.queryAll", new Object[] {this.className});
		this.getMaxId = MessageFormat.format("{0}.getMaxId", new Object[] {this.className});
	}
	
	public int insert(T entity) {
		LOGGER.info("Entering {0} insert dao...", new Object[] {this.className});
		int result = this.getSqlSession().insert(this.insert, entity);
		LOGGER.info("Exiting {0} insert dao...", new Object[] {this.className});
		return result;
	}
	

	public int update(T entity) {
		LOGGER.info("Entering {0} update dao...", new Object[] {this.className});
		int result = this.getSqlSession().update(this.update, entity);
		LOGGER.info("Exiting {0} update dao...", new Object[] {this.className});
	    return result;
	}
	
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public int delete(T entity) {
		LOGGER.info("Entering {0} delete dao...", new Object[] {this.className});
		int result = this.getSqlSession().delete(this.delete, entity);
		LOGGER.info("Exiting {0} delete dao...", new Object[] {this.className});
	    return result;
	}
	
	public List<T> queryAll() {
		LOGGER.info("Entering {0} queryAll dao...", new Object[] {this.className});
		List<T> list = this.getSqlSession().selectList(this.queryAll);
		LOGGER.info("Exiting {0} queryAll dao...", new Object[] {this.className});
		return list;
	 }
	
	public List<T> queryList(Map<String, Object> map) {
		LOGGER.info("Entering {0} queryList dao...", new Object[] {this.className});
		List<T> list = this.getSqlSession().selectList(this.queryList, map);
		LOGGER.info("Exiting {0} queryList dao...", new Object[] {this.className});
		return list;
	}
	
	public PageList<T> queryPage(Page page, Map<String, Object> map) {
		LOGGER.info("Entering {0} queryPage dao...", new Object[] {this.className});
		
		int totalCount = ((Integer)this.getSqlSession().selectOne(this.count, map)).intValue();
		page.setTotalCount(totalCount);
		
		if(null == map) {
			map = new HashMap<String, Object>();
		}

		map.put("startIndex", Integer.valueOf(page.getStartIndex()));
		map.put("pageSize", Integer.valueOf(page.getPageSize()));

		List<T> list = this.getSqlSession().selectList(this.queryPage, map);

		PageList<T> pagingList = new PageList<T>(list, page);
		LOGGER.info("Exiting {0} queryPage dao...", new Object[] {this.className});
		
		return pagingList;
	}
	
	public int getMaxId(){
		LOGGER.info("Entering {0} getMaxId dao...", new Object[] {this.className});
		int result = CommonConst.DIGIT_ZERO;
		try {
			result = this.getSqlSession().selectOne(this.getMaxId, this.className);
		} catch (NullPointerException e) {
			LOGGER.error("getMaxId 空指针 result:{}",result);
			return result;
		}
		LOGGER.info("Exiting {0} getMaxId dao...", new Object[] {this.className});
		return result;
	}
	
	/**
	 * Save All In MongoDB
	 * 
	 * @author zhxihu2008
	 * @since 2016-07-18 16:36
	 */
	/*@Override
	public int saveInMongo(String collectionName) {
		LOGGER.info("Entering {0} saveInMongo dao...", new Object[] {this.className});
		List<T> list = this.queryAll();
		
		if(null == list || list.isEmpty()) {
			return CommonConst.DIGIT_ZERO;
		}
		
		int i = CommonConst.DIGIT_ZERO;
		
		//如果collection存在  清空数据，否则新增collection
		if(mongoTemplate.collectionExists(collectionName)) {
			mongoTemplate.remove(new Query(), collectionName);
		} else {
			mongoTemplate.createCollection(collectionName);
		}
		
		for(int j = 0, len = list.size(); j < len; j++) {
			T entity = list.get(j);
			
			if(null == entity) {
				continue;
			}
			
			mongoTemplate.insert(entity, collectionName);
			i++;
		}
		
		if(list.size() == i) {
			return CommonConst.DIGIT_ONE;
		}
		
		LOGGER.info("Exiting {0} saveInMongo dao...", new Object[] {this.className});
		
        return CommonConst.DIGIT_ZERO;
	    
	}*/
	
	/*@Override
	public int insert(T entity, String collectionName) {
		try {
			mongoTemplate.insert(entity, collectionName);
			return CommonConst.DIGIT_ONE;
		} catch (Exception e) {
			LOGGER.error("insert error entityName:{} ,exception:{}",entity.getClass().getName(),e.getMessage());
		}
		return CommonConst.DIGIT_ZERO;
	}
*/
	/*@Override
	public ServiceResult<T> update(MongoEntity mongo) {
		ServiceResult<T> result = validateParam(mongo);
		
		if(!result.getSuccess()) {
			return result;
		}
		
		if(mongo.getUpdate() == null) {
			result.setError("update 参数不能为空");
			return result;
		}
		
		Query query = getQuery(mongo, null);
		BasicDBObject basicDBObject=new BasicDBObject();  
		basicDBObject.put("$set", mongo.getUpdate());
		Update update = new BasicUpdate(basicDBObject);
		String collectionName = mongo.getCollectionName();
		
		try {
			mongoTemplate.updateMulti(query, update, collectionName);
			
			return result;
		} catch (Exception e) {
			LOGGER.error("CommonCacheServiceImpl.update error ,exception:{}", e.getMessage());
			result.setError("更新缓存异常");
		}
		
		return result;
	}
*/
	/*@Override
	public List<T> queryList(MongoEntity mongo) {
		
		if(mongo == null) {
			return null;
		}
		
		if(mongo.getQuery() == null) {
			return null;
		}
		
		if(StringUtils.isEmpty(mongo.getCollectionName())){
			return null;
		}
		
		Query query = getQuery(mongo, null);
		String collectionName = mongo.getCollectionName();
		List<T> list = mongoTemplate.find(query, this.entityClass, collectionName);
		return list;
		
	}
*/
	/*@Override
	public PageList<T> queryPage(MongoEntity mongo, Page page) {
		
		if(mongo == null) {
			return null;
		}
		
		if(mongo.getQuery() == null) {
			return null;
		}
		
		if(StringUtils.isEmpty(mongo.getCollectionName())) {
			return null;
		}
		
		Query query = getQuery(mongo, page);
		String collectionName = mongo.getCollectionName();
		List<T> list = mongoTemplate.find(query, this.entityClass, collectionName);
		
		//获取总数
		Long totalCount = (Long) mongoTemplate.count(query, collectionName);
		page.setTotalCount(totalCount.intValue());
		PageList<T> pagingList = new PageList<T>(list, page);
		
		return pagingList;
		
	} */
	
	 /**
	  * 校验 MongoEntity
	  * @param mongo
	  */
	/* private ServiceResult<T> validateParam(MongoEntity mongo) {
		ServiceResult<T> result = new ServiceResult<T>();
		
		if(mongo == null) {
			result.setError("MongoEntity 对象不能为空");
			return result;
		}
		
		if(mongo.getQuery() == null) {
			result.setError("query 参数不能为空");
			return result;
		}
		
		if(StringUtils.isEmpty(mongo.getCollectionName())) {
			result.setError("collectionName 参数不能为空");
			return result;
		}
		
		return result;
		 
	 }
	
	 private Query getQuery(MongoEntity mongo, Page page) {
		 Query query = new BasicQuery(mongo.getQuery());
		 
		 if(mongo.getSort() != null) {
			 query.with(new Sort(Direction.DESC, mongo.getSort()));
		 }
		 
		 if(page == null) {
			 return query;
		 }
		 
		 int pageStartIndex = page.getStartIndex();
		 int pageSize = page.getPageSize();
		 
		 query.limit(pageSize);
		 query.skip(pageStartIndex);
		 return query;
	 }
	*/
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory){
		super.setSqlSessionFactory(sqlSessionFactory);
	}

}
