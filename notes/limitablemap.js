/**
 *  
 *  @param {Number} limit  default 10
 *  
 */
var LimitableMap = function(limit) {
    if(!Number(limit)) {
        return;
    }
    this.limit = limit || 10;
    this.keys = [];
    this.map = {};
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

LimitableMap.prototype.set = function(key, value) {
    var keys = this.keys;
    var map = this.map;
    if(!hasOwnProperty.call(map, key)) {
        if(keys.length == this.limit) {
            var firstKey = keys.shift();
            delete map[firstKey];
        }
        keys.push(key);
    }

    map[key] = value;
}

LimitableMap.prototype.get = function(key) {
    return this.map[key];
}

var limitableMap = new LimitableMap(3);
limitableMap.set('1', 1);
limitableMap.set('2', 1);
limitableMap.set('3', 1);
limitableMap.set('4', 1);
console.log(limitableMap.get('4'));