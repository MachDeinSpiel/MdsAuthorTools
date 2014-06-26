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

	//set window in the right width
	$("#editor-workspace").css("width", $("#editor-state-machine").width() - 300);
	CANVAS.init();

	$(window).on('resize', function() {
		$("#editor-workspace").css("width", $("#editor-state-machine").width() - 300);
		CANVAS.windowUpdate();
	});
});