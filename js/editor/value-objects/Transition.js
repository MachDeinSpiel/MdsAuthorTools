function Transition(startState, endState){
	this.startState = startState;
	this.endState = endState;
	this.condition = undefined;

	this.points = [];
	this.domObj = undefined;
}


Transition.prototype.draw = function() {
	console.log("draw transition");
};