var menuItems = document.querySelectorAll("#editor-top-switcher li");
[].forEach.call(
  menuItems, 
  function(item){
  	item.addEventListener('click', function(){
  		[].forEach.call(
		  menuItems, 
		  function(otherItem){
		  	otherItem.classList.remove('selected');
		});
		this.classList.add('selected');
		[].forEach.call(
		  document.querySelectorAll("#workspace-wrapper .switch-panel"), 
		  function(panel){
		  	panel.classList.add('invisible');
		});
		document.querySelector('#'+this.getAttribute('data-panel')).classList.remove('invisible');

  	})
});
