$(function() {
		if(itembox=="add"){
			edittype = 0;
		}
		var tempId = formIds.split(",");
		var formName = formNames.split(",");// 表单名称数组
		var iframeHtml = "";
		var menuHtml = "";
		var printMenu = "";
		if(formIds!=null && formIds!=""){
			for (var i = 0; i < tempId.length; i++) {//动态表单显示
				$.ajax({
					 data : {temp_Id:tempId[i],processInstanceId:formId},
				     type: 'POST',
				     dataType:"json",
				     async: false,
				     url:  ctx+'/eform/engine/getData',
				     success:function(data){
				    	 edittype = data.edittype;
				     }
				 });
				//表单
				iframeHtml +='<iframe id="iframe'+tempId[i]+'" name="wf-eform" '
				+'src="'+ctx+'/eform/engine/getTemplate?temp_Id='+tempId[i]+'&edittype='+edittype+'&guid='+formId+'"> </iframe>';
				//表单按钮
				menuHtml += '<li id="menuLi'+tempId[i]+'" name="menuLi" onclick=openDocument(this,"'+tempId[i]+'")>'+formName[i]+'</li>';
				//打印表单按钮
				printMenu += '<li id="printLi'+tempId[i]+'" name="menuLi" onclick=printForm("'+tempId[i]+'");>打印'+formName[i]+'</li>';
			}
		}
		temp_Id = tempId[0];
		$(".document").append(iframeHtml);
		$('#iframe'+tempId[0]).show();
		$("#formUl").append(menuHtml);
		$("#printUl").append(printMenu);
		$("#menuLi"+tempId[0]).css("color","#ffaa25");
		
		var sendMenu = "";
		var menuNames = menuName.split(",");
		var menuKeys = menuKey.split(",");
		for(var i=0; i<menuKeys.length; i++){//发送按钮
			if(directSendStr){//直接发送
				sendMenu += '<li id="'+menuKeys[i]+'" name="menuLi" onclick=directSend("'+menuKeys[i]+'");>'+menuNames[i]+'</li>';
			}else{
				if(menuNames[i]=="结果反馈"){//结果反馈不用选人，直接发送
					sendMenu += '<li id="jiegoufankui" style="display:none;" name="menuLi" onclick=feedback("'+menuKeys[i]+'");>'+menuNames[i]+'</li>';
				}else{
					sendMenu += '<li id="'+menuKeys[i]+'" name="menuLi" onclick=send("'+menuKeys[i]+'");>'+menuNames[i]+'</li>';
				}
			}
			if(showFeedBackWinXin){//反馈微信按钮，直接办结
				sendMenu += '<li id="fankuiweixin" name="menuLi" onclick="complete();">反馈微信</li>';
			}
		}
		$("#sendUl").append(sendMenu);
		
	});

	//打开表单
	function openDocument(obj,tempId) {
		if($(obj).html()=="反馈单"){
			$("#jiegoufankui").show();
		}else{
			$("#jiegoufankui").hide();
		}
		$("#process").css("color","#000");
		$("#formUl li").css("color","#000");
		$(obj).css("color","#ffaa25");
		saveForm();
		if(edittype==0||edittype=="0"){
			$.ajax({
				 data : {temp_Id:tempId,processInstanceId:formId},
			     type: 'POST',
			     dataType:"json",
			     async: false,
			     url:  ctx+'/eform/engine/getData',
			     success:function(data){
			    	 edittype = data.edittype;
			     }
			 });
		}
		var url = ctx+"/eform/engine/getTemplate?temp_Id="+tempId+"&edittype="+edittype+"&guid="+formId;
		$('#iframe'+tempId).attr('src',url);
		$('.document iframe').hide();
		$('#iframe'+tempId).show();
		setTimeout("fieldSynchronization('"+temp_Id+"')",1000);
		temp_Id = tempId;
	}
	
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
	
	//验证是否签写内容
	function checkSignContent(str,type){
		var checkSignContent;
		$.ajax({
			  async:false,
			  cache: false,
		      type: "GET",
		      url: ctx+"/extendedContent/checkSignContent",
		      data: {taskId:taskId,processSerialNumber:processSerialNumber,category:type},
		      dataType: "json",
		      success: function(data){
		    	  checkSignContent = data.checkSignContent;
			      	if(!checkSignContent){
			      		alert(str);
			      	}
		      }
		});
		return checkSignContent;
	}
	
	
	//表单字段输入校验，如果有一个表单校验不通过，则都不保存。
	function validInput() {
		var formId = formIds.split(",");
		var msg = true;
		//表单字段输入校验，如果有一个表单校验不通过，则都不保存。
		for (var i = 0; i < formId.length; i++) {
			var obj = true;
			if(document.getElementById('iframe'+formId[i])!=null){
				obj = document.getElementById('iframe'+formId[i]).contentWindow.validInput();
			}
			if(obj==false){
				msg = false;
				return msg;
			}
		}
		return msg;
	}
	
	//表单字段同步
	function fieldSynchronization(tempId){
		var input1;//当前显示表单的input输入框
		var input2;
		input1 = $("iframe[id='iframe"+tempId+"']").contents().find("input[type='text']");//当前显示的表单
		input2 =  $("iframe[name='wf-eform']").contents().find("input[type='text']");//所有表单的输入框
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
	
	//提交表单
	function submitForm(objForm,action_Type,type){
		objForm.ajaxSubmit({
			async:false, 
			cache:false,
	        type: 'post', // 提交方式 get/post
	    	url :ctx+"/eform/engine/saveForm?action_Type="+action_Type,
	        dataType : 'json',
	        success: function(data) {
	        	if(type=="save"){
	        		if(data.success){
	        			//refreshMenu();
	            		alert("保存成功");
	            	}else{
	            		alert("保存失败");
	            	}
	        	}
	        },
	        error:function(data){ 
	        	if(type=="save"){
	        		alert("保存失败!");
	        	}
	        }  
	    });
		return false;
	}
	
	//保存表单
	function saveForm(type) {
		if(type=="save"){
			if(!validInput()){
				return;
			}
		}
		if(itembox=="add"||itembox=="todo"){
			var action_Type;
	    	var objForm = $("iframe[name='wf-eform']").contents().find("form[name='frm_Edit_"+temp_Id+"']");//表单form对象
	    	var objProcess = objForm.contents().find("input[name='processInstanceId']");
			var objGuid = objForm.contents().find("input[name='guid']");
			var objTitle = objForm.contents().find("input[name='title']");
			if(objTitle!=null && objTitle.val() != "undefined" && objTitle.val() != undefined){
				documentTitle = objTitle.val();
			}
			if(objGuid.val()==null||objGuid.val()=="undefined"||objGuid.val()==undefined||objGuid.val()==""){
				objProcess.val(formId);
				objGuid.val(formId);
			}
			
			var register_numberObj = objForm.contents().find("input[name='retb_register_number']");
			var event_contentObj = objForm.contents().find("textarea[name='retb_event_content']");
			var event_siteObj = objForm.contents().find("textarea[name='retb_event_site']");
			var urgencyObj = objForm.contents().find("select[name='retb_urgency']");
			var closing_dateObj = objForm.contents().find("input[name='retb_closing_date']");
			if(register_numberObj!=null && register_numberObj.val() != "undefined" && register_numberObj.val() != undefined){
				register_number = register_numberObj.val();
			}
			if(event_siteObj!=null && event_siteObj.val() != "undefined" && event_siteObj.val() != undefined){
				event_site = event_siteObj.val();
			}
			if(urgencyObj!=null && urgencyObj.val() != "undefined" && urgencyObj.val() != undefined){
				urgency = urgencyObj.val();
			}
			if(closing_dateObj!=null && closing_dateObj.val() != "undefined" && closing_dateObj.val() != undefined){
				closing_date = closing_dateObj.val();
			}
			if(event_contentObj!=null && event_contentObj.val() != "undefined" && event_contentObj.val() != undefined){
				event_content = event_contentObj.val();
				saveVariable();//每次切换表单或保存或发送时，都保存一次流程变量
			}
			$.ajax({//查询表单是否有数据，action_Type=0为新增模式，1为编辑模式
				 data : {temp_Id:temp_Id,processInstanceId:formId},
			     type: 'POST',
			     dataType:"json",
			     async: false,
			     url:  ctx + '/eform/engine/getData',
			     success:function(data){
			    	 action_Type = data.edittype;
			    	 submitForm(objForm,action_Type,type);
			     }
			 });
			if((processInstanceId==""||processInstanceId==null)&&type=="save"){//流程实例为空时，点击保存时启动流程
				startProcess();
			}
		}
     }
	
	//启动流程
	function startProcess(){
		$.ajax({
			 data : {
				 itemId:itemId,
				 processSerialNumber:processSerialNumber,
				 processDefinitionKey:processDefinitionKey,
				 register_number:register_number,
				 event_content:event_content,
				 event_site:event_site,
				 urgency:urgency,
				 closing_date:closing_date
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/startProcess',
		     success:function(data){
		    	 if(data.success){
		    		 processInstanceId = data.processInstanceId;
		    		 taskId = data.taskId;
		    	 }else{
		    		 
		    	 }
		     }
		 });
	}
	
	//保存流程变量
	function saveVariable(){
        var objForm = $("iframe[name='wf-eform']").contents().find("form[name='frm_Edit_"+temp_Id+"']");//表单form对象
        var register_time=objForm.contents().find("input[name='retb_register_time']");
		$.ajax({
			 data : {
				 processInstanceId:processInstanceId,
				 taskId:taskId,
				 register_number:register_number,
				 event_content:event_content,
				 event_site:event_site,
				 urgency:urgency,
				 closing_date:closing_date,
                 register_time:register_time
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/saveVariable',
		     success:function(data){
		     }
		 });
	}
	
	
	//直接发送
	function directSend(routeToTask){
		if(!validInput()){
			return;
		}
		saveForm();
		if(!checkSignOpinion()){
			return false;
		}
		parent.layer.load(2);
		$.ajax({
			 data : {
				 processInstanceId:processInstanceId,
				 taskId:taskId,
				 routeToTask:routeToTask
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/directSend',
		     success:function(data){
		    	 alert(data.msg);
		    	 if(data.success){
		    		 parent.layer.closeAll('loading');
		    		 parent.todoList();
		    	 }
		     }
		 });
		
	}
	
	//发送
	function send(routeToTask){
		if(!validInput()){
			return;
		}
		saveForm();
		if((processInstanceId==""||processInstanceId==null)){//流程实例为空时，点击发送时启动流程
			startProcess();
		}
		if(taskDefKey=="hezhangzhigongzuochu"){
			if(!checkSignContent("请填写处理要求！","chuliyaoqiu")){
				return false;
			}
		}
		//iframe层
 		layer.open({
 		  type: 2,
 		  title: '',
 		  shadeClose: true,
 		  shade: 0.1,
 		  area: ['70%', '90%'],
 		  content: ctx+'/ehDocument/userChoice?itemId='+itemId+'&routeToTask='
 				  +routeToTask+'&processDefinitionKey='+processDefinitionKey+'&processDefinitionId='
 				  +processDefinitionId+'&taskId='+taskId//iframe的url
 		}); 
	}
	
	//结果反馈
	function feedback(routeToTask){
		if(!validInput()){
			return;
		}
		saveForm();
		if(!checkSignContent("请填写处理结果！","resultContent")){
			return false;
		}
		parent.layer.load(2);
		$.ajax({
			 data : {
				 processInstanceId:processInstanceId,
				 taskId:taskId,
				 routeToTask:routeToTask
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/feedback',
		     success:function(data){
		    	 alert(data.msg);
		    	 if(data.success){
		    		 parent.layer.closeAll('loading');
		    		 parent.todoList();
		    	 }
		     }
		 });
	}
	
	//获取打印截图
	var newImgUrl="";
	function printscreen(tempId){
		var iframeForm = $("#iframe"+tempId);
		var htmls = iframeForm.find('html');
		var ifmBody = $(iframeForm).contents().find("body");
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
                if(itembox=="done"||itembox=="doing"){
                	 for(var i=0;i<select.length;i++){
             			$(select[i]).attr("disabled","disabled");
             		}
                     for(var i=0;i<inputs.length;i++){
             			$(inputs[i]).attr("disabled","disabled");
             		}
                }
            }  
        });
		
	}
	
	//打开打印页面
	function openPrintForm(tempId){
		var iframeForm = $("#iframe"+tempId);
		var htmls = iframeForm.find('html');
		var ifmBody = $(iframeForm).contents().find("body");
		var parentID = ctx + '/ehDocument/printPreview';
		$(ifmBody).animate({scrollTop:0},0);
	    printscreen(tempId);
		window.open(parentID,'_blank'); 
	}
	
	//打印表单
	function printForm(tempId){
		if(tempId!=temp_Id){
			var obj = $("#menuLi"+tempId);
			openDocument(obj,tempId);
		}
		setTimeout("openPrintForm("+tempId+")",1000);
	}
	
	//办结
	function complete(){
		if(!validInput()){
			return;
		}
		if(!checkSignContent("请填写处理结果！","resultContent")){
			return false;
		}
		parent.layer.load(2);
		saveForm();
		if((processInstanceId==""||processInstanceId==null)){//流程实例为空时，启动流程
			startProcess();
		}
		$.ajax({
			 data : {
				 taskId:taskId
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/complete',
		     success:function(data){
		    	 if(data.success){
		    		 alert("办结成功");
		    		 parent.layer.closeAll('loading');
		    		 parent.todoList();
		    	 }else{
		    		 alert("办结失败");
		    		 parent.layer.closeAll('loading');
		    	 }
		     }
		 });
	}
	
	//退回
	function rollback(){
		if(!validInput()){
			return;
		}
		parent.layer.load(2);
		saveForm();
		$.ajax({
			 data : {
				 taskId:taskId
			 },
		     type: 'POST',
		     dataType:"json",
		     async: false,
		     url:  ctx+'/ehDocument/rollback',
		     success:function(data){
		    	 if(data.success){
		    		 alert("退回成功");
		    		 parent.layer.closeAll('loading');
		    		 parent.todoList();
		    	 }else{
		    		 alert("退回失败");
		    		 parent.layer.closeAll('loading');
		    	 }
		     }
		 });
	}