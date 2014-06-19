var stateManager,
	historyManager;

$(window).load(function() {

	stateManager = new StateManager();
	historyManager = new HistoryManager();


	SIDEBAR.showTools();
	DRAGDROP.LoadToolDrag();
	DRAGDROP.LoadStateDrag();

	$("#editor-divs").droppable({
    drop: function(event, ui) {
        ui.helper.data('dropped', true);
    }
	});

	$("#editor-divs").on('click', function() {
	    SIDEBAR.saveInputs();
	});

});