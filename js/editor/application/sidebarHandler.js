SIDEBAR = window.SIDEBAR || {};



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
		'path': ''
	},
	'New Link': {
		'class': 'toolbox-item tooldrag',
		'path': ''
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
			})
		);
	});
}


SIDEBAR.showInputs = function(data) {

	if (data == undefined) {
		SIDEBAR.createInputs();
	} else {
		// $("#inputs-wrapper").append(SIDEBAR.createInputs());
	}
	SIDEBAR.slideInInputs();
}

SIDEBAR.saveInputs = function() {
	//TODO: SAVEN

	SIDEBAR.slideOutInputs();
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
	dom.append($("<input type='text' name='state-name' placeholder='State Name' autofocus>"));
	dom.append($("<input type='text' name='state-action' placeholder='State Action' autofocus>"));
	dom.append($("<form>")
		.append($("<input type='radio' name='state-type' value='State'><label>State </label> <br>"))
		.append($("<input type='radio' name='state-type' value='Start State'><label>Start State </label><br>"))
		.append($("<input type='radio' name='state-type' value='End State'><label>End State </label><br>"))
	);

	dom.append($("<button name='save' >Save</button>").on('click', function() {
		SIDEBAR.saveInputs();
	}));
	return dom;
}

SIDEBAR.showTools();
DRAGDROP.LoadToolDrag();