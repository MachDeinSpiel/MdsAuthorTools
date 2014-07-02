function DeleteStateCommand(data) {
	Command.call(this, data);
}

DeleteStateCommand.prototype = Object.create(Command.prototype);
DeleteStateCommand.prototype.constructor = DeleteStateCommand;

/** will ever return data */
DeleteStateCommand.prototype.execute = function() {
	stateManager.removeState(this.data);
	return this.data;
}

DeleteStateCommand.prototype.undo = function() {
	return stateManager.addStateByState(this.data);
}

DeleteStateCommand.prototype.redo = function() {
	stateManager.removeState(this.data);
}