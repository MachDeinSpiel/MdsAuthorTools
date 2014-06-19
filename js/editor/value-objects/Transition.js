function Transition(startState, endState){
	console.log("New Transition with states:",startState,endState);
	this.startState = startState;
	this.endState = endState;
	this.condition = undefined;

	this.points = [];

	var x = (startState.x+endState.x)/2;
	var y = (startState.y+endState.y)/2;
	this.domObj = $("<div></div>", {
		"class": "transition",
		"style": "left: " + x + "px; top: " + y + "px;",
		"text" : "Transition"
	}).appendTo('#editor-divs');

	DRAGDROP.loadTransitionDrag();

}


Transition.prototype.draw = function() {
	
	var x = parseInt(this.domObj[0].style.left);
	var y = parseInt(this.domObj[0].style.top);
	var w = this.domObj.width();
	var h = this.domObj.height();

	var p1 = this.findDrawingPoints(this.startState.x,
								this.startState.y,
								this.startState.domObj.width(),
								this.startState.domObj.height(),
								x, y, w, h);

	var p2 = this.findDrawingPoints(x, y, w, h,
								this.endState.x,
								this.endState.y,
								this.endState.domObj.width(),
								this.endState.domObj.height());

	CANVAS.drawLine(p1.startX, p1.startY, p1.endX, p1.endY);
	CANVAS.drawArrow(p2.startX, p2.startY, p2.endX, p2.endY);
};

Transition.prototype.findDrawingPoints = function(fx, fy, fw, fh, sx, sy, sw, sh){
	var startX = 0,
		startY = 0,
		endX = 0,
		endY = 0;

	ratioX = (fw + sw) / (fw > sw ? sw : fw);
	ratioY = (fh + sh) / (fh > sh ? sh : fh);
	startX = fw > sw ? ((fx + fw - sx) / ratioX) + sx : ((sx + sw - fx) / ratioX) + fx;
	startY = fh > sh ? ((fy + fh - sy) / ratioY) + sy : ((sy + sh - fy) / ratioY) + fy;

	if (fx <= sx) {
		if (fx + fw > sx) {
			if (fy < sy) {
				startX = fw > sw ? ((fx + fw - sx) / ratioX) + sx : ((sx + sw - fx) / ratioX) + fx;
				endX = startX;
				startY = fy + fh;
				endY = sy;
				// console.log(1);
			} else {
				startX = fw > sw ? ((fx + fw - sx) / ratioX) + sx : ((sx + sw - fx) / ratioX) + fx;
				endX = startX;
				startY = fy;
				endY = sy + sh;
				// console.log(2);
			}
		} else {
			if (fy < sy) {
				if (fy + fh > sy) {
					startX = fx + fw;
					endX = sx;
					startY = fh > sh ? ((fy + fh - sy) / ratioY) + sy : ((sy + sh - fy) / ratioY) + fy;
					endY = startY;
					// console.log(3);
				} else {
					startX = fx + fw;
					endX = sx;
					startY = fy + fh;
					endY = sy;
					// console.log(4);
				}
			} else {
				if (sy + sh > fy) {
					startX = fx + fw;
					endX = sx;
					// this.startY = ((sy + sh -fy)/ratioY)+fy;
					startY = fh > sh ? ((fy + fh - sy) / ratioY) + sy : ((sy + sh - fy) / ratioY) + fy;
					endY = startY;
					// console.log(5);
				} else {
					startX = fx + fw;
					endX = sx;
					startY = fy;
					endY = sy + sh;
					// console.log(6);
				}
			}
		}
	} else {
		if (sx + sw > fx) {
			if (fy < sy) {
				//this.startX = ((sx + sw - fx)/ratioX) +fx;
				startX = fw > sw ? ((fx + fw - sx) / ratioX) + sx : ((sx + sw - fx) / ratioX) + fx;
				endX = startX;
				startY = fy + fh;
				endY = sy;
				// console.log(7);
			} else {
				//this.startX = ((sx + sw -fx)/ratioX) +fx;
				startX = fw > sw ? ((fx + fw - sx) / ratioX) + sx : ((sx + sw - fx) / ratioX) + fx;
				endX = startX;
				startY = fy;
				endY = sy + sh;
				// console.log(8);
			}
		} else {
			if (fy < sy) {
				if (fy + fh > sy) {
					startX = fx;
					endX = sx + sw;
					//this.startY = ((fy + fh - sy)/ratioY) +sy;
					startY = fh > sh ? ((fy + fh - sy) / ratioY) + sy : ((sy + sh - fy) / ratioY) + fy;
					endY = startY;
					// console.log(9);
				} else {
					startX = fx;
					endX = sx + sw;
					startY = fy + fh;
					endY = sy;
					// console.log(10);
				}
			} else {
				if (sy + sh > fy) {
					startX = fx;
					endX = sx + sw;
					//this.startY = ((sy + sh -fy)/ratioY)+fy;
					startY = fh > sh ? ((fy + fh - sy) / ratioY) + sy : ((sy + sh - fy) / ratioY) + fy;
					endY = startY;
					// console.log(11);
				} else {
					startX = fx;
					endX = sx + sw;
					startY = fy;
					endY = sy + sh;
					// console.log(12);
				}
			}
		}

	}

	return {startX: startX, endX: endX, startY: startY, endY: endY};
}

