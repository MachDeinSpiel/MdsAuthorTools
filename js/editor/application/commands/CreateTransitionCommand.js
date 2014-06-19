function CreateTransitionCommand(data) {
	/**
	 * In this Case there is the ACTUAL STATE DATA - reference -
	 */
	Command.call(this, data);
}

CreateTransitionCommand.prototype = Object.create(Command.prototype);
CreateTransitionCommand.prototype.constructor = CreateTransitionCommand;

/** will ever return data */
CreateTransitionCommand.prototype.execute = function() {
	this.data = stateManager.linkStates(data.start, data.endState);
	return this.data;
}

CreateTransitionCommand.prototype.undo = function() {
	console.log("CreateStateCommand - undo");
	return stateManager.removeTransition(this.data);
}

CreateTransitionCommand.prototype.getDescription = function() {
	return "Add new transition";
}

CreateTransitionCommand.prototype.redo = function() {
	console.log("redo dom", this.data.domObj);
	stateManager.addTransitionByTransition(this.data);

}