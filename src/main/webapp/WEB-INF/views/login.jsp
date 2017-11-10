<%@page import="com.honganwei.common.util.PublicinformationUtil"%>
 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="width:100%;height:100%;overflow:hidden">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>登录</title>
	<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/main.css"> -->
	
	<script type="text/javascript" src="easyui/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>	
	<script type="text/javascript" src="js/common.js"></script>
</head>

<body style="height:100%;width:100%;overflow:hidden;border:none;visibility:visible;">

<div id="mainwindow" class="easyui-window rabbit"
style="width:500px;height:300px;background:#fafafa;overflow:hidden"
title="登录" border="false" resizable="false" draggable="true" 
minimizable="false" maximizable="false">
<div class="header" style="height:35px;">
   <div class="toptitle" style="margin-top: 20px; font-size:20px; margin-left:10px;">
   <%=PublicinformationUtil.GetProperties("projectname")%></div>
</div>
	<div style="padding:60px 0;">
<div id="loginForm">
	<div style="padding-left:150px">
	<table cellpadding="0" cellspacing="3">
	<tr>
		<td>登录帐号</td>
		<td><input id="LOGINNAME" style="width:114px;"></input>
	</td>
	</tr>
<tr>
	  <td>登录密码</td>
	  <td><input id="PASSWORD" type="password"   style="width:114px;"></input>
	</td>
</tr>
<tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
</tr>
<tr>
	<td></td>
	<td>
			<a id="btnLogin"  class="easyui-linkbutton"  >登 录</a>
	        <a class="easyui-linkbutton"  onclick="clearAll()">重 置</a>
	</td>
</tr>
	</table>
		</div>
		</div>
	</div>
</div>

<script type="text/javascript">	
$(function(){
	$("#mainwindow").css("background-image","url(css/images/744632675023512131.jpg)");
})
function clearAll(){
	document.getElementById('LOGINNAME').value="";
	document.getElementById('PASSWORD').value="";
}
$("#PASSWORD").keydown(function(event){
	if(event.keyCode==13)
		$("#btnLogin").click();
});

$("#btnLogin").click(function(){
	
	var loginName=$("#LOGINNAME").val();
	var password=$("#PASSWORD").val();
	var url="${pageContext.request.contextPath}/user/login.do";
	
	$.ajax({
		data:{"loginName":loginName,"password":password},
		dataType:"json",
		type:"POST",
		url:url,
		success:function(data){
			
			document.location.href="${pageContext.request.contextPath}/user/index.do";   
		},
		error : function(event,request, settings) {
			$.messager.alert("提示消息", "请求失败!", "info");
		}
	});
	
	

});
</script>
</body>
</html>