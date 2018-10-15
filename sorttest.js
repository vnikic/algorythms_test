var common = require('./common.js');
var bubbleSort = require('./bubblesort.js');
var selectSort = require('./selectsort.js');
var insertSort = require('./insertsort.js');
var shellSort = require('./shellsort.js');
var quickSort = require('./quicksort.js');

var sorts = [
    bubbleSort,
    selectSort,
    insertSort,
    shellSort,
    quickSort,
];

var sort = function(array, sortAlgorythm) {
    sortAlgorythm(array);
}


var testArray = common.getRandomIntArray(1000, 1, 100000);
//var testArray = [ 7, 76, 9, 86, 34, 84, 31, 65, 19, 19 ];
var testArrayAsc = testArray.slice();

sort(testArrayAsc, bubbleSort.sort);

var testArrayDesc = testArray.slice();
common.compare = common.descCompare;
sort(testArrayDesc, bubbleSort.sort);

common.compare = common.ascCompare;


//console.log("Original array: ", testArray);
//console.log("Sorted ASC array: ", testArrayAsc);
//console.log("Sorted DESC array: ", testArrayDesc);

console.log("\nSORTING RANDOM ARRAY:\n");
sorts.forEach(function(s) {
    common.reset();
    var arrayToSort = testArray.slice();
    sort(arrayToSort, s.sort);
    console.log(s.name, " - comparisons: ", common.comparisonCount, ", swaps: ", common.swapCount);  
//    console.log(s.name, " - sorted array: ", arrayToSort);  
});

console.log("\nSORTING ALREADY SORTED ARRAY:\n");
sorts.forEach(function(s) {
    common.reset();
    var arrayToSort = testArrayAsc.slice();
    sort(arrayToSort, s.sort);
    console.log(s.name, " - comparisons: ", common.comparisonCount, ", swaps: ", common.swapCount);  
});


console.log("\nSORTING INVERSELY SORTED ARRAY:\n");
sorts.forEach(function(s) {
    common.reset();
    var arrayToSort = testArrayDesc.slice();
    sort(arrayToSort, s.sort);
    console.log(s.name, " - comparisons: ", common.comparisonCount, ", swaps: ", common.swapCount);
});
