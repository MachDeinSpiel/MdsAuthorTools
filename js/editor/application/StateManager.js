roelps();

function roelps() {
	pups();
}

/** Pupsen läuft N0IZ*/
function pups() {
	try {
		throw new Error("Pupsen läuft N0IZ");
	} catch (e) {
		console.log(e.stack);
	}

}


function StateManager() {

}