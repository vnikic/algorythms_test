var common = require('./common.js');

module.exports = {
    name: "Insert Sort",
    
    sort: function(array) {
        for (var i = 0; i < array.length - 1; i++) {
            var j = i + 1;
            while ( j > 0 && common.isBefore(array[j], array[j - 1]) ) {
                common.swap(array, j - 1, j);
                j--;
            }
        }
    }
}