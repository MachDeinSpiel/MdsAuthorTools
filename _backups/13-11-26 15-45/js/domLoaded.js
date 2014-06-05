var onLoadListener = [];
var onResizeListener = [];

function resizeCanvas() {
	var canvas = document.getElementById('canvas');
		statesWrapper = document.getElementById('states');
		workspace = document.getElementById('workspace');
		sideToolBar = document.getElementById('side-tool-bar');
		fsmTools = document.getElementById('fsm-tool');		
		popUp = document.getElementById('workspace-popup');
		popUpContent = document.getElementById('workspace-popup-content');
		stateManager = new StateManager();
		// canvas
	canvas.width = window.innerWidth-50-5;
	canvas.height = window.innerHeight-50-5;
		// states
	statesWrapper.style.width = window.innerWidth-50-5 + 'px';
	statesWrapper.style.height = window.innerHeight-50.5 + 'px';	
	workspace.style.width = window.innerWidth-50-5 + 'px';
	workspace.style.height = window.innerHeight-50.5 + 'px';
	sideToolBar.style.height = fsmTools.style.height = window.innerHeight-50 + 'px';
		// Popup
	popUp.style.width = window.innerWidth-50-5 + 'px';
	popUp.style.height = window.innerHeight-50.5 + 'px';

	popUp.onclick = function(event){
		//popUp.style.display = "none";
	}

	popUpContent.onclick = function(event){
		//console.log("bla");
		//event nicht weiterreichen.
		//event.stopPropagation();
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


/**
 * Aussehen des LayoutJSON:
 * 	{
 * 		preset: "none"
 *		title: "title",
 *		subtitle: "subtitle",
 *		fields: [
 *					{
 *						name: "name",
 *						type: "number"/"string"/"location"/"date"
 *					}
 *				]
 * 	}
 *
 * 	oder als preset:
 *
 * 	{
 *		preset: "state"
 * 	}
 *
 * 	bzw
 *
 * 	{
 *		preset: "link"
 * 	}
 *
 */
function showPopUp(layoutJSON, callback){	
	if(typeof(callback) !== 'function'){
		console.error("[showPopUp]callback is no function!")
		return;
	}
	var popupWidth = 500;
	var popupHeight = 300;
	var layout = JSON.parse(layoutJSON);
	console.log(layout.preset);
	if(layout.preset === 'state'){
		popupHeight = 600;
		popUpContent.innerHTML = '';
		var titleEle = document.createElement('div');
		titleEle.innerHTML = 'Neuer Zustand';
		titleEle.className = 'popup-title';
		popUpContent.appendChild(titleEle);

		var nameField = document.createElement('input');
		nameField.className = 'popup-input-big';
		nameField.placeholder = 'ZustandsName';
		popUpContent.appendChild(nameField);

		//Eingangsaktionen

		var inActionContainer = document.createElement('div');
		inActionContainer.className = 'popup-container';
		inActionContainer.style.height = '64px';

		var inActionContainerTitle = document.createElement('div');
		inActionContainerTitle.innerHTML = 'Eingangsaktionen';
		inActionContainerTitle.className = 'popup-container-title';
		inActionContainer.appendChild(inActionContainerTitle);

		var inActions = document.createElement('div');
		inActions.style.maxHeight = '200px';
		inActions.style.overflowY = 'auto';
		inActionContainer.appendChild(inActions);

		var newInAction = document.createElement('div');
		newInAction.className = 'popup-new-action';

		var newInActionType = document.createElement('select');
		newInActionType.innerHTML = '<option>Vibriere</option><option>Zeige Karte</option><option>Spiele Audio</option><option>Sende Nachricht an Spieler</option>';
		newInAction.appendChild(newInActionType);

		var newInActionButton = document.createElement('input');
		newInActionButton.className = 'popup-button';
		newInActionButton.value = '+';
		newInActionButton.type = 'button';
		newInAction.appendChild(newInActionButton);
		newInActionButton.onclick = function(e){
			console.log('newAction');
			var newAction = document.createElement('div');
			newAction.className = 'popup-action';
			newAction.innerHTML = newInActionType.value;
			inActions.appendChild(newAction);
			console.log('test'+inActionContainer.style.height);
			if(parseInt(inActionContainer.style.height) + parseInt(outActionContainer.style.height) < 400){
				inActionContainer.style.height = parseInt(inActionContainer.style.height) + 32 + 'px';
			}
		}
		inActionContainer.appendChild(newInAction);

		popUpContent.appendChild(inActionContainer);

		//Ausgangsaktionen

		var outActionContainer = document.createElement('div');
		outActionContainer.className = 'popup-container';
		outActionContainer.style.height = '64px';

		var outActionContainerTitle = document.createElement('div');
		outActionContainerTitle.innerHTML = 'Ausgangsaktionen';
		outActionContainerTitle.className = 'popup-container-title';
		outActionContainer.appendChild(outActionContainerTitle);

		var outActions = document.createElement('div');
		outActions.style.maxHeight = '200px';
		outActions.style.overflowY = 'auto';
		outActionContainer.appendChild(outActions);

		var newoutAction = document.createElement('div');
		newoutAction.className = 'popup-new-action';

		var newoutActionType = document.createElement('select');
		newoutActionType.innerHTML = '<option>Vibriere</option><option>Zeige Karte</option><option>Spiele Audio</option><option>Sende Nachricht an Spieler</option>';
		newoutAction.appendChild(newoutActionType);

		var newoutActionButton = document.createElement('input');
		newoutActionButton.value = '+';
		newoutActionButton.type = 'button';
		newoutActionButton.className = 'popup-button';
		newoutAction.appendChild(newoutActionButton);
		newoutActionButton.onclick = function(e){
			console.log('newAction');
			var newAction = document.createElement('div');
			newAction.className = 'popup-action';
			newAction.innerHTML = newoutActionType.value;
			outActions.appendChild(newAction);
			console.log('test'+outActionContainer.style.height);
			if(parseInt(inActionContainer.style.height) + parseInt(outActionContainer.style.height) < 400){
				outActionContainer.style.height = parseInt(outActionContainer.style.height) + 32 + 'px';
			}
		}
		outActionContainer.appendChild(newoutAction);

		popUpContent.appendChild(outActionContainer);

		var submitButton = document.createElement('input');
		submitButton.className = 'popup-button popup-at-bottom';
		submitButton.type = 'button';
		submitButton.value = 'hinzufügen';
		submitButton.onclick = function(e){
			var data = {};
			data.name = nameField.value;
			data.inActions = [];
			var nodes = inActions.childNodes;
			for(var i=0; i< nodes.length; i++){
				data.inActions.push({type: nodes[i].innerHTML});
			}
				
			data.outActions = [];
			nodes = outActions.childNodes;
			for(var i=0; i< nodes.length; i++){
				data.outActions.push({type: nodes[i].innerHTML});
			}
			callback(JSON.stringify(data));
			closePopUp();
		}
		popUpContent.appendChild(submitButton);

		var closeButton = document.createElement('input');
		closeButton.className = 'popup-close';
		closeButton.type = 'button';
		closeButton.value = 'abbrechen';
		closeButton.onclick = function(e){
			closePopUp();
		}
		popUpContent.appendChild(closeButton);
	}
	
	popUp.style.display = "block";
	popUp.style.opacity = "0";
	popUpContent.style.display = "block";
	popUpContent.style.width = '0px';
	popUpContent.style.height = '0px';
	popUpContent.style.marginLeft = '0px';
	popUpContent.style.marginTop = '0px';

	//animieren (mit 100 ms Verzögerung, da sonst nicht ausgeführt)
	setTimeout(function(){
		popUp.style.opacity = "0.8";
		popUpContent.style.width = popupWidth + 'px';
		popUpContent.style.height = popupHeight + 'px';
		popUpContent.style.marginLeft = -(popupWidth/2) + 'px';
		popUpContent.style.marginTop = -(popupHeight/2) + 'px';
	},100);

	//scrollen nach Animation wieder aktivieren
	// setTimeout(function(){
	// 	popUpContent.style.overflowY = 'auto';
	// },1000);
	


}

function closePopUp(){
	//popUpContent.style.overflowY = 'hidden';
	popUp.style.opacity = "0";
	popUpContent.style.width = '0px';
	popUpContent.style.height = '0px';
	popUpContent.style.marginLeft = '0px';
	popUpContent.style.marginTop = '0px';

	setTimeout(function(){
		popUpContent.innerHTML = '';
		popUp.style.display = "block";
		popUpContent.style.display = "block";
	},500);
}

