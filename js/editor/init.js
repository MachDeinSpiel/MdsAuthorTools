var stateManager,
	historyManager;

$(window).load(function() {

	stateManager = new StateManager();
	historyManager = new HistoryManager();


	SIDEBAR.showTools();
	DRAGDROP.LoadToolDrag();
	DRAGDROP.LoadStateDrag();

});