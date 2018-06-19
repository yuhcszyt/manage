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
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.outerhtml.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.json-2.4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/form/jquery.form.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/risesoft/js/myCore.js"></script>
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
                        <input id="contractName" name="contractName" class="easyui-combobox" 
                        data-options="required:true" style="width: 98%"/> 
                    </td>
                </tr>
                <tr>
                    <td class="lefttd lbl-must">上传附件<font color="red">*</font>：</td>
                    <td style=" text-align: left;">
		         	<input type="file" name="file" id="attachmentFile" style="width: 500px; height: 26px" />	
		         	&nbsp;&nbsp;<font color="red">请上传小于20M的附件！</font>
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
$(function(){
	 $('#contractName').combobox({
		required:true,
		mode:'remote',
		editable:true,
		hasDownArrow:false,
		valueField: 'text',  
        textField: 'text',
        onSelect:checkPreAuditList,
        onChange:checkPreAuditList,
		onBeforeLoad: function(param){
			if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
				return false;
			}
		},
		loader:btsloader
	});  
	
});
var btsloader=function btsloader(param, success, error) {
    var q = param.q || "";  
    if (q.length <= 0) {  
        console.log("q.length <= 0");  
        return false;  
    }  
    $.ajax({  
    	url:'${pageContext.request.contextPath}/htPreAudit/preAuditTips',
        type: "post",  
        data: {contractName: q},//后台使用param这个变量接收传值的，后台用了struts、spring后面就不拓展说明了  
        dataType: "json",  
        success: function (data) {  
           // console.log("i am in success-->" + data);返回的是数组对象data  
             var items = $.each(data, function(value){  
                return value; //遍历数组中的值  
            });   
            success(data);//调用loader的success方法，将items添加到下拉框中,这里是难点啊，之前后台已经返回数据了，但就是不添加到下拉框  
        }  
    });  
}

var checkPreAuditList=function checkPreAuditList(){
	contractName=$("#contractName").combobox("getText");
	 if(utils.isNullOrEmpty(contractName)) return;
	  $.ajax({
	       async : false,  
	       cache : false,  
	       type: 'POST',
	       data : {
	    	   contractName:contractName
	       },
	       url:'${pageContext.request.contextPath}/htPreAudit/checkPreAuditList',
	       error: function (data) {
	    	   $.messager.alert('提示','操作失败','error')
	       },
	       success:function(data){
	    		try {
	    			if(data.success){
		    			confirmation(data);
	    			}else{
	    				$("#guid").val("");
	    				$("#htGuid").val("");
	    			}
			 } catch (e) {
					top.$.messager.alert('提示', "保存失败！");
				}
	       } 
	     }); 
 }

 function intelligentAudit(){
		$('#infoform').ajaxSubmit({
			type : 'POST',
			dataType : 'json',
			url:'${pageContext.request.contextPath}/htPreAudit/preAduitHtContract',
			success : function(responseText) {
					if(responseText.success){
		    			$.messager.alert('提示',responseText.msg,'info');
			    	}else{
				        $.messager.alert('提示',responseText.msg,'error')
			    	}
			},
			error:function(){
			}
		});
 }
 
 function  confirmation(data){
	 $.messager.confirm('注意','合同预审存在相同的合同名称,是否覆盖原本的合同',function(r){
		    if (r){
				$("#guid").val(data.guid);
				$("#htGuid").val(data.htGuid);
		    }else{
		    	$("#guid").val("");
				$("#htGuid").val("");
		    }
		});
 }
 
 function isUpdate(){
	 contractName=$("#contractName").val();
	  $.ajax({
	       async : false,  
	       cache : false,  
	       type: 'POST',
	       data : {
	    	   contractName:contractName
	       },
	       url:  '${pageContext.request.contextPath}/htPreAudit/checkPreAuditList',
	       error: function (data) {
	    	   $.messager.alert('提示','操作失败','error')
	       },
	       success:function(data){
	    		try {
	    			if(data.success){
		    			confirmation(data);
	    			}
			 } catch (e) {
					top.$.messager.alert('提示', "保存失败！");
				}
	       } 
	     }); 
}
 
</script>


</html>