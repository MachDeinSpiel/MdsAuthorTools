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
	'New State': {'class':'toolbox-item tooldrag', 'path' : ''},
	'New Link': {'class':'toolbox-item tooldrag', 'path' : ''},
	'Move': {'class':'toolbox-item', 'path' : ''}
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

SIDEBAR.showTools();
DRAGDROP.LoadToolDrag();