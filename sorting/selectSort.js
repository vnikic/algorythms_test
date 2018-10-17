var common = require('./common.js');

module.exports = {
    name: "Selection Sort",
    
    sort: function(array) {
        for (var i = 0; i < array.length - 1; i++) {
            var min = array[i];
            var minIndex = i;
            for (var j = i + 1; j < array.length; j++) {
                if (common.isBefore(array[j], min)) {
                    min = array[j];
                    minIndex = j;
                }
            }
            if (minIndex > i) {
                common.swap(array, i, minIndex);
            }
        }
    }
}