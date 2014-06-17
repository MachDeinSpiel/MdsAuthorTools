function HistoryManager() {
	this.commands = [];
	this.index = 0;
}

HistoryManager.prototype.onNewCommand = function(command) {

	if (!(command instanceof Command)) {
		throw new Error("Can't add non-command object to history", command);
	} else {

		console.info('on new command - History Manager');
		this.index++;
		this.commands[this.index] = command;

		/**
		 * return all date back to the "view" if used and not!!!!!!!! MAD ANDREAS
		 */
		return command.execute();
	}
};

HistoryManager.prototype.undo = function() {

};

HistoryManager.prototype.redo = function() {

};