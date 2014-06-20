[].forEach.call(
	document.querySelectorAll('.input-wrapper input'),
	function(item) {
		var label = item.parentNode.querySelector('.label');
		label.innerHTML = item.getAttribute('placeholder');
		item.addEventListener('keyup', function() {
			if (this.value === '') {
				label.style.opacity = "0";
			} else {
				label.style.opacity = "1";
			}
		});
	});


[].forEach.call(
	document.querySelectorAll('#window-menu li'),
	function(item) {
		$(item).on('click', function(){
			MENU.execute($(item).attr('data-command'));
		});
	});

MENU = {};

MENU.execute = function(what){
	switch(what){
		case 'undo': historyManager.undo();
				break;
		case 'redo': historyManager.redo();
				break;
	}
}