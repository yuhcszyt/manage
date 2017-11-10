package manage;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.honganwei.platform.entity.UserEntity;
import com.honganwei.platform.service.IUserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:spring/applicationContext.xml")
public class TestApp {

	@Autowired
	private IUserService userService;
	
		@Test
		public void TestDemo(){
			UserEntity user=new UserEntity();
			user.setLoginName("admin");
			user.setPassword("admin");
			
			UserEntity getUser=userService.queryUser(user);
		}
	
	
}
