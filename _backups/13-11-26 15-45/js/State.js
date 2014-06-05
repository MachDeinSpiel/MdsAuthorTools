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
	this.startLinks = [];
	this.endLinks = [];


	//Breite ausmessen
	var temp = document.createElement('div');
	temp.style.fontFamily = 'sans-serif';
	temp.style.fontSize = '14px';
	temp.style.display = 'inline-block';
	temp.innerHTML = title;
	document.body.appendChild(temp);
	this.width = temp.offsetWidth + 40;
	console.log(temp.offsetWidth);
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
		e.dataTransfer.setData("text/plain", 'state_drag');
		scope.domElement.style.opacity = 0.5;

		console.log(scope.dragX);
	}
	registerDropListener('state_drag',function(e){
		scope.domElement.style.opacity = 1;
		scope.x =   e.pageX - scope.domElement.parentNode.getBoundingClientRect().left + scope.dragX;
		scope.y =   e.pageY - scope.domElement.parentNode.getBoundingClientRect().top  + scope.dragY;
		console.log(scope.x);
		console.log('scopeY:'+scope.y);
		scope.domElement.style.left = scope.x + 'px';
		scope.domElement.style.top = scope.y + 'px';
	});

}

State.prototype.createSubstate = function() {

}

State.prototype.resize = function(width, height) {

	this.width = width;
	this.height = height;
	this.domElement.width = width + 'px';
	this.domElement.height = height + 'px';
	
}