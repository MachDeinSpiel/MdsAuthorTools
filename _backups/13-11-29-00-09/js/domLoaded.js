var onResizeListener = [],
	onLoadListener = [],
	canvas,
	statesWrapper,
	workspace,
	sideToolBar,
	fsmTools,
	popUp,
	popUpContent,
	stateManager,
	dragData;

function findDomElements(){
	canvas = document.getElementById('canvas');
	statesWrapper = document.getElementById('states');
	workspace = document.getElementById('workspace');
	sideToolBar = document.getElementById('side-tool-bar');
	fsmTools = document.getElementById('fsm-tool');		
	popUp = document.getElementById('workspace-popup');
	popUpContent = document.getElementById('workspace-popup-content');
	stateManager = new StateManager();
	
}
registerOnLoadListener(findDomElements);
function resizeCanvas() {
	
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
		// console.log("bla");
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
		// console.error("[showPopUp]callback is no function!")
		return;
	}
	var popupWidth = 500;
	var popupHeight = 600;
	var layout = JSON.parse(layoutJSON);
	// console.log(layout.preset);
	var closeButton = document.getElementById('workspace-popup-close-button');
	closeButton.onclick = function(e){
		closePopUp();
	}
	if(layout.preset === 'state'){
		document.getElementById('workspace-popup-title').innerHTML = 'Neuer Zustand';
		var wrapper = document.getElementById('workspace-popup-content-newstate');
		var closeButton = document.getElementById('workspace-popup-close-button');
		var submitButton = document.getElementById('workspace-popup-save-button');
		var nameField = document.getElementById('workspace-popup-content-newstate-input-title');
		var inActions = document.getElementById('workspace-popup-content-newstate-inaction-action-wrapper');
		var outActions = document.getElementById('workspace-popup-content-newstate-outaction-action-wrapper');
		var inActionContainer = document.getElementById('workspace-popup-content-newstate-inaction-container');
		var outActionContainer = document.getElementById('workspace-popup-content-newstate-outaction-container');
		var newInActionButton = document.getElementById('workspace-popup-content-newstate-inaction-action-new-button');
		var newOutActionButton = document.getElementById('workspace-popup-content-newstate-outaction-action-new-button');
		var newInActionType = document.getElementById('workspace-popup-content-newstate-inaction-action-new-type');
		var newOutActionType = document.getElementById('workspace-popup-content-newstate-outaction-action-new-type');

		wrapper.style.display = 'block';
		inActions.innerHTML = '';
		outActions.innerHTML = '';
		nameField.value = '';
		inActionContainer.style.height = '64px';
		outActionContainer.style.height = '64px';

		nameField.onclick = function(e){
			this.style.border = 'none';
		}


		newInActionButton.onclick = function(e){
			var newAction = document.createElement('div');
			newAction.className = 'popup-action';
			newAction.innerHTML = newInActionType.value;
			inActions.appendChild(newAction);
			if(parseInt(inActionContainer.offsetHeight) + parseInt(outActionContainer.offsetHeight) < 400){
				inActionContainer.style.height = parseInt(inActionContainer.style.height) + 20 + 'px';
			}
		}

		newOutActionButton.onclick = function(e){
			var newAction = document.createElement('div');
			newAction.className = 'popup-action';
			newAction.innerHTML = newOutActionType.value;
			outActions.appendChild(newAction);
			if(parseInt(inActionContainer.style.height) + parseInt(outActionContainer.style.height) < 400){
				outActionContainer.style.height = parseInt(outActionContainer.style.height) + 20 + 'px';
			}
		}

		submitButton.onclick = function(e){
			if(nameField.value.replace(/\s/g, '') === ""){
				nameField.style.border = '2px solid #f73b54';
				return;
			}
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
			wrapper.style.display = 'none';
			closePopUp();
		}

		closeButton.onclick = function(e){
			wrapper.style.display = 'none';
			closePopUp();
		}

	}
	
	if(layout.preset === 'link'){
		var submitButton = document.getElementById('workspace-popup-save-button');
		var closeButton = document.getElementById('workspace-popup-close-button');
		var wrapper = document.getElementById('workspace-popup-content-newlink');
		document.getElementById('workspace-popup-title').innerHTML = 'Neuer Übergang';
		document.getElementById('workspace-popup-content-newlink-from').innerHTML = 'zwischen '+layout.state1+' und '+layout.state2;
		wrapper.style.display = 'block';

		submitButton.onclick = function(e){
			var data = {};
			data.title = document.getElementById('workspace-popup-content-newlink-type').value;
			callback(JSON.stringify(data));
			wrapper.style.display = 'none';
			closePopUp();
		}
		closeButton.onclick = function(e){
			wrapper.style.display = 'none';
			closePopUp();
		}
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
		popUp.style.display = "none";
		popUpContent.style.display = "none";
	},500);
}

