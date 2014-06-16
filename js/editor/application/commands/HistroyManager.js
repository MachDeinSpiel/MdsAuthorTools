function HistoryManager(){
	this.commands = [];
}

HistoryManager.prototype.onNewCommand = function(command) {
	this.commands.push(command);
	command.execute();
};

HistoryManager.prototype.undo = function() {
	
};

HistoryManager.prototype.redo = function() {
	
};

HistoryManager.prototype.