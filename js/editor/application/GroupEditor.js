function GroupEditor(){
	this.groupList = $('#groups-list');
	this.memberList = $('#group-member-overview');
	this.attributeList = $('#group-attribute-overview');
	this.groups = {};
	//this.groups = {cooleLeute:{members: {hans:{stinkt:true}}, attributes: {stinkt:{}}}};
	var scope = this;
	
	$('#create-group-panel input[type=button][value=add]').on('click', function(e){
		var input = $('#create-group-panel input[name=group-name]');
		if(!scope.addGroup(input.val())){
			alert('A group with name "'+input.val()+'" already exists');
		}
		input.val("");
		e.stopPropagation();
	});

	$('#create-attribute-panel input[type=button][value=add]').on('click', function(e){
		var selectedGroup = $(scope.groupList).find('.selected').attr('group-name');
		var inputName = $('#create-attribute-panel input[name=attribute-name]');
		var type = $('#create-attribute-panel select[name=attribute-type]').val();
		if(!scope.addAttribute(selectedGroup, inputName.val(), {type:type})){
			alert('An attribute with name "'+inputName.val()+'" already exists in group "'+selectedGroup+'"');
		}
		inputName.val("");
		//e.stopPropagation();
	});

	$('#create-member-panel input[type=button][value=add]').on('click', function(e){
		var selectedGroup = $(scope.groupList).find('.selected').attr('group-name');
		var inputName = $('#create-member-panel input[name=member-name]');
		if(!scope.addMember(selectedGroup, inputName.val(), {})){
			alert('An member with name "'+inputName.val()+'" already exists in group "'+selectedGroup+'"');
		}
		inputName.val("");
		e.stopPropagation();
	});

	this.groupList.on('click', function(){
		scope.editGroup();
	});
	$('#group-detail-list').on('click', function(){
		scope.editMember();
	});


	//ui-stuff
	$('#member-attributes').accordion();


	//test
	this.addGroup("cooleLeute");
	this.addAttribute("cooleLeute", "stinkt", {type:"value"});
	this.addAttribute("cooleLeute", "haus", {type:"position"});
	this.addAttribute("cooleLeute", "reiseziel", {type:"position"});
	this.addMember("cooleLeute", "Hans", {});
	this.groups.cooleLeute.members.Hans.haus.longitude= 8.809935626983588;
	this.groups.cooleLeute.members.Hans.haus.latitude= 53.083995593445756;
	this.groups.cooleLeute.members.Hans.haus.zoom= 16;
	this.groups.cooleLeute.members.Hans.reiseziel.longitude= 2.7453447000000324;
	this.groups.cooleLeute.members.Hans.reiseziel.latitude= 39.5157819;
	this.groups.cooleLeute.members.Hans.reiseziel.zoom= 11;
	this.groups.cooleLeute.members.Hans.stinkt.value= "manchmal";

	this.addMember("cooleLeute", "Flo Rista", {});
	this.groups.cooleLeute.members["Flo Rista"].haus.longitude= -3.6870743986219168;
	this.groups.cooleLeute.members["Flo Rista"].haus.latitude= 41.67323938824088;
	this.groups.cooleLeute.members["Flo Rista"].haus.zoom= 18;
	this.groups.cooleLeute.members["Flo Rista"].reiseziel.longitude= 10.38930058479309;
	this.groups.cooleLeute.members["Flo Rista"].reiseziel.latitude= 46.92182347638428;
	this.groups.cooleLeute.members["Flo Rista"].reiseziel.zoom= 11;
	this.groups.cooleLeute.members["Flo Rista"].stinkt.value= "höchstens nach Blumen";
	this.editGroup();
	this.editMember();
}

GroupEditor.prototype.addGroup = function(groupName){
	if(groupName)
	var scope = this;
	if(this.groups[groupName] == undefined){
		var joinable= $('#create-group-panel').find('input[name=group-joinable]').is(':checked');
		this.groups[groupName] = {members: {}, attributes: {}, joinable: joinable};
		
		this.groupList.find('ul')
		.append($('<li>'+groupName+'</li>')
			.attr('group-name', groupName)
			.append($('<label title="Players can join this group before the game starts (for teams)."></label>')
				.append($('<input type="checkbox" name="group-joinable" '+(joinable ? 'checked ' : '')+'/><span>joinable</span>'))
				.on('click', function(){
					scope.groups[groupName].joinable = $(this).is(':checked');
				}))
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(e){
				scope.removeGroup($(this.parentNode).attr('group-name'));
				e.stopPropagation();
			}))
			.on('click', function(e){
				scope.editGroup(groupName);
				e.stopPropagation();
			}));
		return true;
	}else{
		return false;
	}
	
}

GroupEditor.prototype.removeGroup = function(groupName){
	if(this.groups[groupName] != undefined){
		delete this.groups[groupName];
		this.groupList.find('ul li[group-name='+groupName+']').remove();
		this.editGroup();
		return true;
	}else{
		return false;
	}
}

GroupEditor.prototype.editGroup = function(groupName){
	var scope = this;
	this.groupList.find('ul li').removeClass('selected');
	this.attributeList.find('li').remove();
	this.memberList.find('li').remove();
	if(this.groups[groupName] == undefined){
		$('#group-detail-list div.group-editor-list-title').html('');
		$('#create-attribute-panel input').attr('disabled', true);
		$('#group-detail-list').css('opacity', '0.3');
		this.editMember();
		return;
	}
	$('#group-detail-list div.group-editor-list-title').html('Edit Group: '+groupName);
	$('#create-attribute-panel input').attr('disabled', false);
	$('#group-detail-list').css('opacity', '1');
	var selectedGroup = this.groups[groupName];
	this.groupList.find('ul li[group-name='+groupName+']').addClass('selected');

	//attribute ul füllen
	for(var key in selectedGroup.attributes){
		var currentType = selectedGroup.attributes[key].type;
		$('#group-attribute-overview')
		.append($('<li>'+key+'</li>')
			.attr('attr-name', key)
			.append('<span>Type:</span>')
			.append($('<select name="attribute-type">')
				.append('<option value="value" '+(currentType == 'value' ? 'selected ' : '')+'>Value</option>')
				.append('<option value="position" '+(currentType == 'position' ? 'selected ' : '')+'>Position</option>')
				.append('<option value="group" '+(currentType == 'group' ? 'selected ' : '')+'>Group</option>')
				.on('change', function(){
					var allMembers = selectedGroup.members;
					for(var member in allMembers){
						allMembers[member][$(this.parentNode).attr('attr-name')].type = $(this).val();
					}
					selectedGroup.attributes[$(this.parentNode).attr('attr-name')].type = $(this).val();
					scope.editMember();
				})
			)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(e){
				scope.removeAttribute(groupName, $(this.parentNode).attr('attr-name'));
				//e.stopPropagation();
			}))
			.on('click', function(e){
				e.stopPropagation();
			}));
	}

	//member ul füllen
	for(var key in selectedGroup.members){
		$('#group-member-overview')
		.append($('<li>'+key+'</li>')
			.attr('member-name', key)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(e){
				scope.removeMember(groupName, $(this.parentNode).attr('member-name'));
				e.stopPropagation();
			}))
			.on('click', function(e){
				scope.editMember(groupName, $(this).attr('member-name'));
				e.stopPropagation();
			}));
	}

}

GroupEditor.prototype.addAttribute = function(groupName, attributeName, attribute){
	if(this.groups[groupName] == undefined || this.groups[groupName].attributes[attributeName] != undefined){
		return false;
	}
	this.groups[groupName].attributes[attributeName] = attribute;
	this.editGroup(groupName);
	//allen membern der gruppe das attribu hinzufügen
	var allMembers = this.groups[groupName].members;
	for(var member in allMembers){
		allMembers[member][attributeName] = {};
		//kopieren, damit nicht alle das gleiche haben
		for(var key in attribute){
			allMembers[member][attributeName][key] = attribute[key];
		}
	}
	return true;
}

GroupEditor.prototype.removeAttribute = function(groupName, attributeName){
	if(this.groups[groupName] == undefined || this.groups[groupName].attributes[attributeName] == undefined){
		return false;
	}
	delete this.groups[groupName].attributes[attributeName];
	this.editGroup(groupName);
	//in allen membern der gruppe das attribut löschen
	var allMembers = this.groups[groupName].members;
	for(var member in allMembers){
		delete allMembers[member][attributeName];
	}
	return true;
}

GroupEditor.prototype.addMember = function(groupName, memberName, member){
	if(this.groups[groupName] == undefined || this.groups[groupName].members[memberName] != undefined){
		return false;
	}
	this.groups[groupName].members[memberName] = member;
	this.editGroup(groupName);
	var attributes = this.groups[groupName].attributes;
	for(var attr in attributes){
		member[attr] = {}
		//kopieren
		for(var key in attributes[attr]){
			member[attr][key] = attributes[attr][key];
		}
	}
	return true;
}

GroupEditor.prototype.removeMember = function(groupName, memberName){
	if(this.groups[groupName] == undefined || this.groups[groupName].members[memberName] == undefined){
		return false;
	}
	delete this.groups[groupName].members[memberName];
	this.editGroup(groupName);
	return true;
}

GroupEditor.prototype.editMember = function(groupName, memberName){
	$('#member-attributes').html('');
	if(this.groups[groupName] == undefined || this.groups[groupName].members[memberName] == undefined){
		$('#member-details').css('opacity', '0.3');
		$('#member-details .group-editor-list-title').html('');
		return false;
	}
	$('#member-details').css('opacity', '1');
	$('#member-details .group-editor-list-title').html('Edit Member:'+memberName);
	var member = this.groups[groupName].members[memberName];
	for(var key in member){
		$('#member-attributes').append('<h3>'+key+'</h3>')
		var attributeSetter = $('<div class="attribute-setter"></div>');
		switch(member[key].type){
			case "value":
				attributeSetter.append($('<input type="text" />')
					.val(member[key].value)
					.attr('name', key)
					.on('change', function(e){
						member[$(this).attr('name')].value = $(this).val();
					})
				);
				break;
			case "position":
				var lat = member[key].latitude;
				var lon = member[key].longitude;
				var zoom = member[key].zoom;
				var lat = (lat == undefined) ? 20 : lat;
				var lon = (lon == undefined) ? 20 : lon;
				var zoom = (zoom == undefined) ? 3 : zoom;
				attributeSetter.append($('<fieldset class="gllpLatlonPicker"></fieldset>')
					.attr('name', key)
    				.append('<input type="text" class="gllpSearchField">')
    				.append('<input type="button" class="gllpSearchButton" value="search">')
    				.append('<div class="gllpMap">Google Maps</div>')
    				.append('<input type="hidden" class="gllpLatitude" value="'+lat+'"/>')
    				.append('<input type="hidden" class="gllpLongitude" value="'+lon+'"/>')
    				.append('<input type="hidden" class="gllpZoom" value="'+zoom+'"/>')
    			);
				break;
		}
		$('#member-attributes').append(attributeSetter); 
	}
	$(".gllpLatlonPicker").each(function() {
		(new GMapsLatLonPicker()).init( $(this) );
	});
	$('#member-attributes').accordion('refresh');
	$('#member-attributes').accordion({ active: "h3:last" })
	$(document).unbind("location_changed").bind("location_changed", function(event, object) {
	//console.log(object);
	//console.log("changed: " + $(object).attr('id') );
		member[$(object).attr('name')].latitude = $(object).find('.gllpLatitude').val();
		member[$(object).attr('name')].longitude = $(object).find('.gllpLongitude').val();
		member[$(object).attr('name')].zoom = $(object).find('.gllpZoom').val();
	});


}