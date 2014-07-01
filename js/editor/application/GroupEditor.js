function GroupEditor(){
	this.groupList = $('#groups-list');
	this.groups = {};
	var scope = this;
	
	$('#create-group-panel input[type=button][value=add]').on('click', function(){
		var input = $('#create-group-panel input[name=group-name]');
		if(!scope.addGroup(input.val())){
			alert('A group with name "'+input.val()+'" already exists');
		}
		input.val("");
	});
}

GroupEditor.prototype.addGroup = function(groupName){
	var scope = this;
	if(this.groups[groupName] == undefined){
		this.groups[groupName] = {};
		this.groupList.find('ul')
		.append($('<li>'+groupName+'</li>')
			.attr('group-name', groupName)
			.append($('<input type="button" value="delete" style="float:right;" />').on('click', function(){
				scope.removeGroup($(this.parentNode).attr('group-name'));
			})));
		return true;
	}else{
		return false;
	}
	
}

GroupEditor.prototype.removeGroup = function(groupName){
	if(this.groups[groupName] != undefined){
		delete this.groups[groupName];
		this.groupList.find('ul li[group-name='+groupName+']').remove();
		return true;
	}else{
		return false;
	}
}

