var frameID = newGuid();
var reAssignOrConsult="";//委托或协商标识
var documentTitle = "";

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
            if (title == '历程') {
                var src = $('#history').attr('src');
                if (src == 'about:blank') {
                    resize();
                    $('#history').attr('src',ctx + '/history/show?processInstanceId='+processInstanceId);
                }
            }else{
                for (var i = 1; i <= formId.length; i++) {
                    if (title == formName[i-1]) {
                        tempId = formId[i-1];
                    }
                }
            }
        }
    });

    //菜单按钮事件
    $("a[name='easyuiLinkButton']").click(function(event) {
        switch (this.id) {
            case 'button03':// 返回
                if(status==0){
                    window.parent.openTab("待阅件",ctx + '/freeChaoSong/todo');
                }else if(status==1){
                    window.parent.openTab("已阅件",ctx + '/freeChaoSong/done');
                }
                break;
        }
        return false;// 避免提交两次。
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

