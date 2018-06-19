// 请勿修改，否则可能出错
	var userAgent = navigator.userAgent, 
				rMsie = /(msie\s|trident.*rv:)([\w.]+)/, 
				rFirefox = /(firefox)\/([\w.]+)/, 
				rOpera = /(opera).+version\/([\w.]+)/, 
				rChrome = /(chrome)\/([\w.]+)/, 
				rSafari = /version\/([\w.]+).*(safari)/;
				var browser;
				var version;
				var ua = userAgent.toLowerCase();
				function uaMatch(ua) {
					var match = rMsie.exec(ua);
					if (match != null) {
						return { browser : "IE", version : match[2] || "0" };
					}
					var match = rFirefox.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rOpera.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rChrome.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rSafari.exec(ua);
					if (match != null) {
						return { browser : match[2] || "", version : match[1] || "0" };
					}
					if (match != null) {
						return { browser : "", version : "0" };
					}
				}
				var browserMatch = uaMatch(userAgent.toLowerCase());
				if (browserMatch.browser) {
					browser = browserMatch.browser;
					version = browserMatch.version;
				}
				//document.write(browser);
/*
谷歌浏览器事件接管
*/
function OnComplete2(type,code,html) //新建针对于SaveToURL方法的回调函数
{
	//alert(type);
	//alert(code);
   
	riseOffice.ShowTipMessage("提示",html);

	//alert("SaveToURL成功回调");
}
function OnComplete(type,code,html)//新建针对于BeginOpenFromURL方法的回调函数
{
	//alert(type);
	//alert(code);
	//alert(html);
	//alert("BeginOpenFromURL成功回调");
}
function OnComplete3(str,doc) //新建OnDocumentOpened事件对应的回调函数
{
	//由于谷歌火狐的机制与IE不同，对于ActiveX控件的事件的写法不同。如IE下直接在OnDocumentOpened事件里设置Saved属性等，谷歌火狐下需要在回调事件里进行处理
	//setFileOpenedOrClosed(true);	
	riseOffice.activeDocument.saved=true;//saved属性用来判断文档是否被修改过,文档打开的时候设置成ture,当文档被修改,自动被设置为false,该属性由office提供.
										
	//alert("ondocumentopened成功回调");//OndocumentOpened事件里可以对ActiveDocument对象进行操作
}
function publishashtml(type,code,html){
	//alert(html);
	//alert("Onpublishashtmltourl成功回调");
}
function publishaspdf(type,code,html){
	//alert(html);
	//alert("Onpublishaspdftourl成功回调");
}
function saveasotherurl(type,code,html){
//alert(html);
//alert("SaveAsOtherformattourl成功回调");
}
function dowebget(type,code,html){
//alert(html);
//alert("OnDoWebGet成功回调");
}
function webExecute(type,code,html){
//alert(html);
//alert("OnDoWebExecute成功回调");
}
function webExecute2(type,code,html){
//alert(html);
//alert("OnDoWebExecute2成功回调");
}
function FileCommand(TANGER_OCX_str,TANGER_OCX_obj){
	if (TANGER_OCX_str == 3) 
	{
		//alert("不能保存！");
		TANGER_OCX_OBJ.CancelLastCommand = true;
	}
}
function CustomMenuCmd(menuPos,submenuPos,subsubmenuPos,menuCaption,menuID){
//alert("第" + menuPos +","+ submenuPos +","+ subsubmenuPos +"个菜单项,menuID="+menuID+",菜单标题为\""+menuCaption+"\"的命令被执行.");
}

function CustomButtonOnMenuCmd(btnPos,btnCaption,btnCmdid){
	//alert("btnPos=" + btnPos + ",btnCaption=" + btnCaption+ ",btnCmdid=" + btnCmdid);
	if(0 == btnCmdid) //切换全屏
	{
//事件处理代码中可以直接引用控件属性或者方法，
//可以省略控件对象前缀
		FullScreenMode = !FullScreenMode; 
	}
	

	
}

function SheetBeforeRightClick(SheetName, row, col, IsCancel){////新建OnSheetBeforeRightClick事件对应的回调函数
	TANGER_OCX_OBJ.CancelSheetRightClick = true;//取消原本的右键菜单
	TANGER_OCX_OBJ.CustomMenuStr = "ntko=1&wupeng=2";//设置右键菜单的项
	
}

function ClickCustomContextMenu(menuindex){//定义OnClickCustomContextMenu事件对应的回调函数
	TANGER_OCX_OBJ.ShowTipMessage("自定义Excel右键菜单项",menuindex);
	
}
var classid = 'A64E3073-2016-4baf-A89D-FFE1FAA10ED2';
var bit =window.navigator.platform;//使用window.navigator.platform获取当前浏览器的位数
//alert(bit);
if(bit=="Win32"){//判断当前浏览器位数，加载不同位数的控件  32位浏览器则加载32位控件，注意此处一定写为Win32而非win32!
	if (browser=="IE"){
		//alert("32位IE");
	// if(window.navigator.platform=="Win32"){//判断当前浏览器位数，加载不同位数的控件 注意此处一定写为Win32而非win32!
		document.write('<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ');
		document.write('<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ');
		/*控件的Classid（以及正式版的授权信息）必须是当前所引用的控件是完全一致的，否则可能无法正常使用；控件的classid\版本等信息均可在
       对应的控件cab包里对应的inf文件里找到*///clsid={A64E3073-2016-4baf-A89D-FFE1FAA10EC0}
		 
		document.write('<object id="riseOffice" classid="clsid:A64E3073-2016-4baf-A89D-FFE1FAA10ED2"');
	    /*codebase属性由控件的路径与控件的版本由#号连接组成，路径部分必须正确，可以是从项目根目录下开始写的绝对路径，
        也可以是相对与引用控件的页面的相对路径（注意：必须是相对于引用控件的页面的，并非相对于此JS文件的），否则可能导致浏览器
        无法下载到控件而加载不上;控件的版本也建议写成与控件一致的，如果高了每次加载的时候浏览器均会提示再次加载的
      
        width 与 height属性为控件的高宽，其设置方法有两种：1.百分比形式，即相对于父容器的高宽其百分比为多少；2.XXXpx,直接指定高宽的数值，单位严格使用px,
        避免由于浏览器版本不同解析页面方式不同造成的显示不一致的情况；如需隐藏控件，建议将控件高宽设置为1px*/
		document.write('codebase="${ctx}/static/tags/cab/ofctnewclsid.cab#version=5,0,3,9" width="100%" height="800px">   ');
		document.write('<param name="isuseutf8url" value="-1">   ');
		document.write('<param name="isuseutf8data" value="-1">   ');
		document.write('<param name="borderstyle" value="1">   ');
		document.write('<param name="bordercolor" value="14402205">   ');
		document.write('<param name="titlebarcolor" value="13160660">   ');
		/*ProductCaption以及ProductKey属性为正式版控件才需要设置的*/
		document.write('<param name="MakerCaption" value="北京有生博大软件技术有限公司">');
		document.write('<param name="MakerKey" value="7CAA90E9B33637E9A390DDD12B9149C3FBC57687">');
		document.write('<param name="ProductCaption" value="北京有生博大软件股份有限公司"> ');//
		document.write('<param name="ProductKey" value="DA0213A4558B3C505F4F31C7FD84819B1CE24D7A">');
		document.write('<param name="titlebartextcolor" value="0">   ');
		document.write('<param name="menubarcolor" value="13160660">   ');
		document.write('<param name="menubuttoncolor" value="13160660">   ');
		document.write('<param name="menubarstyle" value="3">   ');
		document.write('<param name="menubuttonstyle" value="7">   ');
		document.write('<param name="webusername" value="ntko">   ');
		document.write('<param name="caption" value="欢迎使用">   ');
		document.write('<span style="color:red">32位IE浏览器不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</span>   ');
		document.write('</object>');
				 
	}
	
	else if (browser=="firefox"){ 
/*注册对应的回调函数，如ForOnSaveToURL="OnComplete2" ForOnBeginOpenFromURL="OnComplete" ForOndocumentopened="OnComplete3"
对于控件的方法在跨浏览器情况下对应的事件命名为On+方法名，如SaveToURL对应的事件为OnSaveToURL，注册回调函数时候，则需要在事件
名是添加For,如ForOnSaveToURL.
*/
	
		document.write('<object id="riseOffice" type="application/ntko-plug"  codebase="${ctx}/static/tags/cab/ofctnewclsid.cab#version=5,0,3,9" width="100%" height="800" ForOnSaveToURL="OnSaveToURL" ForOnAddTemplateFromURL="OnAddTemplateFromURL" ForOndocumentopened="setFileReadOnly"');
		document.write('ForOnpublishAshtmltourl="publishashtml"');
		document.write('ForOnpublishAspdftourl="publishaspdf"');
		document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl"');
		document.write('ForOnDoWebGet="dowebget"');
		document.write('ForOnDoWebExecute="webExecute"');
		document.write('ForOnDoWebExecute2="webExecute2"');
		document.write('ForOnFileCommand="FileCommand"');
		document.write('ForOnCustomMenuCmd2="selectCustomMenuCmd"');
		document.write('ForOnCustomButtonOnMenuCmd="CustomButtonOnMenuCmd"');
		
		document.write('ForOnSheetBeforeRightClick="SheetBeforeRightClick"');//Excel右键事件 OnSheetBeforeRightClick
		document.write('ForOnClickCustomContextMenu="ClickCustomContextMenu"');//excel右键自定义菜单事件 OnClickCustomContextMenu
		
		document.write('_IsUseUTF8URL="-1"   ');
		
		/*ProductCaption以及ProductKey属性为正式版控件才需要设置的*/
		document.write('_MakerCaption="北京有生博大软件技术有限公司"');
		document.write('_MakerKey="7CAA90E9B33637E9A390DDD12B9149C3FBC57687"');
		document.write('_ProductCaption="北京有生博大软件股份有限公司" ');//
		document.write('_ProductKey="DA0213A4558B3C505F4F31C7FD84819B1CE24D7A"');


		document.write('_IsUseUTF8Data="-1"   ');
		document.write('_BorderStyle="1"   ');
		document.write('_BorderColor="14402205"   ');
		document.write('_MenubarColor="14402205"   ');
		document.write('_MenuButtonColor="16180947"   ');
		document.write('_MenuBarStyle="3"  ');
		document.write('_MenuButtonStyle="7"   ');
		document.write('_WebUserName="NTKO"   ');
		document.write('clsid="{'+classid+'}" >');
		document.write('<SPAN STYLE="color:red">尚未安装NTKO Web FireFox跨浏览器插件。请点击<a type="application-x/force-download" href="'+ctx+'/static/tags/exe/北京有生博大软件技术股份有限公司.exe">安装组件</a></SPAN>  <br/><SPAN STYLE="color:red">火狐浏览器建议使用51及以下版本 。</SPAN>  ');
		document.write('</object>   ');
}else if(browser=="chrome"){
	
	/*注册对应的回调函数，如ForOnSaveToURL="OnComplete2" ForOnBeginOpenFromURL="OnComplete" ForOndocumentopened="OnComplete3"
对于控件的方法在跨浏览器情况下对应的事件命名为On+方法名，如SaveToURL对应的事件为OnSaveToURL，注册回调函数时候，则需要在事件
名是添加For,如ForOnSaveToURL.
*/
		document.write('<object id="riseOffice" clsid="{'+classid+'}"  ForOnSaveToURL="OnSaveToURL" ForOnAddTemplateFromURL="OnAddTemplateFromURL" ForOndocumentopened="setFileReadOnly"  ForOnBeginOpenFromURL="OnremoveTaoHong"');
		document.write('ForOnpublishAshtmltourl="publishashtml"');
		document.write('ForOnpublishAspdftourl="publishaspdf"');
		document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl"');
		document.write('ForOnDoWebGet="dowebget"');
		document.write('ForOnDoWebExecute="webExecute"');
		document.write('ForOnDoWebExecute2="webExecute2"');
		document.write('ForOnFileCommand="FileCommand"');
		document.write('ForOnCustomMenuCmd="getCustomMenuCmd"');
		document.write('ForOnCustomMenuCmd2="selectCustomMenuCmd"');
		document.write('ForOnCustomButtonOnMenuCmd="CustomButtonOnMenuCmd"');
		/*ProductCaption以及ProductKey属性为正式版控件才需要设置的*/
		document.write('_MakerCaption="北京有生博大软件技术有限公司"');
		document.write('_MakerKey="7CAA90E9B33637E9A390DDD12B9149C3FBC57687"');
		document.write('_ProductCaption="北京有生博大软件股份有限公司" ');//
		document.write('_ProductKey="DA0213A4558B3C505F4F31C7FD84819B1CE24D7A"');
		document.write('codebase="${ctx}/static/tags/cab/ofctnewclsid.cab#version=5,0,3,9" type="application/ntko-plug" ');
		document.write('_IsUseUTF8URL="-1"   ');
		document.write('_IsUseUTF8Data="-1"   ');
		document.write('_BorderStyle="1"   ');
		document.write('_BorderColor="14402205"   ');
		document.write('_MenubarColor="14402205"   ');
		document.write('_MenuButtonColor="16180947"   ');
		document.write('_MenuBarStyle="3"  ');
		document.write('_MenuButtonStyle="7"   ');
		document.write('_WebUserName="NTKO"   ');
		//document.write('_Caption="NTKO OFFICE文档控件示例演示 http://www.ntko.com">    ');
		document.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a type="application-x/force-download" href="'+ctx+'/static/tags/exe/北京有生博大软件技术股份有限公司.exe">安装组件</a></SPAN> ');
		document.write('</object>');
	}else if (Sys.opera){
		//alert("sorry,ntko web印章暂时不支持opera!");
	}else if (Sys.safari){
		// alert("sorry,ntko web印章暂时不支持safari!");
	}


}
else { //64位浏览器加载64位文档控件
	if(browser=="IE"){//clsid={A64E3073-2016-4baf-A89D-FFE1FAA10EE0}
		 document.write('<object id="riseOffice" classid="clsid:A64E3073-2016-4baf-A89D-FFE1FAA10EE0"');
		 document.write('codebase="${ctx}/static/tags/cab/ofctnewclsid.cab#version=5,0,3,9" width="100%" height="800px">   ');
		 document.write('<param name="IsUseUTF8URL" value="-1">   ');
		 document.write('<param name="IsUseUTF8Data" value="-1">   ');
		 document.write('<param name="BorderStyle" value="1">   ');
		 document.write('<param name="BorderColor" value="14402205">   ');
		 document.write('<param name="TitlebarColor" value="13160660">   ');
		//document.write('<param name="isoptforopenspeed" value="0">   ');

		/*ProductCaption以及ProductKey属性为正式版控件才需要设置的*/
		 document.write('<param name="MakerCaption" value="北京有生博大软件技术有限公司">');
		 document.write('<param name="MakerKey" value="7CAA90E9B33637E9A390DDD12B9149C3FBC57687">');
		 document.write('<param name="ProductCaption" value="北京有生博大软件股份有限公司"> ');//
		 document.write('<param name="ProductKey" value="DA0213A4558B3C505F4F31C7FD84819B1CE24D7A">');
		 document.write('<param name="TitlebarTextColor" value="0">   ');
		 document.write('<param name="MenubarColor" value="13160660">   ');
		 document.write('<param name="MenuButtonColor" VALUE="13160660">   ');
		 document.write('<param name="MenuBarStyle" value="3">   ');
		 document.write('<param name="MenuButtonStyle" value="7">   ');
		 document.write('<param name="WebUserName" value="NTKO">   ');
		 document.write('<param name="Caption" value="NTKO OFFICE文档控件示例演示 http://www.ntko.com">   ');
		 document.write('<SPAN STYLE="color:red">64位IE浏览器不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置sssss。</SPAN>   ');
		 document.write('</object>');
	}
	/*64位文档控件的产品功能上类似于以前的专业增强版，故不能像平台版文档控件一样支持跨浏览器、支持PDF、tif等文件的阅读等，并且由于目前64位EKEY选型未定，故不能与电子印章系统
	进行结合使用,并且由于64位软件（非特指文档控件，包含所有软件）的兼容性问题，如需使用64位文档控件，建议环境为纯64位环境即：64位windows系统+
	64位IE浏览器+64位完整版office;而一般情况下32位文档控件基本上是够用了的，当然如果需要使用64位控件也是可以的，但是需要注意此时需要同时购买32位控件
	以及64位控件*/
	else if (browser=="firefox"){ 
		//alert("sorry,ntko 文档控件64位暂不支持firefox!");	

	}else if(browser=="chrome"){
		//alert("sorry,ntko 文档控件64位暂不支持Chrome!");	
	}else if (Sys.opera){
		//alert("sorry,ntko web印章暂时不支持opera!");
	}else if (Sys.safari){
		 //alert("sorry,ntko web印章暂时不支持safari!");
	}
	
}
