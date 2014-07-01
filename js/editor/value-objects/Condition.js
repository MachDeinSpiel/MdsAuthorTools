function Condition(){
	this.text = "sample condition text";

	this.inputs = {};
	this.data = {};

}


Condition.prototype.generateText = function(){
	this.text = this.data.name;
	var that = this;
	$.each(this.inputs, function (key, value) {
		that.text = that.text+", "+value;
		console.log(value);
	});	
}