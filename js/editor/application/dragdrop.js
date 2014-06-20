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
        containment: "parent",
        start: function() {
            startX = parseInt(this.style.left);
            startY = parseInt(this.style.top);
            stateID = $(this).attr('state-id');
        },
        drag: function() {
            stateManager.getStateByID(stateID).x = parseInt(this.style.left);
            stateManager.getStateByID(stateID).y = parseInt(this.style.top);
            //deltaX = parseInt(this.style.left) - startX;
            //deltaY = parseInt(this.style.top) - startY;
        },
        stop: function() {


            deltaX = parseInt(this.style.left) - startX;
            deltaY = parseInt(this.style.top) - startY;
        }
    })

    $(".state").unbind("click").on('click', function(event) {


        if (SIDEBAR.currentTool === 'New Link') {
            if (SIDEBAR.transition.mode) {
                SIDEBAR.transition.start = stateManager.getStateByID($(this).attr('state-id'));
                SIDEBAR.transition.mode = false;
            } else {
                SIDEBAR.transition.end = stateManager.getStateByID($(this).attr('state-id'));
                historyManager.onNewCommand(new CreateTransitionCommand({
                    start: SIDEBAR.transition.start,
                    end: SIDEBAR.transition.end
                }));
                SIDEBAR.saveInputs();
            }

            SIDEBAR.createInputs();
            event.stopPropagation();
        } else {
            SIDEBAR.currentTool = 'New State';
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
                SIDEBAR.setCurrentTool("New State");
                SIDEBAR.showInputs();
            }
        }
    })
}


DRAGDROP.loadTransitionDrag = function() {
    $(".transition").draggable({
        cursor: "move",
        stack: "#editor-divs div",
        distance: 10,
        revert: "invalid",
        containment: "parent"
    });
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