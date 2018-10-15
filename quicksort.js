var common = require('./common.js');

function partition(array, from, to) {
    if (from < to) {
        var pivot = array[from];
        var pivotIndex = from;
        from++;
        while (from < to) {
            while (from < to && common.isBefore(pivot, array[to])) {
                to--;
            }
            while (from < to && !common.isBefore(pivot, array[from])) {
                from++;
            }
            if (from < to) {
                common.swap(array, from, to);
                from++;
                if (from < to) {
                    to--;
                }
            }
        }
        if (to > pivotIndex) {
            if (common.isBefore(pivot, array[to])) {
                to--;
            }
            if (to > pivotIndex) {
                common.swap(array, to, pivotIndex);
            }
        }
    }
    return to;
}

function sortSlice(array, from, to) {
    var partitionIndex = partition(array, from, to);
    if (partitionIndex - 1 > from) {
        sortSlice(array, from, partitionIndex - 1);
    }
    if (partitionIndex + 1 < to) {
        sortSlice(array, partitionIndex + 1, to);
    }
}

module.exports = {
    name: "Quick Sort",
    
    sort: function(array) {
        sortSlice(array, 0, array.length - 1);
    }
}