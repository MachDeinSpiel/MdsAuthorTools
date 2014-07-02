function Exporter(){
	this.clientURL = null;
	this.serverURL = null;
	this.websocket = new WebSocket('ws://195.37.176.178:1387');

	var scope = this;
	this.websocket.onopen = function () {
	 	//scope.websocket.send('{"mode":"gametemplates"}');
	 	};
	this.websocket.onerror = function (error) {
		console.error('WebSocket Error ' + error);
	};
	this.websocket.onmessage = function (e) {
	 	console.log('Server: ' + e.data);
	};
}

Exporter.prototype.export = function(){
	var config = this.generateConfig();
	if(config == false){
		return;
	}
	var serverJSON = this.generateServer();
	var name = document.querySelector('input[name=config-game-name]').value;
	var url = "http://mds.informatik.hs-bremen.de:1380/authortools/upload.php?t="+(new Date()).getTime();
	var scope = this;
	$.post(url, 'gamename='+name+'&json='+serverJSON, function(serverURL){
		console.log(serverURL);
		showLogin(function(name, pw){
			console.log(name, pw);
			config.serverurl = serverURL;
			config.clienturl ="";
			config.author = name;
			console.log(config);
			var data = '{"mode":"config","username":'+name+', "password":'+pw+',"config":'+config+'}';
			console.log("data:",data);
			scope.websocket.send(data);
		});
	});
}

Exporter.prototype.generateConfig = function(serverURL, clientURL, asObj){
	var config = {};
	config.name = document.querySelector('input[name=config-game-name]').value;
	config.version = document.querySelector('input[name=config-version]').value;
	config.minplayers = parseInt(document.querySelector('input[name=config-min-player]').value);
	config.maxplayers = parseInt(document.querySelector('input[name=config-max-player]').value);
	for(var key in config){
		if(config[key] == undefined){
			$("li[data-panel='editor-game']").click(); 
			alert("Error: Please enter "+key+"!");
			return false;
		}
		if(config[key] == "" || (typeof config[key] ==="string" && config[key].replace(/\s+/g, '') == "")){
			$("li[data-panel='editor-game']").click(); 
			alert("Error: Please enter "+key+"!");
			return false;
		}
		
	}
	if(config.minplayers < 1){
		$("li[data-panel='editor-game']").click(); 
		alert("Error: min player can't be smaller then 1!");
		return false;
	}
	if(config.maxplayers < 1){
		$("li[data-panel='editor-game']").click(); 
		alert("Error: min player can't be smaller then 1!");
		return false;
	}
	config.teams = this.getNumberofTeams();
	config.isteamgame = (config.teams!=0);
	config.apptheme = "light";


	if(asObj){
		return config;
	}
	return JSON.stringify(config);
}

Exporter.prototype.generateServer = function(asObject){
	var ex = {};
	var groups = groupEditor.groups;
	for(var key in groups){
		var group = groups[key];
		if(group.joinable){
			if(ex['Teams'] == undefined){
				ex['Teams'] = {};
			}
			ex['Teams'][key] = {};
			console.log("Group:",group);
			var member = group.members['team-attributes'];
			for(var attributeName in member){
					var attribute = member[attributeName];
					switch(attribute.type){
						case 'value':
							ex['Teams'][key][attributeName] = (attribute.value != undefined) ? attribute.value : "null";
							break;
						case 'position':
							ex['Teams'][key][attributeName].longitude = parseFloat(attribute.longitude);
							ex['Teams'][key][attributeName].latitude = parseFloat(attribute.latitude);
							break;
						case 'group':
							ex['Teams'][key][attributeName] = {dummy: "dummy"}; //TODO: dummy?
							break;
					}
					
				}

		}else{
			ex[key] = {};
			console.log("gen group "+key,group);
			var createdTemp = false;
			if(this.lengthOf(group.members) == 0){
				console.log("addtemp");
				groupEditor.addMember(key, "template", {});
				createdTemp = true;
			}
			for(var memberName in group.members){
				var member = group.members[memberName];
				ex[key][memberName] = {};
				for(var attributeName in member){
					var attribute = member[attributeName];
					switch(attribute.type){
						case 'value':
							ex[key][memberName][attributeName] = (attribute.value != undefined) ? attribute.value : "null";
							break;
						case 'position':
							//Wenn attribut "position" heißt, speichere lon/lat direkt im member
							if(attributeName == 'position'){
								ex[key][memberName].longitude = parseFloat(attribute.longitude);
								ex[key][memberName].latitude = parseFloat(attribute.latitude);
							}else{
								ex[key][memberName][attributeName] = {};
								ex[key][memberName][attributeName].longitude = parseFloat(attribute.longitude);
								ex[key][memberName][attributeName].latitude = parseFloat(attribute.latitude);
							}
							break;
						case 'group':
							ex[key][memberName][attributeName] = {dummy: "dummy"}; //TODO: dummy?
							break;
					}
					
				}
				if(member.visibility == undefined){
					ex[key][memberName].visibility = "all";
				}
				if(ex[key][memberName].longitude == undefined){
					ex[key][memberName].longitude = "null";
				}
				if(ex[key][memberName].latitude == undefined){
					ex[key][memberName].latitude= "null";
				}
				ex[key][memberName].pathKey = memberName;
			}
			if(createdTemp){
				groupEditor.removeMember(key, "template");
			}
		}

	}

	if(asObject){
		return ex;
	}
	return JSON.stringify(ex);

}

Exporter.prototype.getNumberofTeams = function(){
	var i=0;
	for(var key in groupEditor.groups){
		if(groupEditor.groups[key].joinable){
			i++;
		}
	}
	return i;
}

Exporter.prototype.lengthOf = function(obj){
	var i=0;
	for(var k in obj){
		i++;
	}
	return i;
}


//function upload
//http://mds.informatik.hs-bremen.de:1380/authortools/upload.php