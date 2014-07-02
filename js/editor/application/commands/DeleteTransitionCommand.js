function DeleteTransitionCommand(data,oldData) {
	Command.call(this, data);
	this.oldData = oldData;
}

DeleteTransitionCommand.prototype = Object.create(Command.prototype);
DeleteTransitionCommand.prototype.constructor = DeleteTransitionCommand;

/** will ever return data */
DeleteTransitionCommand.prototype.execute = function() {
	stateManager.deleteTransition(this.data);
	return this.data;
}

DeleteTransitionCommand.prototype.undo = function() {
	return stateManager.addTransitionByTransition(this.oldData);
}

DeleteTransitionCommand.prototype.redo = function() {
	stateManager.deleteTransition(this.data);
}