function DeleteTransitionCommand(data) {
	Command.call(this, data);
}

DeleteTransitionCommand.prototype = Object.create(Command.prototype);
DeleteTransitionCommand.prototype.constructor = DeleteTransitionCommand;

/** will ever return data */
DeleteTransitionCommand.prototype.execute = function() {
	stateManager.removeTransition(this.data);
	return this.data;
}

DeleteTransitionCommand.prototype.undo = function() {
	return stateManager.addTransitionByTransition(this.data);
}

DeleteTransitionCommand.prototype.redo = function() {
	stateManager.removeTransition(this.data);
}