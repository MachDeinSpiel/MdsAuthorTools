


var toolNewbox = document.getElementById("tool-newbox");
toolNewbox.draggable = true;
toolNewbox.ondragstart = function(event){
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		registerDropListener('tool-newbox', function(event){
												var newBox;
												showPopUp(function(){
													console.error('NEWBOX - callback in "showPopUp"');
												});
											});
		return true;
}

var toolLink = document.getElementById('tool-link');
toolLink.draggable = true;
toolLink.ondragstart = function(event){
		console.log("LINK");
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		registerDropListener('tool-link', function(event){
												showPopUp(function(){
													console.error('LINK - callback in "showPopUp"');
												});
													//maybe some other stuff
											});
		return true;
}