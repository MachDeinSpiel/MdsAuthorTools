function showLogin(callback){
	console.log("please login!");
	$('#login-wrapper').css('display', 'block');
	$('#login-button').unbind('click').on('click', function(){
		var loggedIn = true;
		if(loggedIn){
			hideLogin();
			var name = $('#login-panel input[name=login-name').val();
			var pw = $('#login-panel input[name=password-name').val();

			callback(name, pw);
		}
	});
}

function hideLogin(){
	$('#login-wrapper').css('display', 'none');
}