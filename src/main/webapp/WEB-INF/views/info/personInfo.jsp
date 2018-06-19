<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/static/common/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/static/common/head.jsp"%>
<%@ include file="/static/common/common.jsp"%>
<title>合同备案-付款批次</title>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/jquery.raty.css"" />
<link rel="stylesheet" type="text/css" href="${ctx}/static/jquery/qtip2/jquery.qtip.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/static/risesoft/css/fileflow.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.outerhtml.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/risesoft/js/activiti/workflow.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.json-2.4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/form/jquery.form.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery.raty.js"></script>
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
	    			<td>test:</td>
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
	    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="test()">test</a>
	    </div>
	    </div>
	   
	</div>
	 <div ></div>
	 <div id="star" data-path="${pageContext.request.contextPath}/easyui/images"></div>
	 <div id="function-hint"></div>
	 <div id="result"></div>
	 <input type="easyui-textbox"></input>
	<script>
	var i='';
	$(function(){
		$('#star').raty({
		  path:"${pageContext.request.contextPath}/easyui/images",
		  score: 3,
		  hints: ['差', '一般', '好', '非常好', '全五星'],
		  target: '#function-hint',
		  targetKeep: true,
		  click: function(score, evt) {
	            alert('ID: ' + $(this).attr('id') + "\nscore: " + score + "\nevent: " + evt.type);
	            $("#result").val(score);
	            alert($("#result").val());
		  }
		});
		test22;
		
	});
	
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
		
		function test(){
			
			openInTopWindow({
				id : "reason",
				src : '${pageContext.request.contextPath}/info/editReason.do',
				destroy : true,
				title : '新增',
				width : 650,
				height : 360,
				modal : true
			});
			
			  window.top.$.messager.progress({
                  title: '系统提示',
                  text: '正在加载中，请稍候...'
              });
			
		/* 	openCurWindow({
				id : "reason",
				src : '${pageContext.request.contextPath}/info/editReason.do',
				destroy : true,
				title : '新增',
				width : 650,
				height : 360,
				modal : true
			}); */
		}
		
		var test22=function (){
			alert("22");
		}
	</script>
</body>
</html>