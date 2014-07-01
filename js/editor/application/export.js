function exportConfig(){
	var config = {};
	config.name = document.querySelector('input[name=config-game-name]').value;
	config.author = document.querySelector('input[name=config-author-name]').value;
	config.version = document.querySelector('input[name=config-version]').value;
	config.maxplayers = parseInt(document.querySelector('input[name=config-max-player]').value);
	return JSON.stringify(config);
}

function exportServer(asObject){
	var ex = {};
	var groups = groupEditor.groups;
	for(var key in groups){
		var group = groups[key];
		if(group.joinable){
			//TODO: team-stuff
		}else{
			ex[key] = {};
			console.log("gen group "+key,group);
			if(lengthOf(group.members) == 0){
				console.log("addtemp");
				groupEditor.addMember(key, "template", {}); //todo : nur temporär
			}
			for(var memberName in group.members){
				var member = group.members[memberName];
				ex[key][memberName] = {};
				for(var attributeName in member){
					var attribute = member[attributeName];
					switch(attribute.type){
						case 'value':
							ex[key][memberName][attributeName] = attribute.value;
							break;
						case 'position':
							ex[key][memberName].longitude = parseFloat(attribute.longitude);
							ex[key][memberName].latitude = parseFloat(attribute.latitude);
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
		}

	}

	if(asObject){
		return ex;
	}
	return JSON.stringify(ex);

}

function isGameTeamGame(){
	for(var key in groups){
		if(group[key].joinable){
			return true;
		}
	}
	return false;
}

function lengthOf(obj){
	var i=0;
	for(var k in obj){
		i++;
	}
	return i;
}