window.addEventListener('load', function() {
	console.error('onload');

	var files = [
		'js/editor/application/StateManager.js',
		'js/editor/value-objects/State.js',
	];

	files.forEach(function(file){
		loadScript(file);
	});



	function loadScript(file) {
		var scr = document.createElement("script");
		scr.src = file;
		document.body.appendChild(scr);
	}
});