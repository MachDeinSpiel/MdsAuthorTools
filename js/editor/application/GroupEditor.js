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
		e.stopPropagation();
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

	//test
	this.addGroup("cooleLeute");
	this.addAttribute("cooleLeute", "stinkt", {type:"value"});
	this.addAttribute("cooleLeute", "haus", {type:"position"});
	this.addMember("cooleLeute", "Hans", {});
	this.editGroup();
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
		$('#group-detail-list').css('opacity', '0.1');
		return;
	}
	$('#group-detail-list div.group-editor-list-title').html(groupName+'-Config');
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
					selectedGroup.attributes[$(this.parentNode).attr('attr-name')].type = $(this).val();
				})
			)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(e){
				scope.removeAttribute(groupName, $(this.parentNode).attr('attr-name'));
				e.stopPropagation();
			}))
			.on('click', function(){
				//scope.editGroup(groupName);
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
			.on('click', function(){
				//scope.editGroup(groupName);
			}));
	}

}

GroupEditor.prototype.addAttribute = function(groupName, attributeName, attribute){
	if(this.groups[groupName] == undefined || this.groups[groupName].attributes[attributeName] != undefined){
		return false;
	}
	this.groups[groupName].attributes[attributeName] = attribute;
	this.editGroup(groupName);
	return true;
}

GroupEditor.prototype.removeAttribute = function(groupName, attributeName){
	if(this.groups[groupName] == undefined || this.groups[groupName].attributes[attributeName] == undefined){
		return false;
	}
	delete this.groups[groupName].attributes[attributeName];
	this.editGroup(groupName);
	return true;
}

GroupEditor.prototype.addMember = function(groupName, memberName, member){
	if(this.groups[groupName] == undefined || this.groups[groupName].members[memberName] != undefined){
		return false;
	}
	this.groups[groupName].members[memberName] = member;
	this.editGroup(groupName);
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