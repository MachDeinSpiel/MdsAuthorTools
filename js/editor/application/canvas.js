CANVAS = {};


CANVAS.init = function(){
	this.canvas = $('#editor-canvas');
	this.width = this.canvas.width();
	this.height = this.canvas.height();
	this.canvas.attr('width', this.width);
	this.canvas.attr('height', this.height);
	this.ctx = this.canvas.get(0).getContext("2d");

	this.ctx.strokeStyle = '#0086cc';
	this.ctx.lineWidth = "2";

	window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	(function tick(){

		CANVAS.clear();
		CANVAS.drawLine(0,0,200,200);
		stateManager.drawLinks();

		window.requestAnimFrame(function(){
			tick();
		});
	})();
}

CANVAS.clear = function(x1,y1,x2,y1){
	this.ctx.clearRect(0,0,this.width, this.height);
}


CANVAS.drawLine = function(x1,y1,x2,y2){
	this.ctx.beginPath();
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2,y2);
	this.ctx.closePath();
	this.ctx.stroke();
}
