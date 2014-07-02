function showLogin(callback){
	console.log("please login!");
	$('#login-wrapper').css('display', 'block');
	$('#login-button').unbind('click').on('click', function(){
		var loggedIn = true;
		if(loggedIn){
			hideLogin();
			var name = $('#login-panel input[name=login-name').val();
			var pw = $('#login-panel input[name=login-password').val();
			var passhash = CryptoJS.MD5(pw).toString();
			callback(name, passhash);
		}
	});
}

function hideLogin(){
	$('#login-wrapper').css('display', 'none');
}