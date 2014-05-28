$(document).ready(function() {
 	$("#top-menu-bar li:has(ul)").on( "click", function() {
  		console.log('clicked');
    	$(this).find("ul").slideDown();
  	});
});