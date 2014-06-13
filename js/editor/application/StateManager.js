function StateManager() {

	this.states = [];

}

StateManager.prototype.addState = function(x,y) {

	var stateId = this.states.length + 1;
	console.info('stateid: ' + stateId);

	this.states.push(new State(x,y,stateId));
}



stateManager = new StateManager();

