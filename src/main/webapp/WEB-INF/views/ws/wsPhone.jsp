<%@page import="com.honganwei.common.util.PublicinformationUtil"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">	
</head>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<body style="background:url('css/images/FooterBGWU.jpg') no-repeat right bottom;">
	<p>Fill the form and submit it.</p>
	<h2>电话查询</h2>
	<div style="margin:20px 0;"></div>
	<div class="easyui-panel" title="New Topic" style="width:600px;text-align:center;"> 
		<div style="padding:10px 60px 20px 60px">
	    <form id="ff" method="post">
	    	<table cellpadding="5">
	    		<tr align="center">
	    			<td>PhoneNo:</td>
	    			<td><input class="easyui-validatebox" type="text" name="name" data-options="required:true" ></input></td>
	    		</tr>
	    		<tr align="center">
	    			<td>result:</td>
	    			<td name='result'></td>
	    		</tr>
	    	</table>
	    </form>
	    <div style="text-align:center;padding:5px">
	    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()">Submit</a>
	    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">Clear</a>
	    </div>
	    </div>
	</div>
	<script>
		function submitForm(){
			var phoneNo=$("[name='name']").val();
			if(JUDGE.isNull(phoneNo)){
				$.messager.alert("提示消息", "电话号码不能为空!", "info");
				return;
			}
			$.ajax({
				url:"${pageContext.request.contextPath}/Ws/queryPhoneInfo.do",
				data:{"phoneNum":phoneNo},
				dataType:"json",
				type:"post",
				success:function(data){
					$("[name='result']").text(data.data);
				},
				error:function(data){
					$.messager.alert("提示消息",data.msg, "error");
					$('#ff').form('clear');
				}
			});
		}
		function clearForm(){
			$('#ff').form('clear');
		}
	</script>
</body>
</html>