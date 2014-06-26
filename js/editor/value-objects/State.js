function State(x, y, id, type) {
	//Tool related
	this.x = x;
	this.y = y;
	this.domObj = undefined;
	this.id = id;
	//Game related
	this.name = "State " +id;
	this.startAction = undefined;
	this.doAction = undefined;
	this.endAction = undefined;

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
	}).append(titlediv);

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
	if((this.startAction !== data.startAction) && data.startAction != undefined){
		this.isChanged = true;
		this.startAction = data.startAction;
	}
	if((this.doAction !== data.doAction) && data.doAction != undefined){
		this.isChanged = true;
		this.doAction = data.doAction;
	}
	if((this.endAction !== data.endAction) && data.endAction != undefined){
		this.isChanged = true;
		this.endAction = data.endAction;
	}
}


State.prototype.validate = function(){
	var dom = $("#editor-divs").find("[state-id='" + this.id + "']");
	if(dom != []){
		dom.find(".state-title").html(this.name);
	}
	dom.css('left',this.x);
	dom.css('top', this.y);
	dom.css('class',this.type);
	DRAGDROP.LoadStateDrag();
}