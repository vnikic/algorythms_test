var common = require('./common.js');

module.exports = {
    name: "Bubble Sort",
    
    sort: function(array) {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (common.isBefore(array[j], array[i])) {
                    common.swap(array, i, j);
                }
            }
        }
    }
}