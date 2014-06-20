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
			if($(this).attr('name') === 'config-game-name'){
				var title = this.value.replace(/\s/g, '');
				if(title === ''){
					$('#top-title').html("Unnamed Game");
					document.title = "MDS GameCreator";
				}else{
					$('#top-title').html(title);
					document.title = title + " - MDS GameCreator";
				}
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
		case 'undo':	historyManager.undo();
						$("li[data-panel='editor-state-machine']").click(); 
						break;

		case 'redo':	historyManager.redo();
						$("li[data-panel='editor-state-machine']").click(); 
						break;
	}
}