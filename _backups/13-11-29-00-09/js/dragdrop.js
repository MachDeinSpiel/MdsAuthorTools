
var dropListener = [];
var dragOverListener = [];
var ctrlPressed = false;



document.onkeydown = function(event){
	ctrlPressed = true;
}

document.onkeyup = function(event){
	ctrlPressed = false;
}

function registerDropListener(key, callback){
	dropListener[key] = callback;
}

function registerDragOverListener(key, callback){
	dragOverListener[key] = callback;
}


workspace = document.getElementById('workspace');
bin = document.getElementById('workspace-bin');


workspace.ondragover = function(event){
	event.dataTransfer.dropEffect = 'move';
	event.preventDefault();
	// console.log(event);
	var data = event.dataTransfer.getData('text');
	// console.log('ondragover '+dragData );
	if(dragOverListener[dragData]){
		dragOverListener[dragData](event);
	}
	
}

workspace.ondrop = function(event){
	if(ctrlPressed){
		var copyState = true;
		var newBox;
		var layoutJSON = JSON.stringify({preset: "state"});
		showPopUp(layoutJSON, function(jsonData){
												var data = JSON.parse(jsonData);
												var x = event.pageX - statesWrapper.getBoundingClientRect().left;
												var y = event.pageY - statesWrapper.parentNode.getBoundingClientRect().top;
												newBox = stateManager.createState(data.name,x,y,100,100,jsonData);
											});
		return;
	}
	if(copyState){
		copyState = false;
		return;
	}
	if (event.stopPropagation) {
		event.stopPropagation();
	}	

	switchBin(false);
	event.preventDefault();
	var data = event.dataTransfer.getData('text');
	dragData = null;
	// console.log('ondrop '+data );
	
	/*switch(data){
		case 'tool-newbox': showPopUp();
							break;
	}*/


	if(dropListener[data]){
		dropListener[data](event);
	}
}



bin.ondragover = function(event){
	event.preventDefault();
	bin.style.backgroundPosition = '0 -128px';
	event.dataTransfer.dropEffect = 'move';
}

bin.ondrop = function(event){
	if (event.stopPropagation) {
		event.stopPropagation();
	}	
	switchBin(false);
	event.preventDefault();
	var data = event.dataTransfer.getData('text');

	stateManager.deleteState(event.dataTransfer.getData('text'));
	bin.style.backgroundPosition = '0 -256px';
}


bin.ondragleave = function(event){
	bin.style.backgroundPosition = '0px 0px';
}