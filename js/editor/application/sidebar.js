SIDEBAR = window.SIDEBAR || {};

/** @type {STATE} [The Actual State is stored here] */
SIDEBAR.currentState = false;
SIDEBAR.currentTool = null;

SIDEBAR.transition = {
	start: null,
	end: null,
	mode: true
};

/**
 * [tools description]
 *
 * Draggable
 *	'ITEMNAME': {'class':'toolbox-item tooldrag', 'path' : ''},
 * Undraggable
 *	'ITEMNAME': {'class':'toolbox-item', 'path' : ''},
 *
 *
 * @type {Array}
 */
SIDEBAR.tools = {
	'New State': {
		'class': 'toolbox-item tooldrag',
		'id': 'tool-newstate',
		'path': '',
		'func': function() {
			SIDEBAR.setCurrentTool('New State');
			SIDEBAR.slideOutInputs();
			SIDEBAR.showInputs();
		}
	},
	'New Link': {
		'class': 'toolbox-item',
		'id': 'tool-newlink',
		'path': '',
		'func': function() {
			SIDEBAR.setCurrentTool('New Link');
			SIDEBAR.slideOutInputs();
			SIDEBAR.showInputs();
		}
	},
	'Move': {
		'class': 'toolbox-item',
		'id': 'tool-move',
		'path': ''
	}
};

/**
 * Displays the Sidebar
 * @return {[type]} [description]
 */
SIDEBAR.showTools = function() {
	$.each(SIDEBAR.tools, function(index, value) {
		$('#tools-wrapper').append(
			$("<div id='"+value.id+"' class='"+value.class+"'></div>", {
				text: index
			}).on('click', function() {
				if (value.func) {
					value.func();
				}
			})
		);
	});
}

/** Saves old state and set new one */
SIDEBAR.setState = function(state) {
	// SIDEBAR.saveInputs();
	SIDEBAR.currentState = state.getClone();
}




SIDEBAR.saveInputs = function() {
	if(SIDEBAR.currentTool != null){
		var temp = {};
		temp.name = $("input[name='state-name']").val();
		temp.type = $("input[name='state-type']:checked").val();

		SIDEBAR.currentState.update(temp);

		if(SIDEBAR.currentState.isChanged){
			historyManager.onNewCommand(new UpdateStateCommand(SIDEBAR.currentState, 
				stateManager.getStateByID(SIDEBAR.currentState.id).getClone()));
			this.currentState.isChanged = false;
		}
		if (SIDEBAR.currentTool === 'New Link') {
			console.log('saved new link');
			SIDEBAR.transition.start = null;
			SIDEBAR.transition.end = null;
			SIDEBAR.transition.mode = true;
			SIDEBAR.setCurrentTool(null);
		}
	}
	SIDEBAR.slideOutInputs();
	//TODO: Rest speichern, Command erstellen
}

SIDEBAR.showInputs = function() {
	SIDEBAR.createInputs();
	SIDEBAR.slideInInputs();
}

SIDEBAR.slideInInputs = function() {

	$("#editor-side-inputs").css("left", 0);
	$("#editor-side-tools").css("left", -300);
}

SIDEBAR.slideOutInputs = function() {
	$("#editor-side-inputs").css("left", -300);
	$("#editor-side-tools").css("left", 0);
}

SIDEBAR.createInputs = function() {
	var dom = $("#inputs-wrapper").html('');

	if (SIDEBAR.currentTool === 'New Link') {
		dom.html('Choose two states!');
		if (SIDEBAR.transition.start != null) {
			dom.html('Choose <b>another</b> state!');
			dom.append($("<p>" + SIDEBAR.transition.start.name + "</p>"));
		}

		if (SIDEBAR.transition.end != null) {
			dom.append($("<button name='save' >Save</button>").on('click', function() {
				SIDEBAR.saveInputs();
			}));
			dom.html('Set both states!');
			
		}
	}

	if(SIDEBAR.currentTool === 'Edit Link'){
		dom.append($("<button style='position: relative;' name='save'>Save</button>").on('click', function() {
			SIDEBAR.saveInputs();
		}));
		var transitionDom = $("<div></div>").css({
			"position": "relative",
			"margin-top": "20px"
		});

		transitionDom.append('<label for="transition">Select a condition:</label>');
		var transSelect = $('<select name="transition"></select>');

		$.each(presetManager.getTransitions(),function(key, value){
			transSelect.append($('<option value="'+key+'">'+value.name+'</option>)'));
		});



		transSelect.appendTo(transitionDom);
		transitionDom.append($("<button style='position: relative;' name='save'>add</button>").on('click',function(){
			console.log(transSelect.val());	
		}));
		transitionDom.appendTo(dom);
	}
	
	if (SIDEBAR.currentTool === 'New State') {
		dom.append($("<button name='save' >Save</button>").on('click', function() {
			SIDEBAR.saveInputs();
		}));
		dom.append($("<input type='text' name='state-name' placeholder='State Name' autofocus value='" + SIDEBAR.currentState.name + "' />"));
		dom.append($("<form></form>")
			.append($("<label><input type='radio' name='state-type' value='' "+ (SIDEBAR.currentState.type == '' ? "checked='checked'" : '' )+">State </label>"))
			.append($("<label><input type='radio' name='state-type' value='start-state' "+ (SIDEBAR.currentState.type == 'start-state' ? "checked='checked'" : '' )+">Start State </label>"))
			.append($("<label><input type='radio' name='state-type' value='end-state' "+ (SIDEBAR.currentState.type == 'end-state' ? "checked='checked'" : '' )+">End State </label>"))
		);
		
		dom.append($('<div id="accordion"></div>')
			.append($('<h3>Start actions</h3>'))
			.append($('<div id="start-action-wrapper"></div>'))   
			.append($('<h3>Do actions</h3>'))
			.append($('<div id="do-action-wrapper"></div>'))
			.append($('<h3>End actions</h3>'))
			.append($('<div id="end-action-wrapper"></div>')));
		dom.append($('<div id="action-creator"></div>')
				.append($("<h4>New Action</h4>"))
				.append($("<label><input type='radio' name='action-type' value='start-action' checked='checked'>Start action</label> <br>"))
				.append($("<label><input type='radio' name='action-type' value='do-action'>Do action</label><br>"))
				.append($("<label><input type='radio' name='action-type' value='end-action'>End action</label><br>"))
				.append($('<select id="action-selector"></select>').on('change', function(){
					var action = presetManager.getActions()[this.value];
					$('#action-inputs').html('');
					for(key in action.inputs){
						var input = action.inputs[key];
						$('#action-inputs').append('<label to="input-'+key+'" title="'+input.hint+'">'+key+'</label>');
						switch(input.type){
							case "NUMBER": 
								$('#action-inputs').append('<input type="number" id="input-'+key+'" title="'+input.hint+'"/"><br />');
								break;
							case "STRING": 
								$('#action-inputs').append('<input type="text" id="input-'+key+'" title="'+input.hint+'"/"><br />');
								break;
							case "URL": 
								$('#action-inputs').append('<input type="url" id="input-'+key+'" title="'+input.hint+'"/"><br />');
								break;
							case "GROUP": 
								$('#action-inputs').append('<input type="text" id="input-'+key+'" value="todo" readonly/><br />');
								break;
							case "ATTRIBUTE": 
								$('#action-inputs').append('<input type="url" id="input-'+key+'" value="todo" readonly/><br />');
								break;
							case "SELECT": 
								if(!input.options){
									console.error("Error while reading options of input '"+key+"' of action '"+action.name+"'. Check your syntax!");
								}else{
									var selector = $('<select id="input-'+key+' " title="'+input.hint+'"></select><br />');
									for(var i=0; i<input.options.length; i++){
										for(optionname in input.options[i]){
											selector.append('<option value="'+input.options[i][optionname]+'">'+optionname+'</option>');
										}
									}
									$('#action-inputs').append(selector);
								}
								break;
						}
						
						
					}
				}))
				.append($('<div id="action-inputs"></div>'))
				.append($('<input type="button" value="add" />').on('click', function(){
					var action = presetManager.getActions()[$('#action-selector').val()];
					var type = $('input[name=action-type]:checked').val();
					$('#'+type+'-wrapper').append($('<div class="action-element"></div>')
										.append('<span>'+presetManager.getActions()[$('#action-selector').val()].name+'</span>')
									);
							

					var temp = SIDEBAR.currentState.getClone();
					var actionMap = {"start-action" : temp.startAction,
									 "do-action" : temp.doAction,
									 "end-action" : temp.endAction};

					jQuery('[id="accordion"]').accordion( "refresh" );
					var inputs = {};
					//copy input, insert data which was entered by user
					for(key in action.inputs){
						var input = {};
						input.type = action.inputs[key].type;
						input.hint = action.inputs[key].hint;
						//copy options if not undefined
						if(action.inputs[key].options != undefined){
							input.options = [];
							var inopts = action.inputs[key].options;
							for(var k =0; k<inopts.length; i++){
								var tempOpt = {};
								for(oKey in inopts){
									tempOpt[oKey] = inopts[oKey];
								}
								input.options.push(tempOpt);
							}
						}
						input.value = $('#input-'+key).val();
						inputs[key] = input;

					}
					var newAction = new Action(action.name, inputs, action.json);
					actionMap[type].push(newAction);
					SIDEBAR.currentState.update(temp);

					

				}))
			);
		
		console.log(jQuery('[id="accordion"]').accordion({ 
			
			animate: 100,
			collapsible: true,
			heightStyle: "auto"
		 }));
		
		for(var i=0; i<presetManager.getActions().length; i++){
			var action = presetManager.getActions()[i];
			var selected = (i==0) ? " selected" : "";
			$('#action-selector').append($('<option value="'+i+'"'+selected+'>'+action.name+'</option>'));
		}
		
		$("action-selector").change();
		return
	}
}


SIDEBAR.setCurrentTool = function(tool) {
	SIDEBAR.currentTool = tool;
}