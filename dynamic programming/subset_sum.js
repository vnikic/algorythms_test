/*
Given a set of non-negative integers, and a value sum, determine if there is a subset of the
given set with sum equal to given sum.
*/

let naiveRecursiveGetSubsetForSum = (array, fromIndex, sum, subArray) => {
    if (sum === 0) {
        return subArray;
    } else {
        for (let i = fromIndex; i < array.length; i++) {
            let curr = array[i];
            if (curr <= sum) {
                subArray.push(curr);
                let result = naiveRecursiveGetSubsetForSum(array, i + 1, sum - curr, subArray);
                if (result != null) {
                    return result;
                }
                subArray.pop();
            }
        }
    }
    return null;
};


let naiveSolution = (array, sum) => {
    return naiveRecursiveGetSubsetForSum(array, 0, sum, []);
};


let memoize = (array, sum) => {
    let m = [];
    for (let i = 0; i < array.length; i++) {
        m[i] = [];
        let curr = array[i];
        for (let j = 0; j <= sum; j++) {
            if (i === 0) {
                m[i][j] = curr === j ? 2 : 0;
            } else {
                if (curr === j) {
                    m[i][j] = 2;
                } else if (curr < j && m[i - 1][j - curr] > 0) {
                    m[i][j] = 2;
                } else {
                    m[i][j] = m[i - 1][j] === 2 ? 1 : m[i - 1][j];
                }
            }
        }
    }
    return m;
};

let findSubarrayForSum = (array, sum, table) => {
    // first find first 2 in column sum
    for (let i = 0; i < array.length; i++) {
        if (table[i][sum] === 2) {
            let result = [];
            let x = i;
            while (x >= 0) {
                if (table[x][sum] === 2) {
                    result.unshift(array[x]);
                    sum -= array[x];
                }
                x--;
            }
            return result;
        }
    }
    return null;
};




// TESTING

let array = [3, 34, 4, 12, 5, 2];

console.log("Recursion: ");
console.log( naiveSolution(array, 56) );


console.log("Dynamic programming: ");

let maxSum = 100;
let table = memoize(array, maxSum);
console.log(findSubarrayForSum(array, 8, table));
console.log(findSubarrayForSum(array, 10, table));
console.log(findSubarrayForSum(array, 12, table));
console.log(findSubarrayForSum(array, 14, table));
console.log(findSubarrayForSum(array, 18, table));
console.log(findSubarrayForSum(array, 21, table));
console.log(findSubarrayForSum(array, 56, table));
