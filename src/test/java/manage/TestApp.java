package manage;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.honganwei.common.CommonConst;
import com.honganwei.platform.entity.UserEntity;
import com.honganwei.platform.service.IModelService;
import com.honganwei.platform.service.IUserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:spring/applicationContext.xml")
public class TestApp {

	@Autowired
	private IUserService userService;
	
	@Autowired
	private IModelService modelService;
	
		@Test
		public void TestDemo(){
			UserEntity user=new UserEntity();
			user.setLoginName("admin");
			user.setPassword("admin");
			
			UserEntity getUser=userService.queryUser(user);
		}
		@Test
		public void TestModelDemo(){
			
			List getList=modelService.findLoginMenu("1", CommonConst.LEVELTwo,"210236b9-c90d-11e7-806e-e03f4949199a");
			/*List getList=modelService.findLoginMenu("1", CommonConst.LEVELThree,"f0729e9a-c919-11e7-806e-e03f4949199a");*/
			Assert.assertNotNull(getList);
		}
	
}
