<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/static/common/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/static/common/head.jsp"%>
<%@ include file="/static/common/common.jsp"%>
<title></title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/risesoft/css/fileflow.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/autocomplete.css"" />
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.outerhtml.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.json-2.4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/form/jquery.form.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/risesoft/js/myCore.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/autocomplete.js"></script>
<style>
.table .lefttd {
	text-align: center;
}
</style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true,border:false">
    <form id="infoform" name="infoform" method="post" class="easyui-form" enctype="multipart/form-data">
    	<input hidden="hidden" name="guid" id="guid"/>
    	<input hidden="hidden" name="htGuid" id="htGuid">
        <div data-options="region:'center',border:false" style="height: auto;">
            <table border="0" class="table" cellpadding="0" cellspacing="1" >
                <tr >
                    <td class="lefttd lbl-must" width="20%">合同名称<font color="red">*</font>：</td>
                    <td style=" text-align: left;">
                        <input id="contractName" name="contractName" 
                        data-options="required:true" style="width: 98%"/> 
                        		<span id="message"></span>
                    </td>
                </tr>
                <tr>
                    <td class="lefttd lbl-must">上传附件<font color="red">*</font>：</td>
                    <td style=" text-align: left;">
		         	<input type="file" name="file" id="attachmentFile" style="width: 500px; height: 26px" />	
		         	&nbsp;&nbsp;<font color="red">请上传小于20M的附件！</font>
		         	</td>
                </tr>
                <tr>
                	<td><div id="search-form">  </div> </td>
                	<td>		<div id="message"></div>
                	</td>
                </tr>
            </table>
            <div align="center"><a class="easyui-linkbutton"  href="javascript:intelligentAudit()">智能审核 </a></div>
        </div>
       
    </form>
</div>
</body>
<script type="text/javascript">
var contractName='';
var tipcontractName='';
var id='';
var proposals = ['百度1', '百度2', '百度3', '百度4', '百度5', '百度6', '百度7','呵呵呵呵呵呵呵','百度','新浪','a1','a2','a3','a4','b1','b2','b3','b4'];

$(document).ready(function(){
	$('#search-form').autocomplete({
		hints: proposals,
		width: 300,
		height: 30,
		onSubmit: function(text){
			$('#message').html('Selected: <b>' + text + '</b>');			
		}
	});
});

 
</script>


</html>