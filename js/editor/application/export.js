function exportConfig(){
	var config = {};
	config.name = document.querySelector('input[name=config-game-name]').value;
	config.author = document.querySelector('input[name=config-author-name]').value;
	config.version = document.querySelector('input[name=config-version]').value;
	config.maxplayers = parseInt(document.querySelector('input[name=config-max-player]').value);
	return JSON.stringify(config);
}