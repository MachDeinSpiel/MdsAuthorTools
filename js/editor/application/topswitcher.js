console.log("topswitcher");
var menuItems = document.querySelectorAll("#editor-top-switcher li");
[].forEach.call(
  menuItems, 
  function(item){
  	item.addEventListener('click', function(){
  		console.log("showing "+this.getAttribute('data-panel'));
  		[].forEach.call(
		  menuItems, 
		  function(otherItem){
		  	otherItem.classList.remove('selected');
		});
		this.classList.add('selected');
  	})
});
