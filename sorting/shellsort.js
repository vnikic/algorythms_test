var common = require('./common.js');

var nsort = function(array, s, n) {
    for (var i = s; i < array.length - n; i+=n) {
        var j = i + n;
        while ( j > s && common.isBefore(array[j], array[j - n]) ) {
            common.swap(array, j - n, j);
            j -= n;
        }
    }
}

module.exports = {
    name: "Shell Sort",
    
    sort: function(array) {
        var interval = 1;
        while (interval * 3 + 1 < array.length) {
            interval = interval * 3 + 1;
        }
        
        while (interval > 0) {
            for (var i = 0; i < interval; i++) {
                nsort(array, i, interval);
            }
            interval = (interval - 1) / 3;
        }
    }
}