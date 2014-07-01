function PresetManager(file){
	var scope = this;
	$.getJSON(file, function( data ) {
	  scope.data = data;
	  console.log(scope.data);
	}).done(function() {
    	console.log( "second success" );
	})
	.fail(function() {
		console.error( "error while loading json:"+file );
	})
	.always(function() {
	    console.log( "complete" );
	});
}

PresetManager.prototype.getActions = function(){
	return this.data.actions;
}

PresetManager.prototype.getTransitions = function(){
	return this.data.transitions;
}