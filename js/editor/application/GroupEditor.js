function GroupEditor(){
	this.groupList = $('#groups-list');
	this.memberList = $('#member-list');
	this.attributeList = $('#attribute-list');
	this.groups = {};
	var scope = this;
	
	$('#create-group-panel input[type=button][value=add]').on('click', function(){
		var input = $('#create-group-panel input[name=group-name]');
		if(!scope.addGroup(input.val())){
			alert('A group with name "'+input.val()+'" already exists');
		}
		input.val("");
	});

	$('#create-attribute-panel input[type=button][value=add]').on('click', function(){
		var selectedGroup = $(scope.groupList).find('.selected').attr('group-name');
		var inputName = $('#create-attribute-panel input[name=attribute-name]');
		if(!scope.addAttribute(selectedGroup, inputName.val(), {})){
			alert('An attribute with name "'+inputName.val()+'" already exists in group "'+selectedGroup+'"');
		}
		inputName.val("");
	});
}

GroupEditor.prototype.addGroup = function(groupName){
	var scope = this;
	if(this.groups[groupName] == undefined){
		this.groups[groupName] = {members: {}, attributes: {}};
		this.groupList.find('ul')
		.append($('<li>'+groupName+'</li>')
			.attr('group-name', groupName)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(){
				scope.removeGroup($(this.parentNode).attr('group-name'));
			}))
			.on('click', function(){
				scope.editGroup(groupName);
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
	this.attributeList.find('ul li').remove();
	if(this.groups[groupName] == undefined){
		$('#create-attribute-panel').css('display', 'none');
		return;
	}
	$('#create-attribute-panel').css('display', 'block');
	var selectedGroup = this.groups[groupName];
	this.groupList.find('ul li[group-name='+groupName+']').addClass('selected');
	for(var key in selectedGroup.attributes){
		console.log(key);
		this.attributeList.find('ul')
		.append($('<li>'+key+'</li>')
			.attr('attr-name', key)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(){
				scope.removeAttribute(groupName, $(this.parentNode).attr('attr-name'));
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