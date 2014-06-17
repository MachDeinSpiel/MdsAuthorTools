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

    $(".state").unbind( "click" ).on('click', function(event) {
        var cl = $(this).attr("class").split(' ')[0];
        if (cl === 'state') {
            /**
             * Current State setzen
             */
            SIDEBAR.setState(stateManager.getStateByID($(this).attr('state-id')));
            SIDEBAR.showInputs();
            //dont propagete event to the parent
            event.stopPropagation();
        }
    });
}



DRAGDROP.LoadToolDrag = function() {

    $(".tooldrag").draggable({
        cursor: "move",
        stack: "#editor-divs div",
        distance: 10,
        revert: function(obj) {
            if (!obj) {
                //TODO: HANDELN
            } else {

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
                // SIDEBAR.setState(stateManager.addState(parseInt(ui.offset.left - 300), ));
                SIDEBAR.setState(historyManager.onNewCommand(new CreateStateCommand({
                    'left': parseInt(ui.offset.left - 300),
                    'top': parseInt(ui.offset.top - 64)
                })));

                console.log(SIDEBAR.currentState);
                SIDEBAR.showInputs();
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
        "data-id": 1
    }).append(titlediv);

    return domObj;
}

$("#editor-divs").droppable({
    drop: function(event, ui) {
        ui.helper.data('dropped', true);
    }
});

$("#editor-divs").unbind( "click" ).on('click', function() {
    SIDEBAR.saveInputs();
});