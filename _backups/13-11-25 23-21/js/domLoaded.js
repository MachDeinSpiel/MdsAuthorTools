var onLoadListener = [];
var onResizeListener = [];

function resizeCanvas() {
	var canvas = document.getElementById('canvas');
		statesWrapper = document.getElementById('states');
		sideToolBar = document.getElementById('side-tool-bar');
		fsmTools = document.getElementById('fsm-tool');		
		popUp = document.getElementById('workspace-popup');
		popUpContent = document.getElementById('workspace-popup-content');
		// canvas
	canvas.width = window.innerWidth-50-5;
	canvas.height = window.innerHeight-50-5;
		// states
	statesWrapper.style.width = window.innerWidth-50-5 + 'px';
	statesWrapper.style.height = window.innerHeight-50.5 + 'px';
	sideToolBar.style.height = fsmTools.style.height = window.innerHeight-50 + 'px';
		// Popup
	popUp.style.width = window.innerWidth-50-5 + 'px';
	popUp.style.height = window.innerHeight-50.5 + 'px';

	popUp.onclick = function(event){
		popUp.style.display = "none";
	}

	popUpContent.onclick = function(event){
		console.log("bla");
		//event nicht weiterreichen.
		event.stopPropagation();
	}
}


function registerOnLoadListener(listener){
	onLoadListener.push(listener);
}


function registerOnResizeListener(listener){
	onResizeListener.push(listener);
}

window.onload =  function(){
	onLoadListener.forEach(function(listener){
		listener();
	});
}
window.onresize =  function(){
	onResizeListener.forEach(function(listener){
		listener();
	});
}

registerOnLoadListener(resizeCanvas);
registerOnResizeListener(resizeCanvas);

function showPopUp(callback){	
	popUp.style.display = "block";
	popUpContent.style.display = "block";
	var result;
	if(typeof(callback) === "function"){
		result = callback();
	}
	return result;
}

