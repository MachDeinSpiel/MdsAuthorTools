function State(x, y, id) {
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
	this.isStart = false;
	this.isEnd = false;

	this.createDom().appendTo("#editor-divs");

	DRAGDROP.LoadStateDrag();
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


State.prototype.validate = function(){
	var dom = $("#editor-divs").find("[state-id='" + this.id + "']");
	if(dom != []){
		dom.find(".state-title").html(this.name);
	}
	DRAGDROP.LoadStateDrag();
}