function StateManager() {

	this.states = [];

}

StateManager.prototype.addState = function(x,y) {
	var stateId = this.states.length + 1;
	console.info('stateid: ' + stateId);

	var titlediv = $("<div></div>", {
		"class": "state-title",
		text : "Insert Title"
	});

	$("<div></div>", {
		"class": "state",
		'style': "left: "+x+"px; top: "+y+"px;"
	}).appendTo("#editor-divs")
		.data("id", stateId)
		.append(titlediv);


	return;
	// <div class="state" data-id="1" style="top: 100px; left: 200px;">
	// 	<div class="state-title" >Move Around</div>
	// </div>
}



stateManager = new StateManager();

stateManager.addState(300,100);