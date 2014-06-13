var stateManager;

window.addEventListener('load', function() {


	console.error('onload');

	var files = [
		'js/editor/application/StateManager.js',
		'js/editor/application/topswitcher.js',
		'js/editor/application/menu.js',
		'js/editor/application/export.js',
		'js/editor/value-objects/State.js',
		'js/editor/application/commands/Command.js',
		'js/editor/dragndrop.js'
	];

	files.forEach(function(file){
		loadScript(file);
	});

	//TODO: Statemanager nicht global machen



	function loadScript(file) {
		var scr = document.createElement("script");
		scr.src = file;
		document.body.appendChild(scr);
	}
});