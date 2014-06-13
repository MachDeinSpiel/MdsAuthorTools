var startX,
	startY;

var deltaX,
	deltaY;

var stateID;

$( ".state" ).draggable({
	cursor: "move",
	stack: "#editor-divs div",
	distance: 10,
	revert: "invalid",
    start: function() {
    	startX = parseInt(this.style.left);
    	startY = parseInt(this.style.top);	
    	stateID = this.getAttribute('data-id');
    },
    drag: function() {
    	deltaX = parseInt(this.style.left) - startX;
    	deltaY = parseInt(this.style.top) - startY;
		console.log('deltaX: ' +deltaX);
		console.log('deltaY: ' +deltaY);
	},
    stop: function() {
    	
    	
    	deltaX = parseInt(this.style.left) - startX;
    	deltaY = parseInt(this.style.top) - startY;
    }
});


 $( "#editor-divs" ).droppable({	
    drop: function( event, ui ) {
    	console.log('dropped');
    }
});

