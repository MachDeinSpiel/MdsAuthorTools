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
	SIDEBAR.currentState = state;
}


SIDEBAR.showInputs = function() {
	if (SIDEBAR.currentState.id == undefined) {
		SIDEBAR.createInputs();
	} else {
		try {

			SIDEBAR.createInputs();

		} catch (e) {
			console.error(e.msg);
			return;
		}
		SIDEBAR.slideInInputs();
	}
}

SIDEBAR.saveInputs = function() {
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


	}
	if (SIDEBAR.currentTool === 'New State') {
		dom.append($("<input type='text' name='state-name' placeholder='State Name' autofocus value='" + SIDEBAR.currentState.name + "' />"));
		dom.append($("<input type='text' name='state-action' placeholder='State Action' autofocus />"));
		dom.append($("<form>")
			.append($("<input type='radio' name='state-type' value='State'><label>State </label> <br>"))
			.append($("<input type='radio' name='state-type' value='Start State'><label>Start State </label><br>"))
			.append($("<input type='radio' name='state-type' value='End State'><label>End State </label><br>"))
		);
		dom.append($("<button name='save' >Save</button>").on('click', function() {
			SIDEBAR.saveInputs();
		}));
		return
	}


}


SIDEBAR.setCurrentTool = function(tool) {
	SIDEBAR.currentTool = tool;
	console.error(tool);
}