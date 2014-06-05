Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
        	// sollange der zu setzende Index über dem gesammtindex ist, wird einfach ein leeres Obj eingefügt.
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; 
}


Array.prototype.moveEnd = function(obj){
	var index;
	var i = 0 
	while (!obj.equals(this[i])){
		i++;
		var index = i;
	}
	this.move(index,this.length-1);1.
}


