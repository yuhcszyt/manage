<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/static/common/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/static/common/head.jsp"%>
<%@ include file="/static/common/common.jsp"%>
<title>编辑理由</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/risesoft/css/fileflow.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.outerhtml.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/risesoft/js/activiti/workflow.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.json-2.4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/form/jquery.form.js"></script>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<body style="background:url('css/images/FooterBGWU.jpg') no-repeat right bottom;">
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false">
		<form id="infoform" method="post">
			<table border="0" cellpadding="0" cellspacing="1" class="table">
				<tr>
					<td class="lefttd lbl-must" style="width: 15%;">填写理由<font color="red">*</font>：</td>
					<td class="rigthtd" >
					<input class="easyui-textbox" name="description"  data-options="multiline:true" style="height:100px;width:85%"></input>
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>
</body>
<script type="text/javascript">

$(function(){
	
/* 	alert(utils.equals("1","1",function(item1, item2){
		if(item1=="a"){

			return true;
		}
		else return false;
	})); */
	
	/* var result=utils.replaceAll("abc","b","d",true);
	alert(result); */
	
	/* alert(utils.right("sdfasffsaas123",3));
	alert(utils.left("sdfasffsaas123",3)); */
	//showMessage("info","ss");
});



</script>

</html>