package manage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.honganwei.common.CommonConst;
import com.honganwei.common.ws.dreamInfo.com.gpsso.DreamSoap;
import com.honganwei.common.ws.dreamInfo.com.gpsso.SearchDreamInfoResponse.SearchDreamInfoResult;
import com.honganwei.common.ws.express.com.gpsso.KuaidiQueryResponse.KuaidiQueryResult;
import com.honganwei.common.ws.phone.cn.com.webxml.MobileCodeWSSoap;
import com.honganwei.common.ws.express.com.gpsso.KuaidiSoap;
import com.honganwei.platform.entity.UserEntity;
import com.honganwei.platform.service.IModelService;
import com.honganwei.platform.service.IUserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext.xml")
public class TestApp {

	@Autowired
	private IUserService userService;

	@Autowired
	private IModelService modelService;

	@Test
	public void TestDemo() {
		UserEntity user = new UserEntity();
		user.setLoginName("admin");
		user.setPassword("admin");

		UserEntity getUser = userService.queryUser(user);
	}

	@Test
	public void TestModelDemo() {

		List getList = modelService.findLoginMenu("1", CommonConst.LEVELTwo, "210236b9-c90d-11e7-806e-e03f4949199a");
		/*
		 * List getList=modelService.findLoginMenu("1",
		 * CommonConst.LEVELThree,"f0729e9a-c919-11e7-806e-e03f4949199a");
		 */
		Assert.assertNotNull(getList);
	}

	@Test
	public void TestModelDemo1() {

		Integer i1 = 128;
		Integer i2 = 128;
		if (i1 == i2) {
			System.out.println("true");
		} else {
			System.out.println("false");
		}

	}

	@Test
	public void TestExpress() {
		/*
		 * KuaidiQueryResult result=kuaiDi.kuaidiQuery("宅急送","5960183504");
		 * result.getContent();
		 */

		JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
		jaxWsProxyFactoryBean.setServiceClass(KuaidiSoap.class);
		jaxWsProxyFactoryBean.setAddress("http://www.gpsso.com/webservice/kuaidi/kuaidi.asmx");
		KuaidiSoap kuai = jaxWsProxyFactoryBean.create(KuaidiSoap.class);
		KuaidiQueryResult result = kuai.kuaidiQuery("宅急送", "5960183504");
		if (result != null) {
			for (Object str : result.getContent()) {
				System.out.println(str.toString());
			}
		}
	}

	@Test
	public void TestPhone() {
		/*
		 * KuaidiQueryResult result=kuaiDi.kuaidiQuery("宅急送","5960183504");
		 * result.getContent();
		 */

		JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
		jaxWsProxyFactoryBean.setServiceClass(MobileCodeWSSoap.class);
		jaxWsProxyFactoryBean.setAddress("http://ws.webxml.com.cn/WebServices/MobileCodeWS.asmx?wsdl");
		MobileCodeWSSoap phone = jaxWsProxyFactoryBean.create(MobileCodeWSSoap.class);
		String result = phone.getMobileCodeInfo("13530560581", null);
		System.out.println(result);
	}

	@Test
	public void TestDream() {
		/*
		 * KuaidiQueryResult result=kuaiDi.kuaidiQuery("宅急送","5960183504");
		 * result.getContent();
		 */

		JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
		jaxWsProxyFactoryBean.setServiceClass(MobileCodeWSSoap.class);
		jaxWsProxyFactoryBean.setAddress("http://www.gpsso.com/WebService/Dream/Dream.asmx?wsdl");
		DreamSoap dream = jaxWsProxyFactoryBean.create(DreamSoap.class);
		SearchDreamInfoResult result = dream.searchDreamInfo("爱人");
		/*
		 * for(String str : result.getContent()){
		 * System.out.println(o.toString()); }
		 */
	}

	@Test
	public void MyProject() {

		/*
		 * Integer[] i ={1,2}; List<Integer>list=Arrays.asList(i);
		 * ArrayList<Integer> a =new ArrayList<Integer>(list); for(Integer s:a
		 * ){ System.out.println(s); System.out.println( list.contains(1));
		 */

		/*
		 * ArrayList<String> list = new
		 * ArrayList<String>(Arrays.asList("a","b","c","d")); for(String
		 * s:list){ if(s.equals("a")){ list.remove(s); } }
		 */
		ArrayList<String> list = new ArrayList<String>(Arrays.asList("a", "b", "c", "d"));
		/*
		 * for(int i=0;i<list.size();i++){
		 * if(list.get(i).contains("b")||list.get(i).contains("c"))
		 * list.remove(i); }
		 */
		/*for (int i = list.size() - 1; i > 0; i--) {
			if (list.get(i).contains("b") || list.get(i).contains("c"))
				list.remove(i);
		}*/
		for (Iterator<String> i = list.iterator(); i.hasNext();) {
			String str=i.next();
			/*if (str.contains("b") || str.contains("c"))
				i.remove();*/
			System.out.println(str);
		}

		for (String str : list) {
			System.out.println(str);
		}
	}
	
	
	@Test
	public  void TestARRAy(){
		
	
		
	}
}
