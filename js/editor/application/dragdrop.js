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
            $(this).attr('noclick',1);
        },
        drag: function() {
           
        },
        stop: function() {
            SIDEBAR.setState(stateManager.getStateByID($(this).attr('state-id')));
            var temp = {};
            temp.x = parseInt(this.style.left);
            temp.y = parseInt(this.style.top);
            SIDEBAR.currentState.update(temp);
            if(SIDEBAR.currentState.isChanged){
                console.log("change");
                historyManager.onNewCommand(new UpdateStateCommand(SIDEBAR.currentState, stateManager.getStateByID($(this).attr('state-id')).getClone()));
            }
            
          
            // deltaX = parseInt(this.style.left) - startX;
            // deltaY = parseInt(this.style.top) - startY;

        }
    })

    $(".state").unbind("click").on('click', function(event) {
        console.info('clicked on state');
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
            SIDEBAR.setCurrentTool('New State');
            if ($(this).attr('noclick') == 1) {
                $(this).removeAttr('noclick');
            } else {
                /*SIDEBAR.currentTool = 'New State';*/
                var cl = $(this).attr("class").split(' ')[0];
                if (cl === 'state') {
                    /**
                     * Current State setzen
                     */
                    
                    SIDEBAR.setState(stateManager.getStateByID($(this).attr('state-id')));
                    SIDEBAR.showInputs();
                    //dont propagete event to the parent
                 
                }    
            }
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
    $(".transition").unbind('click').on('click', function(){
        SIDEBAR.setCurrentTool('Edit Link');
        SIDEBAR.setTransition(stateManager.getTransitionById($(this).attr('transition-id')));
        SIDEBAR.showInputs();
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