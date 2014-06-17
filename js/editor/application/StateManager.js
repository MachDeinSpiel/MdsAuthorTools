function StateManager() {

	this.states = [];

}

StateManager.prototype.addState = function(x, y) {

	var stateId = this.states.length + 1;
	var temp = new State(x, y, stateId);
	this.states.push(temp);
	return temp;
}

StateManager.prototype.getStateByID = function(id) {
	var state = this.states[id-1];
	if (state === undefined) {
		throw new undefinedStateException(id);
	} 
	return state;
}

StateManager.prototype.addStateByState = function(state) {
	this.states.push(state);

};

