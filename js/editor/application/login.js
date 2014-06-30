function showLogin(callback){
	$('#login-wrapper').css('display', 'block');
	$('#login-button').unbind('click').on('click', function(){
		var loggedIn = true;
		if(loggedIn){
			hideLogin();
			callback();
		}
	});
}

function hideLogin(){
	$('#login-wrapper').css('display', 'none');
}