// "class" Link
function Link(firstState, secondState, context) {
	// Attribute
	this.text;
	this.zIndex;
	this.context = context;


	// this.startX = 0;
	// this.startY = 0;
	// this.endX = 0;
	// this.endY = 0;

	//Punkte für die berechnung
	this.points = 	[	
						firstState,
						secondState
					];




	this.firstState = firstState;
	this.secondState = secondState;
	this.strokeStyle = '#ffffff';
	
	this.description = '';
	

	
	this.disc = document.createElement('div');
	this.disc.className = 'link-description';
	
	document.getElementById('states').appendChild(this.disc);
}



Link.prototype.setTitle = function(title){
	this.disc.innerHTML = title;
}


Link.prototype.updatePosition = function(){


	for (var i = 0; i < this.points.length-1; i++) {

		var fx = this.points[i].x,
			fy = this.points[i].y,
			fw = this.points[i].width,
			fh = this.points[i].height,
			sx = this.points[i+1].x,
			sy = this.points[i+1].y,
			sw = this.points[i+1].width,
			sh = this.points[i+1].height;
			startX = 0;
			startY = 0;
			endX = 0;
			endY = 0;

			ratioX = (fw + sw) / (fw > sw ? sw : fw);
			ratioY = (fh + sh) / (fh > sh ? sh : fh);
			startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
			startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;

			if(fx <= sx){
				if(fx + fw > sx){
					if(fy < sy){
						startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
						endX = startX;
						startY = fy + fh;
						endY = sy;
						// console.log(1);
					}else{
						startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
						endX = startX;
						startY = fy;
						endY = sy +sh;
						// console.log(2);
					}
				}else{
					if(fy < sy){
						if(fy+fh > sy){
							startX = fx + fw;
							endX = sx;
							startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
							endY = startY;
							// console.log(3);
						}else{
							startX = fx + fw;
							endX = sx;
							startY = fy+fh;
							endY = sy;
							// console.log(4);
						}
					}else{
						if(sy + sh > fy){
							startX = fx + fw;
							endX = sx;
							// this.startY = ((sy + sh -fy)/ratioY)+fy;
							startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
							endY = startY;
							// console.log(5);
						}else{
							startX = fx + fw;
							endX = sx;
							startY = fy;
							endY = sy + sh;
							// console.log(6);
						}
					}
				}
			}else{
				if(sx + sw > fx){
					if(fy < sy){
						//this.startX = ((sx + sw - fx)/ratioX) +fx;
						startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
						endX = startX;
						startY = fy + fh;
						endY = sy;
						// console.log(7);
					}else{
						//this.startX = ((sx + sw -fx)/ratioX) +fx;
						startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
						endX = startX;
						startY = fy;
						endY = sy +sh;
						// console.log(8);
					}
				}else{
					if(fy < sy){
						if(fy+fh > sy){
							startX = fx;
							endX = sx + sw;
							//this.startY = ((fy + fh - sy)/ratioY) +sy;
							startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
							endY = startY;
							// console.log(9);
						}else{
							startX = fx;
							endX = sx + sw;
							startY = fy+fh;
							endY = sy;
							// console.log(10);
						}
					}else{
						if(sy + sh > fy){
							startX = fx;
							endX = sx + sw;
							//this.startY = ((sy + sh -fy)/ratioY)+fy;
							startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
							endY = startY;
							// console.log(11);
						}else{
							startX = fx;
							endX = sx + sw;
							startY = fy;
							endY = sy + sh;
							// console.log(12);
						}
					}
				}

			}
			this.draw(startX, startY, endX, endY);

		this.disc.style.left = ((startX + endX) / 2) - (this.disc.offsetWidth / 2) +'px';
		this.disc.style.top = ((startY + endY) / 2) - (this.disc.offsetHeight / 2)+'px';
	}

	
}

Link.prototype.draw = function(startX, startY, endX, endY) {
	var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(endY-startY,endX-startX);
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = 2;
    this.context.lineCap = 'square';
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.lineTo(endX-headlen*Math.cos(angle-Math.PI/6),endY-headlen*Math.sin(angle-Math.PI/6));
    this.context.moveTo(endX, endY);
    this.context.lineTo(endX-headlen*Math.cos(angle+Math.PI/6),endY-headlen*Math.sin(angle+Math.PI/6));
    this.context.stroke();
}