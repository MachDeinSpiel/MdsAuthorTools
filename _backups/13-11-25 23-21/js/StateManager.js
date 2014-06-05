// "class" StateManager
// Manages all changes
function StateManager() {

	this.states = [];
	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext('2d');

}

StateManager.prototype.createState = function(title, x, y, width, height, jasonObj) {
	// calls the constructor of State
	var state = new State(title, x, y, 3, width, height);
	// in vorhandene States speichern
	this.states.push(state);
}

StateManager.prototype.deleteState = function(state) {
	// deletes the given State
	var index = this.states.indexOf(state);
	this.states.splice(index,1);
}

StateManager.prototype.linkStates = function(startState, endState) {
	
	var sPointX;
	var sPointY;
	var ePointX;
	var ePointY;

	// Find the two anchor points for the states
	if (startState.x < endState.x) {
		// start liegt links
		if (startState.y < endState.y) {
			// links oben, SPoint unten rechts, EPoint oben links
			sPointX = startState.x + startState.width;
			sPointY = startState.y + startState.height;
			ePointX = endState.x;
			ePointY = endState.y;
		} else {
			// links unten
			sPointX = startState.x + startState.width;
			sPointY = startState.y;
			ePointX = endState.x;
			ePointY = endState.y + endState.height;
		}
	} else {
		// rechts
		if (startState.y < endState.y) {
			// rechts oben
			sPointX = startState.x;
			sPointY = startState.y + startState.height;
			ePointX = endState.x + endState.width;
			ePointY = endState.y;
		} else {
			// rechts unten
			sPointX = startState.x;
			sPointY = startState.y;
			ePointX = endState.x + endState.width;
			ePointY = endState.y + endState.height;
		}
	}

	var link = new Link(sPointX, sPointY, ePointX, ePointY);
	// Pfeil zeichnen
	link.draw(this.context);
	// den States sagen, dass der Link bei ihnen ist
	startState.startLinks.push(link);
	endState.endLinks.push(link);

	return link;
}