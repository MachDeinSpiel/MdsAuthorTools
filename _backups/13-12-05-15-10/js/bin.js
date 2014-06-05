var bin = document.getElementById('workspace-bin');

function switchBin(state){
	if(state){
		bin.style.opacity = "1";
		bin.style.bottom = 10+"px";
	} else {
		bin.style.bottom = -128+"px";
	}
}

