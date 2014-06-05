
var cursorModes = ['std','lnk','mve','msl'];

var cursorMode = cursorModes[0];


var toolNewbox = document.getElementById("tool-newbox");
toolNewbox.draggable = true;
toolNewbox.ondragstart = function(event){
		cursorMode = cursorModes[0];
		workspace.style.cursor = 'default';
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData("text", event.target.getAttribute('id'));
		registerDropListener('tool-newbox', function(event){
												var newBox;
												var layoutJSON = JSON.stringify({preset: "state"});
												showPopUp(layoutJSON, function(jsonData){
													// console.error('NEWBOX - callback in "showPopUp"');
													// console.log(jsonData);
													var data = JSON.parse(jsonData);
													var x = event.pageX - statesWrapper.getBoundingClientRect().left;
													var y = event.pageY - statesWrapper.parentNode.getBoundingClientRect().top;
													newBox = stateManager.createState(data.name,x,y,100,100,jsonData);
												});
											});
		return true;
}

var toolLink = document.getElementById('tool-link');
toolLink.draggable = false;
toolLink.onclick = function(event){
	if(cursorMode == 'std'){
		toolLink.style.opacity = "1";
		cursorMode = cursorModes[1];
		workspace.style.cursor = 'url(css/pics/cursor/link1.png), ne-resize';
		//workspace.style.cursor = 'ne-resize';
	} else {
		stateManager.inkState = null;
		toolLink.style.opacity = "0.5";
		cursorMode = cursorModes[0];
		workspace.style.cursor = 'default';
	}

}

document.addEventListener('keydown',function(event){
	if(event.keyCode === 27){
		cursorMode = cursorModes[0];
		stateManager.inkState = null;
		toolLink.style.opacity = "0.5";
		cursorMode = cursorModes[0];
		workspace.style.cursor = 'default';
	}
});


