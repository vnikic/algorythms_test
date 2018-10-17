/*
The Longest Increasing Subsequence (LIS) problem is to find the length of the longest subsequence of a given sequence
such that all elements of the subsequence are sorted in increasing order. For example, the length of LIS for
{10, 22, 9, 33, 21, 50, 41, 60, 80} is 6 and LIS is {10, 22, 33, 50, 60, 80}.
 */

function getRandomIntArray(len, min, max) {
    let array = [];
    for (let i = 0; i < len; i++) {
        array[i] = Math.round(Math.random() * (max - min) + min);
    }
    return array;
}
 
function findMaxIncSubarray(array, compareFunc) {
    let m = [];
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            m[i] = {len: 1, prev: -1};
        } else {
            let currMaxLen = -1;
            let currMaxPrev = -1;
            for (let j = 0; j < i; j++) {
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
    
    let lastIndex = -1;
    let maxLen = -1;
    for (let i = 0; i < m.length; i++) {
        if (m[i].len > maxLen) {
            maxLen = m[i].len;
            lastIndex = i;
        }
    }
    
    let subarray = [];
    
    while (lastIndex >= 0) {
        subarray.unshift(array[lastIndex]);
        lastIndex = m[lastIndex].prev;
    }
    
    return subarray;
}



function incCompare(a, b) {
    return a > b ? 1 : (a === b ? 0 : -1);
}


let array = getRandomIntArray(20, 1, 100);

let maxSubarray = findMaxIncSubarray(array, incCompare);

console.log(array);

console.log(maxSubarray);