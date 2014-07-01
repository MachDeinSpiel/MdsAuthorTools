function UpdateTransitionCommand(data,oldData) {
	Command.call(this, data);
	this.oldData = oldData;
}

UpdateTransitionCommand.prototype = Object.create(Command.prototype);
UpdateTransitionCommand.prototype.constructor = UpdateTransitionCommand;

/** will ever return data */
UpdateTransitionCommand.prototype.execute = function() {
	stateManager.updateTransition(this.data);
	return this.data;
}

UpdateTransitionCommand.prototype.undo = function() {
	return stateManager.updateTransition(this.oldData);
}

UpdateTransitionCommand.prototype.redo = function() {
	stateManager.updateTransition(this.data);
}