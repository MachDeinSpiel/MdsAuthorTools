function CreateStateCommand(data){
	Command.call(this,data);
	this.id = -1;
}

CreateStateCommand.prototype = Object.create(Command.prototype);
CreateStateCommand.prototype.constructor = CreateStateCommand;

CreateStateCommand.prototype.execute = function(){
	this.id = stateManager.addState(this.data.x, this.data.y);
}

CreateStateCommand.prototype.undo = function(){
	stateManager.removeState(this.id);
}

CreateStateCommand.prototype.getDescription = function(){
	return "Add new State";
}
