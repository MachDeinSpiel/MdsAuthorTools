function StateManager() {

	this.states = [];

}

StateManager.prototype.addState = function(x, y) {

	var stateId = this.states.length + 1;
	this.states.push(new State(x, y, stateId));
	return stateId;
}

StateManager.prototype.getStateByID = function(id) {
	var state = this.states[id-1];
	console.log(this.states.length);
	console.log(state);
	if (state === undefined) {
		throw new undefinedStateException(id);
	} 
	return state;
}



stateManager = new StateManager();