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