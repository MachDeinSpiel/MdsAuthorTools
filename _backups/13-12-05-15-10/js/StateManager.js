// "class" StateManager
// Manages all changes
function StateManager() {

	this.states = [];
	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext('2d');
	this.linkState = null;
	this.selectedLink;
	var scope = this;
	statesWrapper.onmousemove = function(e){
		var x =   e.pageX - this.getBoundingClientRect().left;
		var y =   e.pageY - this.getBoundingClientRect().top;
		var link = scope.getLinkByPosition(x,y,10);	
		if(link !== scope.selectedLink){
			scope.setGlobalLinkStrokeStyle('#ffffff');
			if(link){
				link.strokeStyle = '#3a81fc';
			}
			scope.redrawLinks();
			scope.selectedLink = link;
		}
	}
		
	statesWrapper.onclick = function(e){
		if(scope.selectedLink){
			showPopUp(JSON.stringify({preset: 'link', from: scope.selectedLink.firstState.title, to: scope.selectedLink.secondState.title}), function(){});
			return;
		}
	}

	registerOnResizeListener(function(e){
		scope.redrawLinks();
	});
		
	

}




StateManager.prototype.changeZindex = function(obj){
	this.states.moveEnd(obj);
	for(var i = 0; i < this.states.length; i++){
		this.states[i].setZindex(i);
	}
}


StateManager.prototype.createState = function(title, x, y, width, height, JSONdata) {
	// calls the constructor of State
	var state = new State(title, x, y, 3, width, height, JSONdata);
	// in vorhandene States speichern
	this.states.push(state);
}

StateManager.prototype.deleteState = function(id) {
	// deletes the given State
	var i = 0;
	while(('state_drag'+ this.states[i].uniqueId) != id){
		i++;
	}
	this.states[i].destroy();
	this.states.splice(i,1);
	this.redrawLinks();

}


StateManager.prototype.linkStates = function(startState, endState) {
	var link;
	var layoutJSON = JSON.stringify({preset: "link", state1: startState.title, state2: endState.title});
	showPopUp(layoutJSON, function(jsonData){
		var data = JSON.parse(jsonData);
			link.setTitle(data.title);
	});
	link = new Link(startState, endState);
	link.updatePosition();
	// Pfeil zeichnen
	link.draw(this.context);
	// den States sagen, dass der Link bei ihnen ist
	startState.links.push(link);
	endState.links.push(link);

	return link;
}

StateManager.prototype.onStateClicked = function(state){
	if(cursorMode === 'lnk'){
		if(this.linkState === null){
			this.linkState = state;
			workspace.style.cursor = 'url(css/pics/cursor/link2.png), ne-resize';
		}else{
			var link = this.linkStates(this.linkState,state);
			workspace.style.cursor = 'url(css/pics/cursor/link1.png), ne-resize';
			this.linkState = null;
		}
	}
}

StateManager.prototype.onStateDrag = function(e,state){
	var scope = this;
	state.x =   e.pageX - state.domElement.parentNode.getBoundingClientRect().left + state.dragX;
	state.y =   e.pageY - state.domElement.parentNode.getBoundingClientRect().top  + state.dragY;
	if(state.y > window.innerHeight - 400){
		switchBin(true);
	}else{
		switchBin(false);
	}
	state.links.forEach(function(link){
		link.updatePosition();
	});	
	this.redrawLinks();
}

StateManager.prototype.getLinkByPosition = function(x,y,r){
	r = r ? r : 10;
	for(var i=0; i < this.states.length; i++){
		for(j=0; j < this.states[i].links.length; j++){
			var link = this.states[i].links[j];
			if(!((link.startX <= x && link.endX >= x) || (link.endX <= x && link.startX >= x) || (link.startY <= y && link.endY >= y) || (link.endY <= y && link.startY >= y))){
				continue;
			}
			var a = Math.abs((link.startX-link.endX) * (y-link.endY) - (x-link.endX)*(link.startY-link.endY));
			var l = Math.sqrt(Math.pow(link.startX-link.endX,2) + Math.pow(link.startY-link.endY,2));
			if(a/l < r){
				return link;
			}
		}
	}

}

StateManager.prototype.setGlobalLinkStrokeStyle = function(strokeStyle){
	this.states.forEach(function(state){
		state.links.forEach(function(link){
			link.strokeStyle = strokeStyle;
		});
	});
}

StateManager.prototype.redrawLinks = function(){
	var scope = this;
	this.context.clearRect(0,0,canvas.width, canvas.height);
	this.states.forEach(function(state){
		state.links.forEach(function(link){
			link.draw(scope.context);
		});
	});
}