function Command(data){
	this.data = data;
}

Command.prototype.execute = function(){
	console.log("execute ",this.data);
}

Command.prototype.undo = function(){
	console.log("undo ",this.data);
}

Command.prototype.getDescription = function(){
	return "display "+this.data;
}



function History(){
	this.history = [];
	this.historyPosition = -1;

	this.executeCommand = function(command){
		if(!command instanceof Command){
			throw new Error("Can't add non-command object to history",command);
		}else{
			while(this.history.length > this.historyPosition+1){
				this.history.pop();
			}
			command.execute();
			this.history.push(command);	
			this.historyPosition++;
		}
	}

	this.undo = function(){
		this.history[this.historyPosition].undo();
		this.historyPosition--;
	}

	this.printHistory = function(){
		console.log("History:");
		for(var i=0; i<this.history.length; i++){
			console.log((i == this.historyPosition ? ">" : "")+this.history[i].getDescription());
		}
	}

	this.export = function(){
		console.log(JSON.stringify(history));
	}
}