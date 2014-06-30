var stateManager,
	historyManager,
	presetManager,
	groupEditor;

$(window).load(function() {

	//init();
	//showLogin(function(){
		init();
	//});
});

function init(){
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

	// $("#editor-divs").on('click', function() {
	// 	SIDEBAR.saveInputs();
	// });

	//set window in the right width
	$("#editor-workspace").css("width", $("#editor-state-machine").width() - 300);
	CANVAS.init();

	$(window).on('resize', function() {
		$("#editor-workspace").css("width", $("#editor-state-machine").width() - 300);
		CANVAS.windowUpdate();
	});

	presetManager = new PresetManager("assets/json/presets.json");
	groupEditor = new GroupEditor();
}