var frameID = newGuid();
var reAssignOrConsult="";//委托或协商标识
var documentTitle = "";
var total_amount = "";

//验证是否签写意见
function checkSignOpinion(){
	var checkSignOpinion;
	$.ajax({
		  async:false,
		  cache: false,
	      type: "GET",
	      url: ctx+"/opinion4New/checkSignOpinion",
	      data: {taskId:taskId,processSerialNumber:processSerialNumber},
	      dataType: "json",
	      success: function(data){
		      	checkSignOpinion = data.checkSignOpinion;
		      	if(!checkSignOpinion){
		      		alert("请签写个人意见！");
		      	}
	      }
	});
	return checkSignOpinion;
}

$(function() {
	if(itembox=="add"){
		edittype = 0;
	}
	//*******************************电子表单显示****************************************
	var formId = formIds.split(",");
	var formName = formNames.split(",");// 表单名称数组
	for (var i = 1; i <= formId.length; i++) {
		tempId = formId[i-1];
		$.ajax({
			 data : {temp_Id:tempId,processInstanceId:processSerialNumber},
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/eform/engine/getData',
		     success:function(data){
		    	 edittype = data.edittype;
		     }
		 });
		$('#easyui-tabs').tabs('add', {
			id : 'tab' + i,
			title : formName[i - 1],
			content : '<iframe id=\"form' + formId[i-1] + '" name="eform" src="'+ctx+'/eform/engine/getTemplate?temp_Id='+formId[i-1]+'&edittype='+edittype+'&guid='+processSerialNumber+'" frameborder=\"0\" scrolling=\"yes\"  style=\'background-color:#7abdf2;\'></iframe>',
			closable : false
		});
	}
	if(itembox=="add"){//新建默认显示第一个
		tempId = formId[0];
	}else{
		if(formId.length>1){
			$('#easyui-tabs').tabs('select', 1);
			tempId = formId[1];
		}else{
			$('#easyui-tabs').tabs('select', 0);
			tempId = formId[0];
		}
	}
	$('#easyui-tabs').tabs('add', {
		id : 'tab_batch',
		title : '合同付款批次',
		content : '<iframe id=\"htbatch\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\"  style=\'background-color:#7abdf2;\'></iframe>',
		closable : false
	});
	$('#easyui-tabs').tabs('add', {
		id : 'tab_dsr',
		title : '合同当事人',
		content : '<iframe id=\"htdsr\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\"  style=\'background-color:#7abdf2;\'></iframe>',
		closable : false
	});
	$('#easyui-tabs').tabs('add', {
		id : 'tab_lyys',
		title : '合同履约要素',
		content : '<iframe id=\"htlyys\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\"  style=\'background-color:#7abdf2;\'></iframe>',
		closable : false
	});
	//*******************************正文，附件显示****************************************
	if (showOtherFlag != "") {
		if (showOtherFlag.indexOf("showDocumentTab") >= 0) {
			$('#easyui-tabs').tabs('add', {
				id : 'tab_document',
				title : '正文',
				width : 400 + "px",
				height : 400 + "px",
				content : '<iframe id=\"ntko\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\" style=\'background-color:#7abdf2;\'></iframe>',
				closable : false
			});
		}
		if (showOtherFlag.indexOf("showFileTab") >= 0) {
			$('#easyui-tabs').tabs('add', {
				id : 'tab_file',
				title : '附件',
				content : '<iframe id=\"uploadfilesId\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\" style=\'background-color:#7abdf2;\'></iframe>',
				closable : false
			});
		}
	}
	
	//*******************************历程显示****************************************
	$('#easyui-tabs').tabs('add', {
		id : 'tab_history',
		title : '历程',
		content : '<iframe id=\"history\" src=\"about:blank\" frameborder=\"0\" scrolling=\"no\" style=\'background-color:white;\'></iframe>',
		closable : false
	});

	$('body').layout({
		spacing_open : 0,
		spacing_closed : 0,
		center__maskContents : true,
		center__maskObjects : true
	});

	$('#easyui-tabs').tabs({
		onSelect : function(title) {
			if (title == '正文') {
				submitForm();
				var src = $('#ntko').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#ntko').attr('src', ctx + '/transactionWord/showWord?processSerialNumber='+processSerialNumber+'&itemId='+itemId+'&itembox='+itembox+'&taskId='+taskId);
				}
			}else if (title == '附件') {
				submitForm();
				var src = $('#uploadfilesId').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#uploadfilesId').attr('src',ctx + '/attachment/attachmentList?processSerialNumber='+processSerialNumber+'&itembox='+itembox+'&taskId='+taskId+'&processInstanceId='+processInstanceId);
				}
			}else if (title == '历程') {
				submitForm();
				var src = $('#history').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#history').attr('src',ctx + '/history/show?processInstanceId='+processInstanceId);
				}
			}else if (title == '合同付款批次') {
				submitForm();
				var src = $('#htbatch').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#htbatch').attr('src', ctx + '/htPayBatch/toHtPayBatchList?edittype='+edittype+'&processSerialNumber='+processSerialNumber+'&itembox='+itembox);
				}
			}else if (title == '合同当事人') {
				submitForm();
				var src = $('#htdsr').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#htdsr').attr('src', ctx + '/htdsr/toHtDsrList?edittype='+edittype+'&processSerialNumber='+processSerialNumber+'&itembox='+itembox);
				}
			}else if (title == '合同履约要素') {
				submitForm();
				var src = $('#htlyys').attr('src');
				if (src == 'about:blank') {
					resize();
					$('#htlyys').attr('src', ctx + '/htly/toHtlyList?edittype='+edittype+'&processSerialNumber='+processSerialNumber+'&itembox='+itembox);
				}
			}else{
				for (var i = 1; i <= formId.length; i++) {
					if (title == formName[i-1]) {
						//submitForm();
						tempId = formId[i-1];
					}
				}
			}
		}
	});

	$("#button02").mouseover(function(event) {
		var currTabtitle = $('#easyui-tabs').tabs('getSelected').panel('options').title;
		if(currTabtitle=='正文'){
			$('#easyui-tabs').tabs('select', 0);
		}
	});
	
	//菜单按钮事件
	$("a[name='easyuiLinkButton']").click(function(event) {
		switch (this.id) {
			case 'button01':// 保存
                fieldSynchronization();//先同步表单字段，再进行验证，避免两个表单的同一个字段都为空时，当前表单填了验证成功，另一个表单验证不通过。
				if(!validInput()){//表单字段校验都通过时保存
					return false;
				}
				submitForm("save");
				break;
			case 'button03':// 返回
				submitForm();
				if(itembox=="todo"){
					window.parent.openTab("待办件",ctx + '/todo/index');
				}else if(itembox=="doing"){
					window.parent.openTab("在办件",ctx + '/doing/index');
				}else if(itembox=="done"){
					window.parent.openTab("办结件",ctx + '/done/index');
				}else{
					window.parent.openTab("草稿箱",ctx + '/draft/manuscriptList');
				}
				break;
			case 'button04':// 退回
				submitForm();
				rollback();
				break;
            case 'button05':// 委托
                submitForm();
                reAssignOrConsult='reAssign';
                var routeToTaskId = this.id;
                docUserChoise(routeToTaskId);
                break;
            case 'button06':// 协商
                submitForm();
                reAssignOrConsult='consult';
                var routeToTaskId = this.id;
                docUserChoise(routeToTaskId);
                break;
            case 'button07':// 完成
                submitForm();
                completeTask();
                break;
			case 'button08':// 发送下一人，串行时使用
				submitForm();
				handleSerial();
				break;
			case 'button09':// 办理完成,在协办的情况下显示的按钮
				submitForm();
				handleParallel();
				break;
			case 'button10':// 签收按钮
				submitForm();
				claim();
				break;
			case 'button11':// 撤销签收按钮
				submitForm();
				unclaim();
				break;
			case 'button12'://办结
				submitForm();
				complete();
				break;
			case 'button13':// 收回按钮
				takeBack();
				break;
			case 'button14':// 拒签按钮
				submitForm();
				refuseClaim();
				break;
            case 'button15':// 特殊办结
                submitForm();
                specialComplete();
                break;
            case 'button18':// 抄送按钮
                submitForm();
                cc();
                break;
		}
		return false;// 避免提交两次。
	});
	
	//发送菜单事件
	$("div[name='easyuiLinkButton']").click(
		function(event) {
			/*if (!checkSignOpinion()) {
				return false;
			}*/
            fieldSynchronization();//先同步表单字段，再进行验证，避免两个表单的同一个字段都为空时，当前表单填了验证成功，另一个表单验证不通过。
			if (!validInput()) {
				return false;
			}
			submitForm();
			var routeToTaskId = this.id;
			docUserChoise(routeToTaskId);
	});

    //重定向菜单事件
    $("div[name='RepositionButton']").click(
        function(event) {
            /*if (!checkSignOpinion()) {
                return false;
            }*/
            fieldSynchronization();//先同步表单字段，再进行验证，避免两个表单的同一个字段都为空时，当前表单填了验证成功，另一个表单验证不通过。
            if (!validInput()) {
                return false;
            }
            submitForm();
            var routeToTaskId = this.id;
            reposition(routeToTaskId);
            /*docUserChoise(routeToTaskId,true);*/
        });
	
	//打印菜单事件
	$("div[name='printButton']").click(
		function(event) {
			var formId = this.id;
			var title = $(this).attr('formName');
			$('#easyui-tabs').tabs('select', title);
			setTimeout("openPrintForm("+formId+")",1000);
	});
	
	resize();
});


//页面大小初始化
function resize() {
	var width = $(window).width();
	var height = $(window).height() - 40;
	$('#ntko').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});

	$('#uploadfilesId').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});
	
	$('#history').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});
	
	$('#htdsr').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});
	
	$('#htbatch').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});
	
	$('#htlyys').css({
		"width" : (width) + "px",
		"height" : (height) + "px"
	});
	
	var formId = formIds.split(",");
	for (var i = 1; i <= formId.length; i++) {
		$('#form'+formId[i-1]).css({
			"width" : (width) + "px",
			"height" : (height) + "px"
		});
	}
}

//表单字段同步
function fieldSynchronization(){
	var input1;//当前显示表单的input输入框
	var input2;
	input1 = $("iframe[id='form"+tempId+"']").contents().find("input[type='text']");//当前显示的表单
	input2 =  $("iframe[name='eform']").contents().find("input[type='text']");//所有表单的输入框
	for(var i = 0;i<input1.length;i++){
		var name1 = $(input1[i]).attr("name");
		if(name1!=undefined && name1!="undefined"){
			for(var j = 0;j<input2.length;j++){
				var name2 = $(input2[j]).attr("name");
				if(name2!=undefined && name2!="undefined" && name1==name2){
					$(input2[j]).val($(input1[i]).val());
				}
			}
		}
	}
}

//表单字段输入校验，如果有一个表单校验不通过，则都不保存。
function validInput() {
	var formId = formIds.split(",");
	var msg = true;
	//表单字段输入校验，如果有一个表单校验不通过，则都不保存。
	for (var i = 1; i <= formId.length; i++) {
		var obj = true;
		var doc = document.getElementById('form'+formId[i-1]);
		if(doc!=null){
			if(doc.contentWindow.document.getElementById("guid")!=null){
				obj = doc.contentWindow.validInput();
			}
		}
		if(obj==false){
			msg = false;
		}
	}
	return msg;
}

//保存电子表单数据
function saveForm(objForm,action_Type,type) {
	objForm.ajaxSubmit({
        type: 'post', // 提交方式 get/post
    	url : ctx +"/eform/engine/saveForm?action_Type="+action_Type,
        dataType : 'json',
        success: function(data) {
        	if(data.success){
        		if(type=="save"){
            		alert("保存成功");
                    window.parent.refreshMenu(true);
            	}
        	}else{
        		if(type=="save"){
            		alert("保存失败");
            	}
        	}
        },
        error:function(data){ 
        	if(type=="save"){
        		alert("保存失败");
        	}
        }  
    });
 }

//提交当前显示表单
function submitForm(type){
	fieldSynchronization();
	var objForm = $("iframe[name='eform']").contents().find("form[name='frm_Edit_"+tempId+"']");//表单form对象
	var objProcess = objForm.contents().find("input[name='processInstanceId']");
	var objGuid = objForm.contents().find("input[name='guid']");
	var objTitle = objForm.contents().find("input[name='title']");
	var objtotal_amount = objForm.contents().find("input[name='total_amount']");
	if(objTitle!=null && objTitle.val() != "undefined" && objTitle.val() != undefined){
		documentTitle = objTitle.val();
	}
	if(objtotal_amount!=null && objtotal_amount.val() != "undefined" && objtotal_amount.val() != undefined){
		total_amount = objtotal_amount.val();
	}
	objProcess.val(processSerialNumber);
	objGuid.val(processSerialNumber);
	$.ajax({
		 data : {temp_Id:tempId,processInstanceId:processSerialNumber},
	     type: 'POST',
	     dataType:"json",
	     async: false,
	     url:  ctx+'/eform/engine/getData',
	     success:function(data){
	    	 edittype = data.edittype;
	     }
	 });
	if(processInstanceId==""||processInstanceId==null){//流程实例id为空，需要先保存草稿，再保存表单数据
		$.ajax({
			 data : {
				 itemId : itemId,
				 processSerialNumber : processSerialNumber,
				 processDefinitionKey : processDefinitionKey,
				 title : documentTitle
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/draft/saveDraft',
		     success:function(data){
		    	 if(data.success){
		    		saveForm(objForm,edittype,type);
		    	 }else{
		    		if(type=="save"){
			        	alert("保存失败");
			        }
		    	 }
		     }
		 });
	}else{
		$.ajax({//保存流程变量
			type : "POST",
			url : ctx + "/document/saveVariable",
			dataType:'JSON',
			async: false,
			data : {
				taskId : taskId,
				total_amount:total_amount,
				documentTitle : documentTitle
			},
			error : function() {
				if(type=="save"){
					alert("保存失败");
				}
			},
			success : function(data) {
				if (data.success) {
					saveForm(objForm,edittype,type);
				} else {
					if(type=="save"){
						alert("保存失败");
					}
				}
			}
		});
	}
}
