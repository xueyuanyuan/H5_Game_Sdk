gsPlatform = new (function () {

	
	initplatform();
	//输入框显示关闭///////////////////////////////////////////////////
	
	function showInputView(args) {
		var input = document.querySelector(GsArguments["IsMobile"] ? "#minput" : "#tinput");
		input.maxlength = args[3];
		if (GsArguments["IsMobile"]) {
			var s = Math.max(window.screen.height, window.screen.width) / 30;
			var space = document.querySelector("#mspace");
			space.style["visibility"] = "visible";
			input.style["font-size"] = s + "px";
			input.value = args[0];
			input.placeholder = args[1];
		} else {
			var y = (window.innerHeight - 88) / 2;
			var x = (window.innerWidth - 344) / 2;
			input.style["left"] = x + "px";
			input.style["top"] = y + "px";
			input.innerText = args[0];
		}
		input.style["visibility"] = "visible";
		input.focus();
		// var range = window.getSelection();
		// if (range) {
			// range.selectAllChildren(input);
			// range.collapseToEnd();
		// }
		if (args[2] === 0) {
			input.onkeydown = function (e) {
				if (e.key === "Enter") {
					hideInputView();
				}
				// console.log("input.onKeydown:",e.key);
			}
			input.onBlur = function(e){
				
				console.log("input.onBlur:",e.key);
				hideInputView();
			}
		}
		showView = true;
	}

	function hideInputView() {
		var input = document.querySelector(GsArguments["IsMobile"] ? "#minput" : "#tinput");
		if (input.style["visibility"] === "visible" && gad) {
			gsPlatform.setData("InputValue", GsArguments["IsMobile"] ? input.value : input.innerText);
			console.log(GsArguments["IsMobile"] ? input.value : input.innerText);
			input.style["visibility"] = "hidden";
			var space = document.querySelector("#mspace");
			space.style["visibility"] = "hidden";
			showView = false;
		}
	}

	function getMachineState(){
		
		
		gsPlatform.setData("ActionState", "2");
		gsPlatform.setData("ActionResult", ["0","0"]);
	
		// setTimeout(function(){
			
			// callbackTest(function(num){
			
			  // console.log("test callback args:" +num);
			// });
		// },3000);
		
	}
	
	function callbackTest(callback){
		
		console.log("enter callback");
		callback(10);
		console.log("exit callback");
	}
	
     //获取服务器列表信息
	function ServerList(args){
		
		//跟进客户端的请求值， 解析serverlist,传递回去服务器列表，服务器分页等信息
		// [appid , agent , channel , os , deviceId , releaseVersion , build , timestamp , server , area , urlKey]
		// (11) [0"14", 1"100", 2"2", 3"3", 4"", 5"0.0.9", 6"303", 7"1546047983", 8"9999", 9"8", 10"20150617"]
		console.log("request serverlist:" ,args);
		appid = parseInt(args[0]);
		agent = parseInt(args[1]);
	    channel = parseInt(args[2]);
		agent  = 203;
		channel = 2;
		os = parseInt(args[3]);
		var deviceid = "5CB835F5-4042-4190-8AFA-3099B7D47D2D";
		var version = args[5];
		var build = args[6];
		var server = args[8];
		var area = parseInt(args[9]);
		area = 3;
		var timestamp = parseInt(Date.now() / 1000, 10);
		var appkey = args[10];

		var verityStr = "" + appid + agent + channel + os + deviceid + version +
			build + server + area + timestamp + appkey;
		var token = ZUtility.md5(verityStr);

		var data = [
			appid
			, agent
			, channel
			, os
			, deviceid
			, version
			, build
			, server
			, area
			, timestamp
			, token];
		console.log('serverdata------------------------------',data);
		 caManager.sendMessage(new ZSocketMessage(2000, data));
		
		//gsPlatform.setData("ActionState", "2");
		//gsPlatform.setData("ActionResult", [""]);
		//console.log("全局变量");
		//console.log(openid);
		
	}
	

	function thirdSdkLogin(openid, token,ts,username){
		
		console.log("sendThirdLoginCmd:"+openid+" "+ token+" "+ ts +" "+ username);
        var appid =  25;
        var agent= 203;
        var channel= 2;
        var id = openid;
        var id_signed = token;
		console.log("id_signed:" +id_signed);
        var extra = "";
        var type = ""; //第三方支付渠道拼音简写 wechat  qq
        var deviceId= "5CB835F5-4042-4190-8AFA-3099B7D47D2D";
        var ts= parseInt(Date.now() / 1000, 10);
        var key = "$$!!!2018%";
		var md5Strr = 'appid='+appid+'&agent='+agent+'&channel='+channel+'&id='+id+'&idsign='+id_signed+'&extra='+extra+'&deviceid='+deviceId+'&type='+type+'&timestamp='+ts+key;
		console.log("md5Strr:",md5Strr);
        var token   = ZUtility.md5(md5Strr);
        var data = [
			appid,
			agent,
			channel,
			id,
			id_signed,
			extra,
			deviceId,
			type,
			ts,
			token
		];

		console.log("data",data);
		caManager.sendMessage(new ZSocketMessage(2011, data));
	}
	
	function requestServerlistPageSize(args){
		
		console.log("request page size:", args);
		// (12) ["14", "100", "2", "3", "", "0.0.9", "303", "1546050898", "0", "10", "8", "20150617"]0: "14"1: "100"2: "2"3: "3"4: ""5: "0.0.9"6: "303"7: "1546050898"8: "0"9: "10"10: "8"11: "20150617"length: 12__proto__: Array(0)
		// 0appid , 1agent , 2channel , 3os , 4deviceId , 5releaseVersion , 6build , 7timestamp , 8page , 9pagesize , 10area,	11Global["Appkey"]
		var appid = parseInt(args[0]);
		var agent = parseInt(args[1]);
		var channel = parseInt(args[2]);
		agent  = 203;
		channel = 2;
		var os = parseInt(args[3]);
		var deviceid = "5CB835F5-4042-4190-8AFA-3099B7D47D2D";
		var version = args[5];
		var build = args[6];
		var area = parseInt(args[10]);
		area = 3;
		var page = parseInt(args[8]);
		var pagesize = parseInt(args[9]);
		var timestamp = parseInt(Date.now() / 1000, 10);
		var appkey = args[11];

		var verityStr = "" + appid + agent + channel + os + deviceid + version +
			build + page + pagesize + area + timestamp + appkey;
		var token = ZUtility.md5(verityStr);

		var data = [
			appid
			, agent
			, channel
			, os
			, deviceid
			, version
			, build
			, page
			, pagesize
			, area
			, timestamp
			, token];
		console.log("requestServerlistPageSize:",data);
		caManager.sendMessage(new ZSocketMessage(2001, data));

	}
	

	function GetServerPageListData(args){
		
		 var servers = serverPagelistInfo.Content.msg.servers.server;
		if(servers != null){
			var arr = serverObjToArr(servers);
			gsPlatform.setData("ActionState", "2");
			gsPlatform.setData("ActionResult", arr);
			console.log("PageListData", arr);
		}else{
			gsPlatform.setData("ActionState", "3");
		}
	
	}
	
	function GetServerListData(args){
		

		var type = args[0];
		switch(type){
			
			case "model": 			
				
				var data = serverlistInfo.Content.msg.model.value;
				return [data];
				break;
			case "notices": 		
			
					var notice 			= serverlistInfo.Content.msg.notice.value;
					var platformnotice 	= serverlistInfo.Content.msg.platformnotice.value ;
					var othernotice 	= serverlistInfo.Content.msg.othernotice.value ;
					var areanotice 		= serverlistInfo.Content.msg.areanotice.value;
					return [notice, platformnotice,othernotice,areanotice];
			case "servercount":		
					return [serverlistInfo.Content.msg.servercount.value];
			case "servers":			
					var servers = serverlistInfo.Content.msg.servers.server; 
					console.log("servers",servers);
					var serversArr = serverObjToArr(servers);
					return serversArr;
			case "locals": 			
				var locals = serverlistInfo.Content.msg.locals.local; 
				if(locals ==undefined || locals == null){
					return [];
				}
				var serversArr = serverObjToArr(locals);
				return serversArr;
			case "gameversion":		
					return serverlistInfo.Content.msg.gameversion.value;
			case "logs": 
					var logs = serverlistInfo.Content.msg.logs.log;
					console.log("logs",logs);
				   return logs;
			case "areas":
				  // return [serverlistInfo.Content.msg.areas.zone.value];
				 return serverObjToArr(serverlistInfo.Content.msg.areas.zone);
			case "gmnotices":
					var gmnotices = serverlistInfo.Content.msg.gmnotices.gmnotice; 
					if(gmnotices ==undefined || gmnotices == null){
						return [];
					}
					var gmnoticesArr = gmNoticeObjToArr(gmnotices);
					for(var i = 0;i < gmnoticesArr.length;i++){
						
						gmnoticesArr[i] = ZUtility.base64decode(gmnoticesArr[i]);
						
					}
					return gmnoticesArr;
			default:
				return [];
		}
		
	}
	
	function gmNoticeObjToArr(obj){
		
		
		if(obj == undefined || obj == null){
			return [];
		}
		 var sType = Object.getPrototypeOf(obj);
		if(sType === Object.prototype) {
			return [obj.value];
		} else if(sType ===  Array.prototype) {
			
			var serversArr = new Array(obj.length);
			for(var i =0 ; i < obj.length;i++){
				serversArr[i] = obj[i].value;
			}
			return serversArr;
		}else{
			
			return [];
		}
	}
	
	function serverObjToArr(obj){
		
		
		if(obj == undefined || obj == null){
			return [];
		}
		 var sType = Object.getPrototypeOf(obj);
		if(sType === Object.prototype) {
			return [obj.value];
		} else if(sType ===  Array.prototype) {
			
			var serversArr = new Array(obj.length);
			for(var i =0 ; i < obj.length;i++){
				serversArr[i] = obj[i].value;
			}
			return serversArr;
		}else{
			
			return [];
		}
	}
	
	// function GetServerListData(args){

		// var type = args[0];
		// switch(type){
			
			// case "model": 			return parseServerlist_simple(xmlDoc,type);break;
			// case "notices": 		return parseServerNotices(xmlDoc);break;
			// case "servercount":		return parseServerlist_simple(xmlDoc,type); break;
			// case "servers":			
			
			// return parseServerlist_multi(xmlDoc,"servers","server");break;
			// case "locals": 			return parseServerlist_multi(xmlDoc,"locals","server");break;
			// case "gameversion":		return parseServerlist_simple(xmlDoc,type);break;
			// case "logs": 			return parseServerlist_simple(xmlDoc,type);break;
			// default:
				// return [];
		// }
		
	// }
	
	function parseServerlist_simple(doc , key){
		
		var tempElement = doc.getElementsByTagName(key);
		console.log("tempElement：",tempElement);
		if(tempElement == null){
			return "";
		}
		console.log("tempElement[0]：",tempElement[0]);
		console.log("tempElement[0].firstChild：",tempElement[0].firstChild);
		if(tempElement[0].firstChild ==null){
			return "";
		}
		var value =  tempElement[0].firstChild.nodeValue;
		console.log("key:",key, "  value:", value);
		return value;
		
	}
	function parseServerlist_multi(doc,key,childKey){
		
		
		 // serverlistInfo = gameinfo(doc);
		 // serverlistInfo.content.msg.
		
		var tempElements = doc.getElementsByTagName(key);
		var arr = new Array(tempElements.length);
		console.log("parseServerlist_multi :",key,":"+ childKey);
		console.log("length:" ,tempElements.length);
		console.log("tempElements:" ,tempElements);
		for(var i = 0; i < tempElements.length; i++){
			
			var childElement = tempElements[0].getElementsByTagName(childKey)[0];
			console.log("childElement",childElement);
			console.log("childElement",childElement.childNodes[0]);
			if( childElement != null && childElement.childNodes[0] != null){
				arr[i] = childElement.childNodes[0].nodeValue;
			}else{
				arr[i] = "";
			}
		}
		return arr[i];
	}
	
	function parseServerNotices(doc){
		// [notice],[platformnotice],[othernotice],[areanotice]
		var notice 			= parseServerlist_simple(doc,"notice");
		var platformnotice 	= parseServerlist_simple(doc,"platformnotice");
		var othernotice 	= parseServerlist_simple(doc,"othernotice");
		var areanotice 		= parseServerlist_simple(doc,"areanotice");
		return [notice, platformnotice, othernotice, areanotice];
	}
	
	//充值界面///////////////////////////////////////////////////


	//添加图标///////////////////////////////////////////////////

	function h5_addShortcut(){
		
	}
	
	function showToast(msg, mode){
		console.log("showToast");
	}

	//好友分享///////////////////////////////////////////////////

	var shareTitle = "尘缘";
	var shareDesc = "我在玩无须下载的3D仙侠游戏大作!保证你没见过!";
	function h5_share(args){
		  
		 // [roleid, rolename, teamLevel, serverid, servername, club, gameName, xianyu, username, vip,createTime]
		var jiaosepk = enterGameData[0];
		console.log("h5_share:" + jiaosepk);
		// HuoSdk.uprole({
		// 	'role-event': 5,
		// 	'role-server_id':  enterGameData[3],
	  	//  	'role-server_name': enterGameData[4],
	  	// 	'role-role_id': jiaosepk,
	 	//  	'role-role_name':  enterGameData[1],
	 	// 	'role-role_level': parseInt( enterGameData[2]),
		// 	'role-role_vip': parseInt( enterGameData[9]),
	  	// 	'role-onlineTime': 0,
		// 	'role-scene': '',
	   	// 	'role-axis': '',



    });
		 // window.H5API.shareGame(jiaosepk);
	}
	
	function registerCmd(){
		

		
	}
	
	////////////////////////CA消息//////////////////////////////
	
	var isConnected = false;
	var isConnecting = false;
	var tryCount = 0;
	function connectCA(ip, port){
				
		    try {
					if(caManager){
						caManager.stop();
					}
					caManager = new ZCAManager();
					
					caManager.registerSocketCloseHandler(function (data) {
						console.log("socket had closed:", data);
						isConnected = false;
						isConnecting = false;
						//重连
						tryCount+=1;
						if(tryCount <= 2){
							console.log("close reConnect tryCount:",tryCount);
							setTimeout(reConnect,1000);	
						}else{
							needRepeatActon = false;
						   gsPlatform.setData("ActionState", "9");
						}
	
					});

					caManager.registerSocketErrorHandler(function (err) {
						console.log("socket had occured an error:", err);
					});

					caManager.registerSocketOpenHandler(function (data) {
						// 发送3号消息
						tryCount = 0;
						isConnected = true;
						isConnecting = false;
						caManager.sendMessage(new ZSocketMessage(3, ["three message"]));
					});

					caManager.registerHandlers([
						// 3 号消息处理器
						cmd3,
						// 1100 号消息处理器
						cmd1100,
						cmd2000,
						cmd2001,
						cmd2011,
						cmd3000,
						cmd3001,
					]);
			
					// if(isTest){
						// console.log("socket connect:","ws://" +ip+":"+port);
						// caManager.start("ws://" +ip+":"+port, 20000, 8000);	
					// }else{
						// console.log("socket connect:","wss://ca.h5.npcjoy.com:8000");
						// caManager.start("wss://ca.h5.npcjoy.com:8000", 20000, 8000);
					// }
					console.log("socket connect:","wss://ca.h5.npcjoy.com:8000");
					caManager.start("wss://ca.h5.npcjoy.com:8000", 20000, 8000);
				
					// caManager.stop();
					// ZCAManager.Destroy();
					return true;
			} catch (err) {
				console.log(err.message);
			}
	}
	
	var caManager;
	function reConnect(){
		
		if(isConnecting || isConnected){
			
			console.log("reConnect break, isConnecting:",isConnecting, "isConnected:",isConnected);
			return;
		}
		if(!isNull(caManager)){
			var state = caManager.getState();
			console.log("reconnect state:", state," isConnected:",isConnected);
			if(state == 1){
				isConnected = true;
				return;
			}
		}
		isConnecting = true;
		connectCA(ip,port);
	}
	
	var  cmd3 = new ZCABizHandler(3, function (data) {
							console.log(data);
							// 发送1100号消息
							var appid = 25;
							var agent = 203;
							var channel = 2;
							var version = 1;
							
							var attach = "{\"dev\":\"3e6efb14397d4c1a9a500a4bec81378f\",\"packge_name\":\"com.npc.cyol\", \"app_version\":\"1.0.0\"}";
							var timestamp = parseInt(Date.now() / 1000, 10);
							var encryptKey = data.message[0];
							var verityStr = "appid=" + appid  + "&agent=" + agent + "&channel=" + channel + "&version=" + version + "&attach=" + attach + "&timestamp="+ timestamp + encryptKey; 
							var token = ZUtility.md5(verityStr);                
							var data = [appid, agent, channel, version, attach, timestamp, token]; 
							caManager.sendMessage(new ZSocketMessage(1100, data));
						});
	
	
	
	var model = null;
	var releaseVersion = null;
	
	var cmd1100 = new ZCABizHandler(1100, function (data) {

						console.log("1100:",data);
						var ret 	= data.ret;
						var type 	= data.type;
						var mode 	= data.mode;
						var config 	= data.config;
						switch (mode){
							case "release":
								model = mode;
								releaseVersion = "0.0.9";
								break;
							case "review":
								model = mode;
								releaseVersion = "1.0.0";
								break;
							case "debug":
								model = mode;
								releaseVersion = "1.0.9";
								break;
							}

						//socket链接初始化成功

							if(needRepeatActon){
								setTimeout(repeatDoActon,100);	
								return;
							}
							initializeSocketSuccess();
							
						});
	function initializeSocketSuccess(){
		
		if(isTest){
			
			gsPlatform.setData("ActionResult", ["1"]);
			gsPlatform.setData("ActionState", "6");
		}else{
			platform = 1;
			var app = "damenglongtu";
			gsPlatform.setData("ActionResult", [platform +"", app]);
			gsPlatform.setData("ActionState", "6");
		}
	}
	
	var cmd2000  = new ZCABizHandler(2000, function (data) {
							console.log("msg 2000:",data);
							// 发送1200号消息
							var message = data.message;
							var state = message[0];
							console.log("msg 2000 state:",state);
							if(state == 200){
									console.log("msg 2000:1");
								var xmlStr = message[1];
								console.log("msg 2000 xmlStr:",xmlStr);
								xmlDoc = loadXML(xmlStr);
		
								//TODO  
								if(xmlDoc == null){
									//xmlDoc解析失败
									console.log("msg 2000 xmlStr == null");
									gsPlatform.setData("ActionState", "3");
								}else{
									serverlistInfo = ZUtility.xml2json(xmlDoc);
									console.log("serverlistInfo:",serverlistInfo);
									if(serverlistInfo == null ||serverlistInfo == undefined){
										gsPlatform.setData("ActionState", "3"); 
									    console.log("serverlistInfo == null ||serverlistInfo == undefined");
										return;
									}
									if(!isNull(serverlistInfo.Content)&& !isNull(serverlistInfo.Content.ret)&& serverlistInfo.Content.ret.value == "200"){
										gsPlatform.setData("ActionState", "2");
									    console.log("serverlistInfo.Content.ret == 200");
									}else{
										gsPlatform.setData("ActionState", "3");
										console.log("serverlistInfo.Content.ret != 200");
									}
									
								}
			
							}else{
								//服务器列表方式失败
								//TODO 
								
								
							}

						});
	var cmd2001  = new ZCABizHandler(2001, function (data) {
						console.log("msg 2001:",data);
						// 发送2001号消息
						var message = data.message;
						var state = message[0];
						console.log("msg 2000 state:",state);
						if(state == 200){
								console.log("msg 2000:1");
							var xmlStr = message[1];
							console.log("msg 2000 xmlStr:",xmlStr);
							pageSizeXmlDoc = loadXML(xmlStr);
							if(pageSizeXmlDoc == null){
								//TODO xml 解析失败
								gsPlatform.setData("ActionState", "3");
							}else{
									try{
										serverPagelistInfo = ZUtility.xml2json(pageSizeXmlDoc);
									} catch (err) {
										console.log(err.message);
									}
								if(!isNull(serverPagelistInfo)){
									gsPlatform.setData("ActionState", "2");
								}else{
									gsPlatform.setData("ActionState", "3");
								}
							
							}
						}else{
							//TODO  获取分页列表失败
							gsPlatform.setData("ActionState", "3");
						}

					});
	
	var cmd2011  = new ZCABizHandler(2011, function (data) {
					console.log("msg 2011:"+JSON.stringify(data));
					console.log(JSON.stringify(data));
					// 解析2011号消息
					var message = data.message;
					var state = message[0];
					console.log("msg 2011 state:",state);
					if(state == 200){
						console.log("msg 2011:1");
						try{
							var content = message[1];
							var jsonObj = JSON.parse(content);
							console.log("jsonObj",jsonObj);
							var token = jsonObj.tokens[0];
							console.log("token",token);
							var tokenArr = jsonMapToArr(token);
							if(tokenArr == null){
								sdklogout();
								gsPlatform.setData("ActionState", "3");
								return;
							}
							gsPlatform.setData("ActionResult", tokenArr);
							gsPlatform.setData("ActionState", "2");
						}catch(err){
							console.log(err.message);	
							sdklogout();
							gsPlatform.setData("ActionState", "3");
							return;
						}
				
					}else{
						//TODO  获取分页列表失败
						sdklogout();
						gsPlatform.setData("ActionState", "3");
					}

				});

	var cmd3000  = new ZCABizHandler(3000, function (data) {
					console.log("msg 3000:",data);
					// 解析3000号消息
					var message = data.message;
					var state = message[0];
					var content = message[1];
					console.log("msg 2000 state:",state, " content:",content);
					if(state == 200){
							
						gsPlatform.setData("ActionResult", [content]);
						gsPlatform.setData("ActionState", "2");
							
					}else{
						//TODO  获取分页列表失败
						gsPlatform.setData("ActionState", "3");
					}

				});			
				
	var cmd3001  = new ZCABizHandler(3001, function (data) {
					console.log("msg 3001:",data);
					// 解析3001号消息
					var message = data.message;
					var state = message[0];
					var content = message[1];
					console.log("msg 3001 state:",state, content);
					if(state == 200){
						console.log("state == 200");
						
						if(content == "0"){
							console.log("扣款成功");
						}else if(content == "253"){
							console.log("余额不足");
						}else{
							console.log("其他错误");
						}
						gsPlatform.setData("ActionResult", [content]);
						gsPlatform.setData("ActionState", "2");
						
					}else{
						console.log("state != 200");
						//TODO  获取分页列表失败
						console.log("其他错误");
						gsPlatform.setData("ActionState", "3");
					}
				});
				
	//////////////////////////////////////////////////////
	
	
	function sdklogout(){
		console.log("sdklogout");

        // thirdSdkLogin(this["mem_id"] +"", this["user_token"]);

		HuoSdk.logout()
		//window.H5API.logout();
	}
	
	function isNull(obj){
		
		if(obj == undefined || obj == null){
			
			return true;
		}
		return false;
	}
	function jsonMapToArr(jsonObj){
	
		var arr = new Array();
		try{
			for(var key in jsonObj){
				var value = jsonObj[key];
				console.log("key:",key,"value:",value+"");
				arr.push(key,value+"");
			}
			console.log("arr：",arr);
			return arr;
		}catch(err){
			console.log(err.message);
		}
		return arr;
	}
	
	function h5_desktop(args){
		
	}
	
	//初始化socket
	function InitializeSocket(args){
		
		console.log("InitializeSocket 1");
		ip = args[0];
		port = args[1];
		needRepeatActon = false;
		if(!isNull(caManager)){
			 var state = caManager.getState();
			 if(state == 1){
				 isConnected = true;
				 initializeSocketSuccess();
			 }else{
				 isConnected = false;
			 }
			console.log("reconnect state:", state," isConnected:",isConnected);
		}
		reConnect();
	}
	
	//游戏初始化
	function Initialize(args){
		console.log('-----------------------------------init');

        HuoSdk.init({
	  		app_id: '81234594'
   	 });

	// gsPlatform.setData("ActionState","1");
	}
	
	
	//登录
	function login(args){
			// HuoSdk.login();
			// openid = this["userId"];
			// openkey = this["sign"];
			// ts = this["time"];
			// username = this["userName"];
       		 thirdSdkLogin(this["mem_id"] +"", this["user_token"]);
			// thirdSdkLogin(openid, openkey,ts,username);
			// gsPlatform.setData("ActionState", "1");
		
	}
		
	//生成我们自己的订单号
	function GeneratePreOrder(args){
		
		// [0appid, 1model, 2agent, 3channel, 4uid, 5serverid, 6roleid, 7product, 8money, 9extension, 10title, 11content]
		// ["14", "release", "100", "2", "97991596376588301", "9999", "9999000002", "0", "6", "", "一档", ""]
			console.log("sendPreOrderCmd:",args);

			var appid = parseInt(args[0]);
			var model = args[1];
			var agent= parseInt(args[2]);
			var channel= parseInt(args[3]);
			agent  = 203;
			channel = 2;
			var uid = args[4];
			var serverid = parseInt(args[5]);
			var roleid = args[6];
			var product=parseInt(args[7]);
			var money=parseInt(args[8]) * 100;
			var extension= args[9];
			var title= args[10];
			var content= args[11];
			var ts= parseInt(Date.now() / 1000);;
			var key = "$$2018!!!%";
			var md5Str = 'appid='+appid+'&model='+model+'&agent='+agent+'&channel='+channel+'&uid='+uid+'&serverid='+serverid+'&rolepk='+roleid+'&productid='+product+'&money='+money+'&extension='+extension+'&title='+title+'&content='+content+'&timestamp='+ts+key;
			var token   = ZUtility.md5(md5Str);

			var data = [
				appid,
				model,
				agent,
				channel,
				uid,
				serverid,
				roleid,
				product,
				money,
				extension,
				title,
				content,
				ts,
				token
			];
			caManager.sendMessage(new ZSocketMessage(3000, data));
        	console.log("sendPreOrderCmd----data:",data);
		}



















	
	function reSendThirdPayOrder(){
		
		//支付成功， 重新开始扣款流程
		sendThirdOrderCmd(thirdOrderParams);
	}
	//生成第三方底单， 余额判断和扣款
	function sendThirdOrderCmd(args){
		
		gsPlatform.setData("ActionResult", ["0"]);
		gsPlatform.setData("ActionState", "2");
		
		return;

		
		// 		"amount":money,    //商品金额
			// "applicationID":"100702907",    //应用ID，在华为开发者联盟上获取的APP ID
			 // "productDesc":"游戏道具",    //商品描述，该字段中不能包含特殊字符，包括# " & / ? $ ^ *:) \ < > , | % + 
			// "productName":"游戏道具",    //商品名称，该字段中不能包含特殊字符，包括# " & / ? $ ^ *:) \ < > , | % + 
			// "requestId":preOrder,    //在支付前生成，用于唯一标识一次支付请求。支付平台在服务器回调接口中会原样返回requestId的值。该字段由字母和数字组成，必须在商户内唯一，用于唯一标识一个商户订单。 
			// "serviceCatalog":"X6",    //游戏设置为"X6" 
			// "merchantId":"890086000102247977",    //华为开发者联盟上申请支付服务获取的“支付ID”
			// "merchantName":"金萪哲信（深圳）科技有限公司",    //商户名称，开发者注册的公司名
			// "sign":orderSign,    //签名，签名算法务必使用sha256算法。签名方式请参见“orderinfo参数说明”
			// "urlver":"2",    //固定值为2
			// "sdkChannel":3,    //游戏设置为3  
		
		//拼接华为需要签名的订单信息字符串
		//
		var preOrder = args[4];
		var amount = parseInt(args[5]) + ".00";
		//var signStr = "amount="+amount+"&applicationID=100702907&productDesc=游戏道具&productName=游戏道具&requestId="+preOrder+"&merchantId=890086000102247977&sdkChannel=3";
		
		
		// 0appid, 1model, 2agent, 3channel, 4order, 5money, 6uid, 7itemId
		// ["14", "release", "100", "2", "c9b1c7e3f02af6a82b36ca2ba0dc00ec", "6", "97991596376588301", "100"]
		thirdOrderParams = args;
		console.log(" :", args);
		var itemId = matchPayItem(args[5]); // args[7]
		var extJson = {"requestId":preOrder,"productDesc":"游戏道具","productName":"游戏道具","amount":amount,"sdkChannel":"2","urlver":"2"};
		var extJsonStr = JSON.stringify(extJson)
        //var extra = window.btoa(extJsonStr);
		//var extra = ZUtility.base64encode(extJsonStr);
        var extra = extJsonStr;
		var appid = parseInt(args[0]);
        var model = args[1];
        var agent= parseInt(args[2]);
        var channel= parseInt(args[3]);
		agent = 203;
		channel = 2;
        var order = args[4];
        var money= parseInt(args[5]) * 100;
        var type = agent;
        var ts= parseInt(Date.now() / 1000, 10);
        var key = "$$2018!!!%";
		var md5Str = 'appid='+appid+'&model='+model+'&agent='+agent+'&channel='+channel+'&orderid='+order+'&money='+money+'&extra='+extra+'&paytype='+type+'&timestamp='+ts+key;
        var token   = ZUtility.md5(md5Str);
		var data = [
			appid,
			model,
			agent,
			channel,
			order,
			money,
			extra,
			type,
			ts,
			token
		];
		console.log("thirdOrder params:",data);
		caManager.sendMessage(new ZSocketMessage(3001, data));
	}
	
	function matchPayItem(money){
		
		// 19980	19980仙玉	43844
		// 6980	6980仙玉	43843
		// 4880	4880仙玉	43842
		// 2980	2980仙玉	43841
		// 1980	1980仙玉	43840
		// 980		980仙玉		43839
		// 300		300仙玉		43838
		// 60		60仙玉		43837
		// 10		游戏道具	43713
		if(platform == 1){ //android
			
			switch(money){
			
				case "1": return "43713";
				case "6": return "43837";
				case "30": return "43838";
				case "98": return "43839";
				case "198": return "43840";
				case "298": return "43841";
				case "488": return "43842";
				case "698": return "43843";
				case "1998": return "43844";
				case "2998": return "43845";
			}
		}else if(platform == 2){ //IOS
			
				switch(money){
			
				case "1": return "44349";
				case "6": return "44347";
				case "30": return "44348";
				case "98": return "44350";
				case "198": return "44351";
				case "298": return "44352";
				case "488": return "44353";
				case "698": return "44354";
				case "1998": return "44355";
				case "2998": return "44356";
			}
		}
		

		return "0";
	}
	
	// 支付
	function pay(args){
		// [0appid, 1version, 2model, 3serverid, 4roleid, 5roleName, 6title, 7productid, 8agent, 9channel, 10os, 11money, 12basePrice, 13num,14key, 15preOrder, 16extra, 17order, payConfig]
		//"25,0.0.9,release,1035,1035000872,妙帆,一档,0,100,2,3,1,1,1,20150617,d8aa66cf0bde79eaca0cddb572b547c9,,253,1",
		console.log("pay popPayTips" + args);
		var  money =  parseInt(args[11]);
		var model = args[2];
		var serverid = parseInt(args[3]);
		var agent = "203";
		var channel = "2";
		//var money = args[11]+".00";//Number() * 100;
		var preOrder = args[15];
		var ext = preOrder+"_"+model  + "_" +agent +"_" +channel;
		console.log("ext:"+ext);
		console.log("serverid:"+serverid +" money:" +money);
		/**
		 * @param {Int} money 充值金额（人民币：元） 只能为整数
		 * @param {String} mark 游戏的充值订单编号 最多64位
		 * @param {String} server 服务器编号 不能为空或者0
		 * @param {String} extra 透传参数，用于充值成功后的服务端回调地址
		 */

		//sdk支付
		HuoSdk.pay({

		'order-currency': 'CNY',
	    'order-cp_order_id': preOrder,
	    'order-product_price': parseFloat(money),
	    'order-product_id': args[7],
	    'order-product_name': '购买游戏道具',
	    'order-product_desc': args[6],
	    'order-ext': ext,
	    'role-event': 5,
	    'role-server_id': serverid,
	    'role-server_name': '',
	    'role-role_id': parseInt(args[4]),
	    'role-role_name': args[5],
	    'role-role_level': 0,
	    'role-role_vip': 0


    });


	}
	
	//数据上报
	
	function reportRegister(){
		
		console.log("reportRegister");
		if(!isTest){
			// window.reportRegister();
		}

	}
	
	function reportLogin(){
		console.log("reportLogin");
	
	}
	
	////////////////////////////////////////////////////////////

	var needRepeatActon = false;
	function checkCAState(repeat){
		var state = caManager.getState();
		console.log("checkCAState:",state);
		if(state != 1){//链接未建立， 需要重置各种状态和开始重连操作， 重连完成后， 需要调用doAction
			needRepeatActon = repeat;
			reConnect();
			return false;
		}
		return true;
	}
	
	var doActionType;
	var doactionArgs;
	function repeatDoActon(){
		
		if(needRepeatActon){
			needRepeatActon = false;
			console.log("repeatDoActon...");
			gsPlatform.doAction(doActionType,doactionArgs);	
		}
	}
	
	function h5DataTracking(args){
		
		Gsh5DataTracking(args[0],args[1]);
	}
	
	var inputViewTime;
	/**
	 * 由游戏发起的请求或反馈
	 */
	this.doAction = function doAction(type, args) {
		console.log("====================doAction===============================");
		console.log(type);
		console.log(args);
		doActionType = type;
		doactionArgs = args;
		switch (type) {         
			case "ShowInputView":
				inputViewTime = Date.parse(new Date());
				showInputView(args);
				break;
			case "HideInputView":
				hideInputView();
				break;
			case "MachineState":
				getMachineState();
				break;
			case "ServerList":
				 if(checkCAState(true))ServerList(args);
				break;
			case "GetServerList":
				var data = GetServerListData(args);
				console.log(args[0],data);
				if(data == null){
					gsPlatform.setData("ActionState", "3");
				}else{
					gsPlatform.setData("ActionState", "2");
					gsPlatform.setData("ActionResult", data);					
				}
				break;
			case "ServerPageList":
				if(checkCAState(true))requestServerlistPageSize(args);
				break;
			case "GetServerPageList":
				GetServerPageListData(args);
				break;
			case "InitializeSocket":
				InitializeSocket(args);
				break;
			case "Initialize":
				Initialize(args);
				break;
			case "Login":
				if(checkCAState(true))login(args);
				break;
			case "GeneratePreOrder":
				if(checkCAState(true))GeneratePreOrder(args);
				break;
			case "GenerateThirdOrder":
				if(checkCAState(true))sendThirdOrderCmd(args);
				break;
			case "Pay":
				pay(args);
				break;
			case "reportRegister":
				reportRegister();
				break;
			case "reportLogin": 
				reportLogin();
				break;
			case "h5_share":
				h5_share(args);
				//addShareListener();
				break;
			case "h5_addShortcut":
				h5_addShortcut(args);
				break;
			case "h5DataTracking":
				h5DataTracking(args);
				break;
			case "h5_get_openid":
				h5_get_openid(args);
				break;
			case "refreshAppToken":
				refreshAppToken(args);	
				break;
			case "openUrl":
				 openUrl(args);
				break;
			case "h5_get_orientation":
				h5_get_orientation(args);
				break;
			case "QZoneBtnStatus":
				gsPlatform.setData("ActionResult", ["false","false","false","damenglongtu"]);
				gsPlatform.setData("ActionState", "2");
				break;
			case "Logout":
				sdklogout();
				gsPlatform.setData("ActionState", "2");
				break;
			case "submitGameInfo":
				// [roleid, rolename, teamLevel, serverid, servername, club, gameName, xianyu, username, vip,createTime]
				enterGameData = args;
				break;
			default:
				gsPlatform.setData("ActionState", "3");
				break;
			
		}
	}
	
	
	
	
	

	/**
	 * 由平台发起的请求或反馈
	 */
	this.setData = function setData(type, args) {
		gad.setActionData(type, args);
	}

	/**
	 * 关闭所有窗口
	 */
	this.hideView = function hideView() {
		
		var timestamp = Date.parse(new Date());
		if(timestamp - inputViewTime < 2000){
			return;
		}
		hideInputView();
	}
	
	loadXML = function(xmlString){
        var xmlDoc=null;
        //判断浏览器的类型
        //支持IE浏览器 
        if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                }catch(e){
                }
            }
        }
        //支持Mozilla浏览器
        else if(window.DOMParser && document.implementation && document.implementation.createDocument){
            try{
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                domParser = new  DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            }catch(e){
            }
        }
        else{
            return null;
        }

        return xmlDoc;
    }
	
	
	function initplatform(){
		
		//https://origin.src.cyh5.npcboy.com/202/?account=ceshi%404399&gameId=100058163&nick=%E6%B6%82%E6%A2%A6%E6%8D%A2%E5%95%8A%E5%95%8A&userId=2362303732&userName=%E6%B6%82%E6%A2%A6%E6%8D%A2%E5%95%8A%E5%95%8A&time=1555314193&sign=19eb97948106d9409284aadf1536c42d&pc=0&addiction=0
		console.log("location.href");
		console.log(location.href);
		UrlSearch();
	}	
	
	
	function UrlSearch() {
	   var name,value;
	   var str=location.href; //取得整个地址栏
	   var num=str.indexOf("?")
	   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

	   var arr=str.split("&"); //各个参数放到数组里
		var arrayObj = new Array();
	   for(var i=0;i < arr.length;i++){
			num=arr[i].indexOf("=");
			if(num>0){
				 name=arr[i].substring(0,num);
				 value=arr[i].substr(num+1);
				 this[name]=value;
				 console.log(name+"=" + this[name]);
				 arrayObj.push(this[name])
			}
	   }
        // thirdSdkLogin(arrayObj[1] +"", arrayObj[2]);
        console.log('arrr ---------------',this["user_token"])
	}
	
	function sendHttpMsg(url){
		
		var xhr = new XMLHttpRequest();
		 xhr.timeout = 3000;
		 xhr.ontimeout = function (event) {
		      gsPlatform.setData("ActionState", "3");
		}
		 xhr.open('GET', url);
		 xhr.send();
		 xhr.onreadystatechange =function(){
			if (xhr.readyState == 4 && xhr.status == 200) {
               var responseText = xhr.responseText;
			   console.log("gamebar msg:",responseText);
			   gsPlatform.setData("ActionState", "2");
			}
		 }
	}
	
	function h5_get_openid(){
		
		gsPlatform.setData("ActionState", "2");
		gsPlatform.setData("ActionResult", this["mem_id"]);
	}
	function refreshAppToken(args){
		

		
	}

	function h5_get_orientation(){
	
		if (window.orientation == 0 || window.orientation == 180){

			gsPlatform.setData("ActionState", "2");
			gsPlatform.setData("ActionResult", ["vertical"]);			
		}
		else if (window.orientation == 90 || window.orientation == -90){

			gsPlatform.setData("ActionState", "2");
			gsPlatform.setData("ActionResult", ["landscape"]);	
		}

	}
	
	function openUrl(args){
		

	}
	
	var urlencode = function(str){
    var res = encodeURIComponent(str);
    //0~9 a~z A~Z -_.
    res = res.replace(/[^0-9a-zA-Z\-_\.%]/g, function ($0) {
        //不用考虑一位数了
        return '%' + $0.charCodeAt(0).toString(16).toUpperCase();
    });

    return res;
	};

	//sdk回调函数
	HuoSdk.callback = {
		init:function (res) {
            console.log('long---------------------------',res);
			if (res.status == 2){

				gsPlatform.setData("ActionState", "2");
			}

        },
		login:function (res){
		console.log('long---------------------------',res);
		if (res.status == 2){

            gsPlatform.setData("ActionState", "2");
		}
		else {
			console.log('登陆失败',res);
            gsPlatform.setData("ActionState", "3");
		}
        },pay:function (res) {
		if (res.status == 2) {

			console.log("支付成功");
			gsPlatform.setData("ActionState","2");
		}else {
            gsPlatform.setData("ActionState", "3");
			console.log("支付失败");
		}
        },
        uprole:function (res) {

			if (res.status == 2){
                gsPlatform.setData("ActionState", "2");
				console.log("分享成功");
			} else {
                gsPlatform.setData("ActionState", "3");
				console.log("分享失败");
			}
        },logout:function (res) {
			if (res.status == 2){
                HuoSdk.login();
                gsPlatform.setData("ActionState", "2");
				console.log("登出成功");
			} else {
                gsPlatform.setData("ActionState", "3");
				console.log("登出失败");
			}

        }


    }

	// HuoSdk.init = function(res){
	// console.log('------------------------initsucces',res);
     //    // HuoSdk.login();
     //    gsPlatform.setData("ActionState", "2");
    //
    //
	// }
	// HuoSdk.callback()
    // HuoSdk.login = function (res) {
        // openid = this["userId"];
        // openkey = this["sign"];
        // ts = this["time"];
        // username = this["userName"];
        // thirdSdkLogin(openid, openkey,ts,username);
        // gsPlatform.setData("ActionState", "1");
    // }
    // HuoSdk.pay = function (res) {
    // if (res[2] == 0){
		// console.log("支付成功");
		// ggsPlatform.setData("ActionState", "2");
    // }else {
    //
		// console.log("支付失败");
    //     gsPlatform.setData("ActionState",String.valueOf( res[0]));
    // }
    // }
    // HuoSdk.uprole = function (res) {
    //     if (res[0] == 2){
    //         console.log("上传成功");
    //         gsPlatform.setData("ActionState", "2");
    //     }else {
    //
    //         console.log("上传失败");
    //         gsPlatform.setData("ActionState",String.valueOf( res[0]));
    //     }
    //
    // }
    // HuoSdk.logout = function (res) {
        // if (res[0] == 2){
        //     console.log("退出成功");
        //     gsPlatform.setData("ActionState","2");
    //     }else {
    //
    //         console.log("退出失败");
    //         gsPlatform.setData("ActionState",String.valueOf( res[0]));
    //     }
    // }


    })();