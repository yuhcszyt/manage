<%@page import="com.honganwei.common.util.PublicinformationUtil"%>

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title><%=PublicinformationUtil.GetProperties("projectname")%></title>
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main.css">
	
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>	 --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/main.js"></script> --%>

</head>
<body style="border:none;visibility:visible;width: 100%;height: 100%;" onload="showTime();">
	<div id="cc" class="easyui-layout" style="width:100%;height:100%;">
		<!-- 页面顶部top及菜单栏 -->  
	    <div region="north" style="height:96px;width: 100%;">
	    	<div class="header" style="background:#fff url('${pageContext.request.contextPath}/css/images/banner.jpg');">
				<div style="text-align: right; padding-right: 20px; padding-top: 30px; padding-bottom: 14px;">
					<span style="color:#FDFDFD" id="loginuserInfo">欢迎你，${loginName}</span> 
					<span style="color:#FDFDFD" id="loginuserArea">,</span>
					<span style="color:#FDFDFD" id="timeInfo"></span>
					<a href="login.jsp" style="color:#FDFDFD;text-decoration:nonegfd;">退出</a>
				</div>
				<div class="maintitle"  style="top: 12;font-size:20px;color:#FDFDFD; margin-left:5px;">WEB商务管理系统</div>
			</div>
	    	<div id="topmenu" class="topmenu" style="height:34px;background:url('${pageContext.request.contextPath}/css/images/maintop.png');color:#fff;font-size:14px;font-weight:bold;">
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:addTab('首页','/frame/welcome')" >首&nbsp;&nbsp;页</a>
	    	</div>  
	    </div>
	    <!-- 页面底部信息 -->
	    <div region="south" style="heightopmenut: 18px;" >
	    	<center>
	    	</center>
	    </div>  
		<!-- 左侧导航菜单 -->	    
	    <div region="west"  title="导航菜单栏" style="width:180px;">
		<ul id="tt1"  data-options="animate:true,dnd:true"></ul>
	    </div>  
	    <!-- 主显示区域选项卡界面 -->
	    <div region="center">
	    	<div class="easyui-tabs" fit="true" id="tt"> 
	    		<div title="首页" data-options="closable:true">
	    			<iframe width='100%' height='100%'  id='iframe' name='iframe' frameborder='0' scrolling='auto'  src='${pageContext.request.contextPath}/frame/welcome.do'></iframe>
	    		</div>
	    	</div>
	    </div>
	    <div id="dd"></div>
	</div>
</body>
</html>
<jsp:include page="/js/StaticJavascript.jsp" />
<script type="text/javascript">

<!--

//-->
(function($) {
	$(function() {
		
		//加载一级菜单 ${pageContext.request.contextPath}无法获取地址,页面加载时 document.ready();
		var url = "${pageContext.request.contextPath}/MODELFindLgoinFirstMenu.do";
		$.ajax( {
			type : "post",
			url : url,	
			dataType:"json",
			contentType : "text/html",
			error : function(event,request, settings) {
				$.messager.alert("提示消息", "请求失败!", "info");
			},
			success : function(data) {
				$("#topmenu").empty();
				$("#topmenu").append("&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:addTab('首页','${pageContext.request.contextPath}/frame/welcome.do')\" >首&nbsp;&nbsp;页</a>");
				if(!JUDGE.isNull(data.data)){
					var getResultList=data.data;
				if(getResultList.length>0){
					//循环加载第一级别菜单
					for ( var i = 0; i < getResultList.length; i++) {
						$("#topmenu").append("<a icode='"+getResultList[i].icode+"'>"+getResultList[i].name+"</a>");	
					}	
					//自动加载第一个一级菜单下面的二级菜单
					
					$("#topmenu > a").get(1).click();	
				}
				}
			}
		});
		
		//切换一级菜单 加载二级和三级菜单
		$("#topmenu > a").live('click',function(){
			//用on不会跑click
			//设置样式
			$("#topmenu > a").removeClass("active");
			$(this).addClass("active");
			//加载 二级菜单和三级菜单
			var menu1icode = $(this).attr("icode");
			if(!JUDGE.isNull(menu1icode)){
				
				$('#tt1').tree({   
				    url:"${pageContext.request.contextPath}/MODELFindLgoinSubMenu.do?maindatauuid="+menu1icode,
					onClick: function(node) {
						if(node.attributes){
							addTab(node.text,node.attributes.href);	
						}
				    }
				});
				
			}
		});					
	});
})(window.jQuery);

function view(url){
	
	$('#iframe').attr('src',url);
}

/*
*添加选项卡方法
*/
function addTab(title,url){
	//对传过来url进行 拼接 root
	var rootName="${pageContext.request.contextPath}"
	if(url.search(rootName)==-1)
		url=rootName+url;
	console.log(url);
	
	//先判断是否存在标题为title的选项卡
	var tab=$('#tt').tabs('exists',title);
	if(tab){
		//若存在则直接打开
		$('#tt').tabs('select',title);
	}else{
		
		//否则创建
		$('#tt').tabs('add',{
			title:title,
			content:"<iframe width='100%' height='100%'  id='iframe' frameborder='0' scrolling='auto'  src='"+url+"'></iframe>",
			closable:true
		});
	}
}

/*
*根据title 选中Accordion对应的面板
*/
function selectAccordion(title){
	
	$('#accordionPanel').accordion('select',title);
}

/*
*刷新时间
*/
function showTime(){
	var date=new Date();
	$('#timeInfo').html();
	$('#timeInfo').html('&nbsp;&nbsp;&nbsp;&nbsp;'+date.toLocaleString()+"&nbsp;&nbsp;");
}
setInterval(showTime,1000);

/*
*检测浏览器窗口大小改变 来改变页面layout大小
*/
$(function(){
	
	$(window).resize(function(){
		$('#cc').layout('resize');
	});
});
</script>