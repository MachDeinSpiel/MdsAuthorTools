// "class" Link
function Link(firstState, secondState) {
	// Attribute
	this.text;
	this.zIndex;
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
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


	var fx = this.firstState.x,
		fy = this.firstState.y,
		fw = this.firstState.width,
		fh = this.firstState.height,
		sx = this.secondState.x,
		sy = this.secondState.y,
		sw = this.secondState.width,
		sh = this.secondState.height;
		ratioX = (fw + sw) / (fw > sw ? sw : fw);
		ratioY = (fh + sh) / (fh > sh ? sh : fh);
		this.startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
		this.startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;

	if(fx <= sx){
		if(fx + fw > sx){
			if(fy < sy){
				this.startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
				this.endX = this.startX;
				this.startY = fy + fh;
				this.endY = sy;
				// console.log(1);
			}else{
				this.startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
				this.endX = this.startX;
				this.startY = fy;
				this.endY = sy +sh;
				// console.log(2);
			}
		}else{
			if(fy < sy){
				if(fy+fh > sy){
					this.startX = fx + fw;
					this.endX = sx;
					this.startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
					this.endY = this.startY;
					// console.log(3);
				}else{
					this.startX = fx + fw;
					this.endX = sx;
					this.startY = fy+fh;
					this.endY = sy;
					// console.log(4);
				}
			}else{
				if(sy + sh > fy){
					this.startX = fx + fw;
					this.endX = sx;
					// this.startY = ((sy + sh -fy)/ratioY)+fy;
					this.startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
					this.endY = this.startY;
					// console.log(5);
				}else{
					this.startX = fx + fw;
					this.endX = sx;
					this.startY = fy;
					this.endY = sy + sh;
					// console.log(6);
				}
			}
		}
	}else{
		if(sx + sw > fx){
			if(fy < sy){
				//this.startX = ((sx + sw - fx)/ratioX) +fx;
				this.startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
				this.endX = this.startX;
				this.startY = fy + fh;
				this.endY = sy;
				// console.log(7);
			}else{
				//this.startX = ((sx + sw -fx)/ratioX) +fx;
				this.startX = fw > sw ? ((fx + fw - sx)/ratioX) +sx : ((sx + sw - fx)/ratioX) + fx;
				this.endX = this.startX;
				this.startY = fy;
				this.endY = sy +sh;
				// console.log(8);
			}
		}else{
			if(fy < sy){
				if(fy+fh > sy){
					this.startX = fx;
					this.endX = sx + sw;
					//this.startY = ((fy + fh - sy)/ratioY) +sy;
					this.startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
					this.endY = this.startY;
					// console.log(9);
				}else{
					this.startX = fx;
					this.endX = sx + sw;
					this.startY = fy+fh;
					this.endY = sy;
					// console.log(10);
				}
			}else{
				if(sy + sh > fy){
					this.startX = fx;
					this.endX = sx + sw;
					//this.startY = ((sy + sh -fy)/ratioY)+fy;
					this.startY = fh > sh ? ((fy + fh - sy)/ratioY) +sy : ((sy + sh - fy)/ratioY) + fy;
					this.endY = this.startY;
					// console.log(11);
				}else{
					this.startX = fx;
					this.endX = sx + sw;
					this.startY = fy;
					this.endY = sy + sh;
					// console.log(12);
				}
			}
		}

	}
	this.disc.style.left = ((this.startX + this.endX) / 2) - (this.disc.offsetWidth / 2) +'px';
	this.disc.style.top = ((this.startY + this.endY) / 2) - (this.disc.offsetHeight / 2)+'px';
}

Link.prototype.draw = function(context) {
	var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(this.endY-this.startY,this.endX-this.startX);
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = 2;
    context.lineCap = 'square';
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.lineTo(this.endX-headlen*Math.cos(angle-Math.PI/6),this.endY-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(this.endX, this.endY);
    context.lineTo(this.endX-headlen*Math.cos(angle+Math.PI/6),this.endY-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}