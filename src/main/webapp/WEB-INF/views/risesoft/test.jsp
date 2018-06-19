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
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/jquery/jquery-ui/css/redmond/jquery-ui-1.10.3.custom.min.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/qtip2/jquery.qtip.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.outerhtml.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/tools/jquery.json-2.4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/form/jquery.form.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/risesoft/js/myCore.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/jquery-ui/js/jquery-ui-1.10.3.custom.min.js"></script>
<style type="text/css">
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
                        data-options="required:true" style="width: 98%"/>  -->
                        <span id="auto_div"></span>
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
 <script>
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme",
      "我们",
      "你们",
      "合同",
      "合同备案"
    ];
  $( "#contractName" ).autocomplete({
	  source: function( request, response ) {
	          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
	          response( $.grep( availableTags, function( item ){
	              return matcher.test( item );
	          }) );
	      }
	});
  </script>
  
</head>
<body>

</head>

<body>


</html>