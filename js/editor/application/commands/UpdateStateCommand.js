function UpdateStateCommand(data,oldData) {
	Command.call(this, data);
	this.oldData = oldData;
}

UpdateStateCommand.prototype = Object.create(Command.prototype);
UpdateStateCommand.prototype.constructor = UpdateStateCommand;

/** will ever return data */
UpdateStateCommand.prototype.execute = function() {
	stateManager.updateState(this.data);
	return this.data;
}

UpdateStateCommand.prototype.undo = function() {
	return stateManager.updateState(this.oldData);
}

UpdateStateCommand.prototype.redo = function() {
	stateManager.updateState(this.data);
}