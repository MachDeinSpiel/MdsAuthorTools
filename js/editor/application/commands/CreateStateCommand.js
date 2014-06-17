function CreateStateCommand(data){
	/**
	 * In this Case there is the ACTUAL STATE DATA - reference -
	 */
	Command.call(this,data);
}

CreateStateCommand.prototype = Object.create(Command.prototype);
CreateStateCommand.prototype.constructor = CreateStateCommand;

/** will ever return data */
CreateStateCommand.prototype.execute = function(){
	this.data = stateManager.addState(this.data.left, this.data.top);
	return this.data;
}

CreateStateCommand.prototype.undo = function(){
	console.log("CreateStateCommand - undo");
	return stateManager.removeState(this.data);
}

CreateStateCommand.prototype.getDescription = function(){
	return "Add new State";
}

CreateStateCommand.prototype.redo = function(){
	console.log("redo dom",this.data.domObj);
	stateManager.addStateByState(this.data);
}
