// "Klasse" State
function State(title, x, y, zIndex, width, height, jsonData) {

	// Attribute
	this.title = title;
	this.x = x;
	this.y = y;
	this.zIndex = zIndex;
	this.width = width;
	this.height = height;
	this.subStates = [];
	this.links = [];
	this.uniqueId = (new Date().getTime());


	//Breite ausmessen
	var temp = document.createElement('div');
	temp.style.fontFamily = 'sans-serif';
	temp.style.fontSize = '14px';
	temp.style.display = 'inline-block';
	temp.innerHTML = title;
	document.body.appendChild(temp);
	this.width = temp.offsetWidth + 40;
	// console.log(temp.offsetWidth);
	temp.parentNode.removeChild(temp);


	this.domElement = document.createElement('div');
	this.domElement.className = 'state';
	this.domElement.draggable = true;
	this.domElement.style.width = this.width + 'px';
	this.domElement.style.height = this.height + 'px';
	this.domElement.style.zIndex = this.zIndex;
	this.domElement.style.left = this.x + 'px';
	this.domElement.style.top = this.y + 'px';

	this.domTitle = document.createElement('div');
	this.domTitle.className = 'state-title';
	this.domTitle.innerHTML = this.title;

	this.domContent = document.createElement('div');

	if(jsonData){
		var str = '<b>Eingangsaktionen:</b><br/>';
		var data = JSON.parse(jsonData);
		data.inActions.forEach(function(action){
			str += '-'+action.type+'<br/>'
		});
		str += '<br/><b>Ausgangsaktionen:</b><br/>';
		data.outActions.forEach(function(action){
			str += '-'+action.type+'<br/>'
		});
		this.domContent.innerHTML = str;
	}
	

	//Zusammenfügen
	this.domElement.appendChild(this.domTitle);
	this.domElement.appendChild(this.domContent);
	document.getElementById('states').appendChild(this.domElement);

	//Div zu klein für Inhalt?
	if(this.width < this.domContent.offsetWidth + 120){
		this.width = this.domContent.offsetWidth + 120;
		this.domElement.style.width = this.width + 'px';
	}
	if(this.height < this.domContent.offsetHeight + 40){
		this.height = this.domContent.offsetHeight + 40;
		this.domElement.style.height = this.height + 'px';
	}


	var scope = this;
	this.domElement.ondragstart = function(e){
		scope.dragX = scope.x - (e.clientX - scope.domElement.parentNode.getBoundingClientRect().left);
		scope.dragY = scope.y - (e.clientY - scope.domElement.parentNode.getBoundingClientRect().top);
		e.dataTransfer.setData("text", 'state_drag'+scope.uniqueId);
		scope.domElement.style.opacity = 0.5;
		stateManager.changeZindex(scope);
		dragData = 'state_drag'+scope.uniqueId;
	}
	registerDropListener('state_drag'+this.uniqueId,function(e){
		scope.domElement.style.opacity = 1;
		scope.x =   e.pageX - scope.domElement.parentNode.getBoundingClientRect().left + scope.dragX;
		scope.y =   e.pageY - scope.domElement.parentNode.getBoundingClientRect().top  + scope.dragY;
		scope.domElement.style.left = scope.x + 'px';
		scope.domElement.style.top = scope.y + 'px';
	});

	//Old method, seems to not work in firefox (pageX /clientX allways 0) :(
	/*this.domElement.ondrag = function(e){
		stateManager.onStateDrag(e,scope);
		console.log(e);

	}*/

	registerDragOverListener('state_drag'+this.uniqueId, function(e){
		stateManager.onStateDrag(e,scope);
	});


	this.domElement.onclick = function(e){
		stateManager.onStateClicked(scope);
	}
}

State.prototype.createSubstate = function() {

}

State.prototype.setZindex = function(zindex){
	this.zindex = zindex;
	this.domElement.style.zIndex = zindex;
}

State.prototype.resize = function(width, height) {

	this.width = width;
	this.height = height;
	this.domElement.width = width + 'px';
	this.domElement.height = height + 'px';
	
}

State.prototype.destroy = function(){
	var scope = this;
	this.domElement.parentNode.removeChild(this.domElement);
	this.uniqueId = undefined;
	this.links.forEach(function(link){
		link.disc.parentNode.removeChild(link.disc);
		var otherState;
		if(link.firstState !== scope){
			otherState = link.firstState;
		}else{
			otherState = link.secondState;
		}
		var id = otherState.links.indexOf(link);
		if (id > -1) {
		    otherState.links.splice(id, 1);
		}
	});
	this.links = undefined;
}