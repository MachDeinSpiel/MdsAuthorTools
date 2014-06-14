var DRAGDROP = {};

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

DRAGDROP.LoadToolDrag = function() {

    $(".tooldrag").draggable({
        cursor: "move",
        stack: "#editor-divs div",
        distance: 10,
        revert: function(obj) {
            if (!obj) {

            } else {
                console.log(obj[0].getClientRects());
            }

        },
        helper: function() {

            return DRAGDROP.createStateDom();
        },
        start: function() {

        },
        drag: function() {

        },
        stop: function(event, ui) {
            if (ui.helper.data('dropped')) {
                console.log(ui);
                stateManager.addState(parseInt(ui.offset.left - 300), parseInt(ui.offset.top - 64));
            }
        }
    })
}


DRAGDROP.createStateDom = function() {
    var titlediv = $("<div></div>", {
        "class": "state-title",
        text: "Insert Title"
    });

    var domObj = $("<div></div>", {
        "class": "state",
    }).append(titlediv);

    return domObj;
}



DRAGDROP.LoadStateDrag();


$("#editor-divs").droppable({
    drop: function(event, ui) {
        ui.helper.data('dropped', true);
    }
});