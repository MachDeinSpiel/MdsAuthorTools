function State(x, y){
	//Tool related
	this.x = x;
	this.y = y;
	this.domObj = undefined;

	//Game related
	this.name ="Unnamed State";
	this.startAction = undefined;
	this.doAction = undefined;
	this.endAction = undefined;
	this.isStart = false;
	this.isEnd = false;
}