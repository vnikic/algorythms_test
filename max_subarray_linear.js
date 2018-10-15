let findMaxSubarray = function(arr) {
    let maxIndexFrom = -1;
    let maxIndexTo = -1;
    let maxSum = 0.0;
    let maxEdgeFrom = -1;
    let maxEdgeSum = 0.0;
    
    for (let i = 0; i < arr.length; i++) {
        let currEl = arr[i];
        maxEdgeSum += currEl;
        if (currEl >= 0) {
            if (maxEdgeFrom === -1) {
                maxEdgeFrom = i;
            }
            if (maxEdgeSum > maxSum) {
                maxIndexFrom = maxEdgeFrom;
                maxIndexTo = i;
                maxSum = maxEdgeSum;
            }
        } else {
            if (maxEdgeSum <= 0) {
                maxEdgeFrom = -1;
                maxEdgeSum = 0.0;
            }
        }
    }
    
    return {
        "from": maxIndexFrom,
        "to": maxIndexTo,
        "sum": maxSum
    }
};


var array = [13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7];
// var array = [-2, 1,-3, 4, -1, 2, 1, -5, 4];

var maxSubarray = findMaxSubarray(array);

console.log( "[" + array.slice(maxSubarray.from, maxSubarray.to  + 1)  + "], sum = " + maxSubarray.sum);