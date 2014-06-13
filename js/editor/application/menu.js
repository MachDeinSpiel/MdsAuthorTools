[].forEach.call(
	document.querySelectorAll('.input-wrapper input'),
	function(item) {
		console.log(item);
		var label = item.parentNode.querySelector('.label');
		label.innerHTML = item.getAttribute('placeholder');
		item.addEventListener('keyup', function() {
			if (this.value === '') {
				label.style.opacity = "0";
			} else {
				label.style.opacity = "1";
			}
		});
	});