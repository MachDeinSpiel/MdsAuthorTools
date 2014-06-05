Object.prototype.equals = function(obj){
    var p;
    for(p in this) {
        if(typeof(obj[p])=='undefined') {return false;}
    }
    for(p in this) {
        if (this[p]) {
            switch(typeof(this[p])) {
             /*   case 'object':
                            if (!this[p].equals(obj[p])) { 
                              return false; 
                            } 
                            break;*/
                case 'function':
                            if (typeof(obj[p])=='undefined' ||
                                (p != 'equals' && this[p].toString() != obj[p].toString()))
                                return false;
                            break;
                default:
                              if (this[p] != obj[p]) { 
                                return false; 
                              }
            }
        } else {
            if (obj[p]){
                return false;
            }
        }
    }
    for(p in obj) {
        if(typeof(this[p])=='undefined') {
            return false;
        }
    }
 
    return true;
}