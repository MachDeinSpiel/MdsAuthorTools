function Action(name, inputs, json){
	this.name = name;
	this.json = json;
	this.inputs = inputs;

}


Action.prototype.generateJson = function(){
	var that = this; 
	$.each(that.inputs, function(key, value){
		that.json = that.json.replace("_"+key+"_", value.value); 
		console.log(value.value);
	});
	return this.json;
}

