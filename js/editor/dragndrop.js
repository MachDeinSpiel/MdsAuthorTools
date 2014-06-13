var startX,
	startY;

var deltaX,
	deltaY;

var stateID;

$( ".state" ).draggable({
    start: function() {
    	startX = parseInt(this.style.left);
    	startY = parseInt(this.style.top);	
    	stateID = this.getAttribute('data-id');
    },
    drag: function() {
    	
	},
    stop: function() {
    	
    	
    	deltaX = parseInt(this.style.left) - startX;
    	deltaY = parseInt(this.style.top) - startY;
		console.log('deltaX: ' +deltaX);
		console.log('deltaY: ' +deltaY);
    }
});

