function HistoryManager() {
	this.commands = [];
	this.index = -1;
}

HistoryManager.prototype.onNewCommand = function(command) {

	if (!(command instanceof Command)) {
		throw new Error("Can't add non-command object to history", command);
	} else {
		this.commands[++this.index] = command;
		console.log(this.index);
		/**
		 * return all date back to the "view" if used and not!!!!!!!! MAD ANDREAS
		 */
		return command.execute();
	}
};

HistoryManager.prototype.undo = function() {
	console.log(this.commands[this.index]);
	if (this.commands[this.index] == undefined) {
		throw new Error("nothing to undo");
	} else {
		this.commands[this.index--].undo();
	}
};

HistoryManager.prototype.redo = function() {
	if (this.commands[this.index + 1] == undefined) {
		throw new Error("nothing to redo");
	} else {
		this.commands[++this.index].redo();
	}

};