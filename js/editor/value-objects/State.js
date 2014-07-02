function State(x, y, id, type) {
	//Tool related
	this.x = x;
	this.y = y;
	this.domObj = undefined;
	this.id = id;
	//Game related
	this.name = "State " +id;
	this.startAction = [];
	this.doAction = [];
	this.endAction = [];

	//start end "normal"
	this.type = type;
	this.isChanged = false;


	this.createDom().appendTo("#editor-divs");
	DRAGDROP.LoadStateDrag();
}

State.prototype.getClone = function(){
	return jQuery.extend(true,{},this);
}

State.prototype.createDom = function() { 	
	var titlediv = $("<div></div>", {
		"class": "state-title",
		text: this.name
	});

	this.domObj = $("<div></div>", {
		"class"		: "state",
		"style"		: "left: " + this.x + "px; top: " + this.y + "px;",
		"state-id"	: ""+this.id
	}).append(titlediv)
		.append($('<div class="state-action-wrapper"></div>')
			.append('<div class="state-action-title">Start Actions</div><ol class="state-start-action-container action-container"></ol>'))
		.append($('<div class="state-action-wrapper"></div>')
			.append('<div class="state-action-title">Do Actions</div><ol class="state-do-action-container action-container"></ol>'))
		.append($('<div class="state-action-wrapper"></div>')
			.append('<div class="state-action-title">End Actions</div><ol class="state-end-action-container action-container"></ol>'));

	return this.domObj;
} 	


State.prototype.update = function(data){
	if((this.x != data.x) && data.x != undefined){
		this.isChanged = true;
		this.x = data.x;
	}
	if((this.y != data.y) && data.y != undefined){
		this.isChanged = true;
		this.y = data.y;
	}
	if((this.name != data.name) && data.name != undefined){
		this.isChanged = true;
		this.name = data.name;
	}
	if((this.startAction != data.startAction) && data.startAction != undefined){
		this.isChanged = true;
		this.startAction = data.startAction;
	}
	if((this.doAction != data.doAction) && data.doAction != undefined){
		this.isChanged = true;
		this.doAction = data.doAction;
	}
	if((this.endAction != data.endAction) && data.endAction != undefined){
		this.isChanged = true;
		this.endAction = data.endAction;
	}
	if((this.type !== data.type) && data.type != undefined){
		this.isChanged = true;
		this.type = data.type;
	}
}


State.prototype.validate = function(){
	var dom = $("#editor-divs").find("[state-id='" + this.id + "']");
	if(dom != []){
		dom.find(".state-title").html(this.name);
		
		var actionWrapper = dom.find('.state-action-wrapper');
		for(var i=0; i<actionWrapper.length; i++){
			actionWrapper[i].style.display ='none';
		}
		if(this.startAction.length > 0){
			actionWrapper[0].style.display = 'block';
			dom.find(".state-start-action-container").html("");
			this.startAction.forEach(function(action){
				dom.find(".state-start-action-container").append('<li>'+action.name+'</li>');
			});
		}
		if(this.doAction.length > 0){
			actionWrapper[1].style.display = 'block';
			dom.find(".state-do-action-container").html("");
			this.doAction.forEach(function(action){
				dom.find(".state-do-action-container").append('<li>'+action.name+'</li>');
			});
		}
		if(this.endAction.length > 0){
			actionWrapper[2].style.display = 'block';
			dom.find(".state-end-action-container").html("");
			this.endAction.forEach(function(action){
				dom.find(".state-end-action-container").append('<li>'+action.name+'</li>');
			});
		}
		
		
	}
	

	dom.css('left',this.x);
	dom.css('top', this.y);
	dom.removeClass('start-state');
	dom.removeClass('end-state');
	dom.addClass(this.type);
	DRAGDROP.LoadStateDrag();
}