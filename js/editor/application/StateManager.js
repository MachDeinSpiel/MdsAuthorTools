function StateManager() {

	this.states = [];
	this.transitions = [];
	this.stateIndex = 0;
}

StateManager.prototype.addState = function(x, y) {
	var stateId = ++this.stateIndex;
	console.log(this.stateIndex);
	var temp = new State(x, y, stateId,'state');
	this.states.push(temp);
	return temp;
}

StateManager.prototype.getStateByID = function(id) {
	var state = this.states[id - 1];
	if (state === undefined) {
		throw new undefinedStateException(id);
	}
	return state;
}

StateManager.prototype.addStateByState = function(state) {
	this.states.push(state);
	$("#editor-divs").append(state.domObj);
	DRAGDROP.LoadStateDrag();
};

StateManager.prototype.removeState = function(state) {
	var i = -1;
	$.each(this.states, function(index, value) {
		if (value = state) {
			i = index;
		}
	});
	state.domObj.remove();


	if(i != -1){
		this.states.splice(i, 1);
	} else {
		throw new Error('NO INDEX -1 in states');
	}
};

StateManager.prototype.linkStates = function(state_1, state_2){
	var temp = new Transition(state_1, state_2);
	this.transitions.push(temp);
	return temp;
}

StateManager.prototype.addTransitionByTransition = function(trans) {
	this.transitions.push(trans);
	$("#editor-divs").append(trans.domObj);
	DRAGDROP.loadTransitionDrag();
};

StateManager.prototype.removeTransition = function(trans) {
	var i = -1;
	$.each(this.transitions, function(index, value){
		if (value = trans) {
			i = index;
		}
	});
	trans.domObj.remove();
	if(i != -1){
		this.transitions.splice(i, 1);
	} else {
		throw new Error('NO INDEX -1 in transitions');
	}
};

StateManager.prototype.drawTransitions = function() {
	$.each(this.transitions, function(index, value){
		value.draw();
	});
	
};

StateManager.prototype.updateState = function(data){
	$.each(this.states, function(index, value){
		if(value.id == data.id){
			value.name = data.name;
			value.validate();
		}
	});
	
}
