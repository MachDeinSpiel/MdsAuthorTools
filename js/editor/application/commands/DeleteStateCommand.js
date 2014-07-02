function DeleteStateCommand(data,oldData) {
	Command.call(this, data);
	this.oldData = oldData;
}

DeleteStateCommand.prototype = Object.create(Command.prototype);
DeleteStateCommand.prototype.constructor = DeleteStateCommand;

/** will ever return data */
DeleteStateCommand.prototype.execute = function() {
	stateManager.deleteTransition(this.data);
	return this.data;
}

DeleteStateCommand.prototype.undo = function() {
	return stateManager.addStateByState(this.oldData);
}

DeleteStateCommand.prototype.redo = function() {
	stateManager.deleteTransition(this.data);
}