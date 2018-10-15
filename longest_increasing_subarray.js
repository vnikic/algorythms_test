function getRandomIntArray(len, min, max) {
    var array = [];
    for (var i = 0; i < len; i++) {
        array[i] = Math.round(Math.random() * (max - min) + min);
    }
    return array;
}
 
function findMaxIncSubarray(array, compareFunc) {
    var m = [];
    for (var i = 0; i < array.length; i++) {
        if (i == 0) {
            m[i] = {len: 1, prev: -1};
        } else {
            var currMaxLen = -1;
            var currMaxPrev = -1;
            for (var j = 0; j < i; j++) {
                if (compareFunc(array[i], array[j]) > 0) {
                    if (m[j].len + 1 > currMaxLen) {
                        currMaxLen = m[j].len + 1;
                        currMaxPrev = j;
                    }
                }
            }
            m[i] = currMaxLen > 0 ? {len: currMaxLen, prev: currMaxPrev} : {len: 1, prev: -1};
        }
    }
    
    var lastIndex = -1;
    var maxLen = -1;
    for (var i = 0; i < m.length; i++) {
        if (m[i].len > maxLen) {
            maxLen = m[i].len;
            lastIndex = i;
        }
    }
    
    var subarray = [];
    
    while (lastIndex >= 0) {
        subarray.unshift(array[lastIndex]);
        lastIndex = m[lastIndex].prev;
    }
    
    return subarray;
}



function incCompare(a, b) {
    return a > b ? 1 : (a == b ? 0 : -1);
}


var array = getRandomIntArray(20, 1, 100);

var maxSubarray = findMaxIncSubarray(array, incCompare);

console.log(array);

console.log(maxSubarray);