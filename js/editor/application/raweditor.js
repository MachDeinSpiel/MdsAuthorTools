var RAWEDITOR = {};

RAWEDITOR.init = function(){
	$('#raw-wrapper').on('click', function(){
		$(this).css('display', 'none');
	});

	$('#raw-panel').on('click', function(e){
		e.stopPropagation();
	});

}

RAWEDITOR.show = function(){
	$('#raw-wrapper').css('display', 'block');

}