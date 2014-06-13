[].forEach.call(
  document.querySelectorAll('.input-wrapper input'), 
  function(item){
  	console.log(item);
  	item.addEventListener('keyup', function(){
  		if(this.value === ''){
  			this.parentNode.querySelector('.label').style.opacity="0";
  			console.log(this.parentNode.querySelector('.label'));
  		}else{
  			var label = this.parentNode.querySelector('.label');
  			label.innerHTML = this.getAttribute('placeholder');
  			label.style.opacity="1";
  		}
  	});
 });