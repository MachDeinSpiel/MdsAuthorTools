
var dropListener = [];

function registerDropListener(key, callback){
	dropListener[key] = callback;
}


dropZone = document.getElementById('workspace');

dropZone.ondragover = function(event){
	event.dataTransfer.dropEffect = 'move';
	event.preventDefault();
}

dropZone.ondrop = function(event){
	if (event.stopPropagation) {
		event.stopPropagation();
	}	
	event.preventDefault();
	var data = event.dataTransfer.getData('text/plain');
	
	/*switch(data){
		case 'tool-newbox': showPopUp();
							break;
	}*/
	if(dropListener[data]){
		dropListener[data](event);
	}
}