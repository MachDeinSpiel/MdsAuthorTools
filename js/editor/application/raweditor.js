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

	$('#raw-panel input[type=button]').on('click', function(){
		RAWEDITOR.upload();
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
	var config = exporter.generateConfig(true);
	if(config == false){
		console.error('Error while generating config JSON');
		return;
	}
	var serverJSON = this.serverEditor.getValue();
	var clientJSON = this.clientEditor.getValue();
	var name = document.querySelector('input[name=config-game-name]').value;
	var url = "http://mds.informatik.hs-bremen.de:1380/authortools/upload.php?t="+(new Date()).getTime();
	var scope = exporter;
	$.post(url, 'gamename='+name+'&json='+serverJSON, function(serverURL){
		console.log("ServerURL:"+serverURL);
		$.post(url, 'gamename='+name+'&json='+clientJSON, function(clientURL){
			console.log("ClientURL:"+clientURL);
			showLogin(function(name, pw){
				console.log(name, pw);
				config.serverurl = serverURL;
				config.clienturl = clientURL;
				config.author = name;
				console.log(config);
				var data = '{"mode":"config","username":'+name+', "password":'+pw+',"config":'+JSON.stringify(config)+'}';
				console.log("data:",data);
				scope.websocket.send(data);
			});
		});
	});
}

