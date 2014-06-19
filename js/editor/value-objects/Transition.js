function Transition(startState, endState){
	this.startState = startState;
	this.endState = endState;
	this.condition = undefined;

	this.points = [];
	this.domObj = undefined;
}


Transition.prototype.draw = function() {
	var x = parseInt(this.domObj.style.left);
	var y = parseInt(this.domObj.style.top);
	CANVAS.drawLine(this.startState.x, this.startState.y, x, y);
	CANVAS.drawArrow(x, y, this.endState.x, this.endState.y);
};