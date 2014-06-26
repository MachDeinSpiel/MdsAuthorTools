function HistoryManager() {
	this.commands = [];
	this.index = -1;
}

HistoryManager.prototype.onNewCommand = function(command) {

	if (!(command instanceof Command)) {
		throw new Error("Can't add non-command object to history", command);
	} else {
		this.commands[++this.index] = command;
		while(this.commands.length > this.index+1){
			this.commands.pop();
			console.info(this.commands.length);
		}
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