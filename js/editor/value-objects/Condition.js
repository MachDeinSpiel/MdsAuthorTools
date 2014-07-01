function Condition(){
	this.text = "sample condition text";

	this.inputs = {};
	this.data = {};

}


Condition.prototype.generateText = function(){
	this.text = this.data.name;
	var that = this;
	$.each(that.inputs, function (key, value) {
		that.text = that.text+", "+value;
	});	
}

Condition.prototype.generateJson = function(){
	var that = this; 
	$.each(that.inputs, function(key, value){
		that.data.json = that.data.json.replace("_"+key+"_", value); 
	});
	return this.data.json;
}