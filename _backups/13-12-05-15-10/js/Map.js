// "class" Map
function Map() {

	this.x;
	this.y;
	this.visible = true;

}

Map.prototype.move(x, y) {
	this.x = x;
	this.y = y;
}

Map.prototype.changeVisibility(isVisible) {
	this.visible = isVisible;
}

Map.prototype. drawRectangle() {
	// this draws the rectangle in the map
}