
DRAGDROP = window.DRAGDROP || {};

DRAGDROP.LoadStateDrag = function() {
    var stateID;
    var deltaX;
    var deltaY;
    var startX;
    var startY;
    $(".state").draggable({
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
        },
        stop: function() {


            deltaX = parseInt(this.style.left) - startX;
            deltaY = parseInt(this.style.top) - startY;
        }
    })
}

DRAGDROP.LoadToolDrag = function(){
     $(".tooldrag").draggable({
        cursor: "move",
        stack: "#editor-divs div",
        distance: 10,
        revert: "invalid",
        start: function() {

        },
        drag: function() {

        },
        stop: function() {

        }
    })
}


DRAGDROP.LoadStateDrag();


$("#editor-divs").droppable({
    drop: function(event, ui) {
        console.log('dropped');
    }
});