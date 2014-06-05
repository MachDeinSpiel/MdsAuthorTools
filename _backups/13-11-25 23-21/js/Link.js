// "class" Link
function Link(startX, startY, endX, endY) {

	// Attribute
	this.text;
	this.zIndex;
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;

}

Link.prototype.move = function(startX, startY, endX, endY) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
}

Link.prototype.draw = function(context, fromx, fromy, tox, toy) {
	var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}