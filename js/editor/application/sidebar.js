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
		'path': '',
		'func': function() {
			SIDEBAR.setCurrentTool('New State');
			SIDEBAR.slideOutInputs();
			SIDEBAR.slideInInputs();
		}
	},
	'New Link': {
		'class': 'toolbox-item',
		'path': '',
		'func': function() {
			SIDEBAR.setCurrentTool('New Link');
			SIDEBAR.slideOutInputs();
			SIDEBAR.slideInInputs();
		}
	},
	'Move': {
		'class': 'toolbox-item',
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
			$("<div></div>", {
				"class": value.class,
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
	SIDEBAR.saveInputs();
	SIDEBAR.currentState = state.getClone();
}


SIDEBAR.showInputs = function() {
	if (SIDEBAR.currentState.id == undefined) {
		SIDEBAR.createInputs();
	} else {
		try {
			SIDEBAR.createInputs();
		} catch (e) {
			console.error(e);
			return;
		}
		SIDEBAR.slideInInputs();
	}
}

SIDEBAR.saveInputs = function() {
	if(SIDEBAR.currentTool != null){
		if (SIDEBAR.currentTool === 'New State') {
			if (!!SIDEBAR.currentState) {
				var name = $("input[name='state-name']").val();
				SIDEBAR.currentState.name = name;
				SIDEBAR.currentState.validate();
			}
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

SIDEBAR.slideInInputs = function() {
	SIDEBAR.createInputs();
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
		dom.html('Choos two states!');
		if (SIDEBAR.transition.start != null) {
			dom.html('Choos <b>another</b> states!');
			dom.append($("<p>" + SIDEBAR.transition.start.name + "</p>"));
		}

		if (SIDEBAR.transition.end != null) {
			dom.html('Setted both states!');
			dom.append($("<button name='save' >Save</button>").on('click', function() {
				SIDEBAR.saveInputs();
			}));
		}

	if(SIDEBAR.currentTool === 'Edit Link'){
		dom.html('TODO!');
	}


	}
	if (SIDEBAR.currentTool === 'New State') {
		dom.append($("<input type='text' name='state-name' placeholder='State Name' autofocus value='" + SIDEBAR.currentState.name + "' />"));
		dom.append($("<input type='text' name='state-action' placeholder='State Action' autofocus />"));
		dom.append($("<form></form>")
			.append($("<label><input type='radio' name='state-type' value='State'>State </label> <br>"))
			.append($("<label><input type='radio' name='state-type' value='Start State'>Start State </label><br>"))
			.append($("<label><input type='radio' name='state-type' value='End State'>End State </label><br>"))
		);
		dom.append($("<button name='save' >Save</button>").on('click', function() {
			SIDEBAR.saveInputs();
		}));
		dom.append($('<div></div>')
			.append($('<h3>Start actions</h3>'))
			.append($('<div id="start-action-wrapper"></div>'))   
			.append($('<h3>Do actions</h3>'))
			.append($('<div id="do-action-wrapper"></div>'))   
			.append($('<h3>End actions</h3>'))
			.append($('<div id="end-action-wrapper"></div>'))   
			.append($('<div id="action-creator"></div>')
				.append($("<h4>New Action</h4>"))
				.append($("<label><input type='radio' name='action-type' value='start action' checked='checked'>Start action</label> <br>"))
				.append($("<label><input type='radio' name='action-type' value='do action'>Do action</label><br>"))
				.append($("<label><input type='radio' name='action-type' value='end action'>End action</label><br>"))
				.append($('<select id="action-selector"></select>').on('change', function(){
					var action = presetManager.getActions()[this.value];
					$('#action-inputs').html('');
					for(key in action.inputs){
						var input = action.inputs[key];
						$('#action-inputs').append('<label to="input-'+key+'" title="'+input.hint+'">'+key+'</label>');
						switch(input.type){
							case "NUMBER": 
								$('#action-inputs').append('<input type="number" id="input-'+key+' title="'+input.hint+'"/"><br />');
								break;
							case "STRING": 
								$('#action-inputs').append('<input type="text" id="input-'+key+' title="'+input.hint+'"/"><br />');
								break;
							case "URL": 
								$('#action-inputs').append('<input type="url" id="input-'+key+' title="'+input.hint+'"/"><br />');
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
				.append($('<input type="button" value="add" />'))
			)
		);
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