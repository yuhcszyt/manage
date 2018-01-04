package com.honganwei.life.dao.impl;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.springframework.stereotype.Repository;

import com.honganwei.common.ws.phone.cn.com.webxml.MobileCodeWSSoap;
import com.honganwei.life.dao.IWsPhoneDao;

@Repository
public class WsPhoneDao  implements IWsPhoneDao {
	
	
	public String queryPhoneInfo(String no) {
		
		JaxWsProxyFactoryBean jaxWsProxyFactoryBean=new JaxWsProxyFactoryBean();
		jaxWsProxyFactoryBean.setServiceClass(MobileCodeWSSoap.class);
		jaxWsProxyFactoryBean.setAddress("http://ws.webxml.com.cn/WebServices/MobileCodeWS.asmx?wsdl");
		MobileCodeWSSoap phone=jaxWsProxyFactoryBean.create(MobileCodeWSSoap.class);
		String result=phone.getMobileCodeInfo(no, null);
		return result;
	}

}
