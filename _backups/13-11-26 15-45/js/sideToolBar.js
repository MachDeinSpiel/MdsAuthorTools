


var toolNewbox = document.getElementById("tool-newbox");
toolNewbox.draggable = true;
toolNewbox.ondragstart = function(event){
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		registerDropListener('tool-newbox', function(event){
												var newBox;
												var layoutJSON = JSON.stringify({preset: "state"});
												showPopUp(layoutJSON, function(jsonData){
													console.error('NEWBOX - callback in "showPopUp"');
													console.log(jsonData);
													var data = JSON.parse(jsonData);
													var x = event.pageX - statesWrapper.getBoundingClientRect().left;
													var y = event.pageY - statesWrapper.parentNode.getBoundingClientRect().top;
													newBox = stateManager.createState(data.name,x,y,100,100,jsonData);
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
												var layoutJSON = JSON.stringify({preset: "link"});
												showPopUp(layoutJSON, function(){
													console.error('LINK - callback in "showPopUp"');
												});
													//maybe some other stuff
											});
		return true;
}