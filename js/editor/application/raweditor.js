var RAWEDITOR = {};

RAWEDITOR.clientEditor = undefined;
RAWEDITOR.serverEditor = undefined;

RAWEDITOR.init = function(){
	$('#raw-wrapper').on('click', function(){
		$(this).css('display', 'none');
	});

	$('#raw-panel').on('click', function(e){
		e.stopPropagation();
	});

	this.clientEditor = ace.edit("editor-client");
    this.clientEditor.setTheme("ace/theme/xcode");
    this.clientEditor.getSession().setMode("ace/mode/json");

	this.serverEditor = ace.edit("editor-server");
	this.serverEditor.setTheme("ace/theme/xcode");
    this.serverEditor.getSession().setMode("ace/mode/json");
}

RAWEDITOR.show = function(){
	$('#raw-wrapper').css('display', 'block');
}


RAWEDITOR.upload = function(){
	console.log("upload");
	console.log(this.clientEditor.getValue());
	console.log(this.serverEditor.getValue());
}