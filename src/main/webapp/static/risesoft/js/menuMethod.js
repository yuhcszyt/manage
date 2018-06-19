
//发送选择人员界面
function docUserChoise(routeToTaskId) {
	if(routeToTaskId.indexOf("tongguobingbanjie")>=0){
		$.ajax({
			async : false,
			type : 'POST',
			dataType:'JSON',
			data : {
				taskId:taskId
			},
			url :ctx+"/buttonOperation/tongguobingbanjie",
			success : function(data) {
				alert(data.msg);
				if(data.success) {
					window.parent.refreshMenu();
				}
			}
		});
	}else if(routeToTaskId.indexOf("endevent")<0){
		openCurWindow({
			id : frameID,
			src : ctx + "/document/docUserChoise?itemId="+itemId+"&taskId="+taskId
			+ "&processDefinitionId=" + processDefinitionId+ "&routeToTask=" + routeToTaskId+"&processDefinitionKey="+processDefinitionKey,
			destroy : true,
			title : "选择人员",
			width : ($(window).width() - 100) + 'px',
			height : ($(window).height() - 60) + 'px',
			modal : true
		});
	}else{
		complete();
	}
}

//发送处理
function result4UserChoice(userChoice,routeToTaskId,sponsorGuid,isSendSms,isShuMing,smsContent) {
	if(reAssignOrConsult=='reAssign'){//委托
		if(userChoice.indexOf(";") > 0){
			alert("只能选择一个人员进行发送！");
			return false;
		}
		var userChoice = userChoice.split(":");
		url = ctx + '/buttonOperation/reAssign';
		doReAssignOrConsult(url,userChoice[1]+":"+userChoice[2]);
	}else if(reAssignOrConsult=='consult'){//协商
		if(userChoice.indexOf(";") > 0){
			alert("只能选择一个人员进行发送！");
			return false;
		}
		var userChoice = userChoice.split(":");
		url = ctx + '/buttonOperation/consult';
		doReAssignOrConsult(url,userChoice[1]+":"+userChoice[2]);
	}else{
		executeSend(routeToTaskId,userChoice,sponsorGuid,isSendSms,isShuMing,smsContent);
	}
}

//委托或协商发送
function doReAssignOrConsult(url,userChoice){
	$.ajax({
		async : false,
		type : 'POST',
		dataType:'JSON',
		data : {
			taskId:taskId,
			processDefinitionId:processDefinitionId,
			userChoice:userChoice
		},
		url :url,
		success : function(data) {
			//判断是否来自超级待办
			var locationurl = window.location.search;
			if(locationurl.indexOf("fromTodoList")>0){
				window.opener.location.reload();
				window.close();
			}else{
				if(data.success) {
					alert(data.msg);
					window.parent.refreshMenu();
				}else{
					alert(data.msg);
				}
			}
		}
	});
}

//发送
function executeSend(routeToTaskId,userIds,sponsorGuid) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : false,
		data : {
			'itemId':itemId,
			'sponsorHandle':sponsorHandle,
			'processInstanceId':processInstanceId,
			'taskId':taskId,
			'processDefinitionKey':processDefinitionKey,
			'documentTitle':documentTitle,
			'routeToTaskId' : routeToTaskId,
			'userChoice' : userIds,
			'sponsorGuid':sponsorGuid,
			'processSerialNumber':processSerialNumber
		},
		url : ctx + '/document/forwarding',
		success : function(data) {
			alert(data.msg);
			if(data.success){
				/*if(isSendSms){
					sendSms(isShuMing,smsContent);//发送短信
				}else{*/
					//判断是否来自超级待办
					var locationurl = window.location.search;
					if(locationurl.indexOf("fromTodoList")>0){
						window.opener.location.reload();
						window.close();
					}else{
						window.parent.refreshMenu();
					}
				//}
			}
		}
	});
}

//办结
function complete(){
    fieldSynchronization();//先同步表单字段，再进行验证，避免两个表单的同一个字段都为空时，当前表单填了验证成功，另一个表单验证不通过。
	if(!validInput()){
		return;
	}
	$.ajax({
		 data : {
			 taskId:taskId,
			 documentTitle:documentTitle
		 },
	     type: 'POST',
	     dataType:"json",
	     async: false,
	     url:  ctx+'/document/complete',
	     success:function(data){
	    	 if(data.success){
	    		 alert("办结成功");
	    		 window.parent.refreshMenu();
	    	 }else{
	    		 alert("办结失败");
	    	 }
	     }
	 });
}

//签收页面
function claim() {
	$.ajax({
		type : "GET",
		url :ctx+'/document/claim/?taskId='+taskId,
		dataType:'JSON',
		success : function(data) {
			var usersStr = data.usersStr;
			var deptNames = data.deptNames;
			if(usersStr.indexOf(",")<0){//一人多岗为一的情况，直接签收
				var user = usersStr;
				$.ajax({
					type : "POST",
					url :ctx+'/buttonOperation/claim/?taskId='+taskId+'&user='+encodeURI(user),
					dataType:'JSON',
					success : function(data) {
						alert(data.msg);
						//判断是否来自超级待办
						var locationurl= window.location.search;
						if(locationurl.indexOf("fromTodoList")>0){
							window.opener.location.reload();
							window.close();
						}else{
							if (data.success) {
								window.parent.refreshMenu();
							}
						}
					}
				});
			}else{//一人多岗为多的情况，跳转到岗位选择页面、选择一个岗位进行签收
				var userArray = new Array();
				userArray = usersStr.split(',');
				var deptNamesArray = new Array();
				deptNamesArray = deptNames.split(',');
				choiceDept(userArray,deptNamesArray,taskId);
			}
		}
	});
}

//一人多岗为多的情况，跳转到岗位选择页面、选择一个岗位进行签收
function choiceDept(userArray,deptNamesArray,taskId){
	for(var i=0;i<userArray.length;i++){
		$('#tableDept').append('<tr><td align="right"><input  type="radio" id="deptRadio'+i+'" name="deptRadio" value="'+userArray[i]+'">'+
				'</td><td align="left">'+deptNamesArray[i]+'</td></tr>');
	}
	$( "#dialog-choiceDept" ).dialog({
		title:"部门选择",
		resizable: false,
		width : 200,
		height:250,
		left:300,
		top:200,
		modal: true,
		buttons:[{
			text:'确定',
			handler:function() {
				var user = $("input[name='deptRadio']:checked").val();
				if(typeof(user)!="undefined" && user!=""){
					$.ajax({
						type : "POST",
						dataType:'JSON',
						url :ctx+'/buttonOperation/claim/?taskId='+taskId+'&user='+user,
						success : function(data) {
							alert(data.msg);
							//判断是否来自超级待办
							var locationurl= window.location.search;
							if(locationurl.indexOf("fromTodoList")>0){
								window.opener.location.reload();
								window.close();
							}else{
								if (data.success) {
									window.parent.refreshMenu();
								}
							}
						}
					});
				}else{
					alert("请选取部门");
				}
				$("#dialog-choiceDept").dialog( "close" );
			}
		},{
			text:'取消',
			handler: function() {
				$("#dialog-choiceDept").dialog( "close" );
			}
		}]
	});
}

//撤销签收
function unclaim() {
    $.ajax({
        type : "POST",
        url :ctx+'/buttonOperation/unclaim?taskId='+taskId,
        dataType:'JSON',
        success : function(data) {
            alert(data.msg);
            if(data.success){
                window.parent.refreshMenu();
            }
        }
    });
}

//拒签
function refuseClaim(){
    var url="";
	if(!isLastPerson4RefuseClaim){
        url = ctx+'/buttonOperation/refuseClaim?taskId='+taskId;
	}else{
        url = ctx+'/buttonOperation/refuseClaimRollback?taskId='+taskId;
	}
    $.ajax({
        type : "POST",
        url :url,
        dataType:'JSON',
        success : function(data) {
            alert(data.msg);
            if (data.success) {
                window.parent.refreshMenu();
            }
        }
    });
}

//退回、收回原因
function openDialog4Reason(type){
    var title='';
	$( "#dialog-rejectReason" ).dialog({
		title:"填写"+title+"原因",
		href:ctx+'/buttonOperation/rollTakeBackReason?taskId='+taskId,
		resizable: false,
		width : 670,
		height:400,
		left:320,
		top:100,
		modal: true,
		buttons:[{
			text:'确定',
			handler:function() {
				var backValue = false;
				var d = 1;
				var info=title+"原因: ";
                if(document.getElementById("infoo").value.trim()!=""){
                	backValue=true;
                    info = info+document.getElementById("infoo").value;
                }
				if(!backValue){
					alert("原因不能为空！");
					return;
				} else {
					var url = '';
					if(type=="rollback"){
						url= ctx+'/buttonOperation/rollback?taskId='+taskId+"&rejectReason="+encodeURI(info)+"&processInstanceId="+processInstanceId
                            +"&documentTitle="+encodeURI(documentTitle);
					}else if(type=="takeBack"){
						url= ctx+'/buttonOperation/takeBack?taskId='+taskId+"&rejectReason="+encodeURI(info)+"&processInstanceId="+processInstanceId
                            +"&documentTitle="+encodeURI(documentTitle);
					}
					$.ajax({
						type : "POST",
						url :url,
						dataType:'JSON',
						success : function(data) {
							alert(data.msg);
                            if (data.success) {
                                window.parent.refreshMenu();
                            }
						}
					});
					$("#dialog-rejectReason").dialog("close");
				}
			}
		},{
			text:'取消',
			handler: function() {
				$("#dialog-rejectReason").dialog("close");
			}
		}]
	});
}

//退回
function rollback(){
    openDialog4Reason("rollback");
}

//完成
function completeTask(){
    $.ajax({
        async : false,
        type : 'POST',
        dataType:'JSON',
        data : {
            taskId:taskId
        },
        url :ctx + '/buttonOperation/completeTask',
        success : function(data) {
            alert(data.msg);
            //判断是否来自超级待办
            var locationurl= window.location.search;
            if(locationurl.indexOf("fromTodoList")>0){
                window.opener.location.reload();
                window.close();
            }else{
                if(data.success) {
                    window.parent.refreshMenu();
                    //window.parent.openTab("待办件",ctx + '/worklist/todo');
                }
            }
        }
    });
}

//办理完成
function handleParallel(){
	$.ajax({
		async : false,
		type : 'POST',
		dataType:'JSON',
		data : {
			taskId : taskId
		},
		url : ctx+'/buttonOperation/handleParallel',
		success : function(data) {
			alert(data.msg);
			if(data.success){
				 window.parent.refreshMenu();
			}
		}
	});
}

//串行送下一人
function handleSerial(){
	$.ajax({
		async : false,
		type : "POST",
		url : ctx+"/buttonOperation/handleSerial",
		dataType:'JSON',
		data : {
			taskId : taskId
		},
		error : function(data) {
			alert("发送失败");
		},
		success : function(data) {
			 alert(data.msg);
			if(data.success){
				 window.parent.refreshMenu();
			}
		}
	});
}

//特殊办结
function specialComplete(){
    $.ajax({
        data : {taskId:taskId},
        type: 'POST',
        dataType:"json",
        async: false,
        cache : false,
        url:  ctx + "/buttonOperation/specialComplete",
        success:function(data){
            alert(data.msg);
            if(data.success){
                window.parent.refreshMenu();
            }
        }
    });
}

//抄送
function cc(){
    openCurWindow({
        id : frameID,
        src : ctx + "/freeChaoSong/docUserChoise?processInstanceId="+processInstanceId+"&taskId="+taskId,
        destroy : true,
        title : "选择人员",
        width : ($(window).width() - 100) + 'px',
        height : ($(window).height() - 10) + 'px',
        modal : true
    });
}


//收回
function takeBack(){
    openDialog4Reason("takeBack");
}

//重定位人员选择
function reposition(routeToTaskId){
    openCurWindow({
        id : frameID,
        src : ctx + "/document/docUserChoise?itemId="+itemId+"&taskId="+taskId
        + "&processDefinitionId=" + processDefinitionId+ "&routeToTask=" + routeToTaskId
		+"&processDefinitionKey="+processDefinitionKey+"&isReposition=1",
        destroy : true,
        title : "选择人员",
        width : ($(window).width() - 100) + 'px',
        height : ($(window).height() - 10) + 'px',
        modal : true
    });
}

//重定位发送
function repositionSend(routeToTask,userIds) {
    $.ajax({
        type : 'POST',
        dataType : 'json',
        async : false,
        data : {
            'taskId':taskId,
            'routeToTaskId' : routeToTask,
            'userChoice' : userIds,
        },
        url : ctx + '//buttonOperation/reposition',
        success : function(data) {
            alert(data.msg);
            if(data.success){
                window.parent.refreshMenu();
            }
        }
    });
}



//打开打印页面
function openPrintForm(tempId){
	var iframeForm = $("#form"+tempId);
	var htmls = iframeForm.find('html');
	var ifmBody = $(iframeForm).contents().find("body");
	var parentID = ctx + '/document/printPreview';
	$(ifmBody).animate({scrollTop:0},0);
    printscreen(ifmBody,tempId);
	window.open(parentID,'_blank'); 
}

//获取打印截图
var newImgUrl="";
function printscreen(ifmBody,tempId){
	var h = $(ifmBody).height()+20;
	$(ifmBody).height(h);
	var textareas = $(ifmBody).find("textarea");
	var select = $(ifmBody).find("select");
	for(i=0;i<select.length;i++){
		$(select[i]).removeAttr("disabled");
		if($(select[i]).val()==""){
			$(select[i]).find("option:selected").text("　");
		}
	}
	for(var i=0;i<textareas.length;i++){
		$(textareas[i]).removeAttr("disabled");
	}
	var inputs = $(ifmBody).find("input");
	for(var i=0;i<inputs.length;i++){
		$(inputs[i]).removeAttr("disabled");
	}
	var inputs1 = $(ifmBody).find("input[type='radio']");
	for(var i=0;i<inputs1.length;i++){
		if($(inputs1[i]).attr("checked")=="undefined"||$(inputs1[i]).attr("checked")==undefined){
			$(inputs1[i]).parent().hide();
		}
	}
	html2canvas(ifmBody, {  
        allowTaint: true,  
        height:$(ifmBody).outerHeight(),  
        onrendered: function(canvas) {  
            canvas.id = "mycanvas";  
            //生成base64图片数据  
            var dataUrl = canvas.toDataURL();
            newImgUrl = canvas.toDataURL();
            for(var i=0;i<inputs1.length;i++){
    			$(inputs1[i]).parent().show();
    		}
            if (itembox == 'doing' || itembox == 'done') {
        		for(var i = 0;i<inputs.length;i++){
        			$(inputs[i]).attr("readonly",true); 
        			inputs[i].disabled="disabled";
        		}
        		for(var i = 0;i<select.length;i++){
        			$(select[i]).attr("readonly",true); 
        			select[i].disabled="disabled";
        		}
        		for(var i = 0;i<textareas.length;i++){
        			$(textareas[i]).attr("readonly",true); 
        		}
        		if(itembox=="todo"){
        			var input1 = $(ifmBody).find("input[type='radio']");
        			for(var i = 0;i<input1.length;i++){
        				$(input1[i]).attr("readonly",false); 
        				input1[i].disabled="";
        			}
        		}
        	}
        }  
    });
}
