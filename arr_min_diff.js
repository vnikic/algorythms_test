/**
Given k sorted arrays, you need to select one element from each array such that the difference of maximum
element and minimum element of the selected elements is minimum.
Example for k = 3:

    1 13 27 30
    16 20 29
    2 3 14 18 19 22 25 28

Answer: 2, selected elements (27, 29, 28)
**/

let arrays = [
    [1, 13, 27, 30],
    [10, 16, 20, 29],
    [2, 3, 14, 18, 19, 22, 25, 28]
];

let findMinMax = (arrays, pointers) => {
    let minMax = {
        min: Number.POSITIVE_INFINITY,
        minIdx: -1,
        max: Number.NEGATIVE_INFINITY,
        maxIdx: -1
    };

    for (let i = 0; i < arrays.length; i++) {
        let curr = arrays[i][pointers[i]];
        if (curr > minMax.max) {
            minMax.max = curr;
            minMax.maxIdx = i;
        }
        if (curr < minMax.min) {
            minMax.min = curr;
            minMax.minIdx = i;
        }
    }

    return minMax;
};


let bestPointers = [0, 0, 0];
let pointers = [0, 0, 0];

let minMax = findMinMax(arrays, pointers);

let bestDiff = minMax.max - minMax.min;


while ( arrays[minMax.minIdx].length - 1 > pointers[minMax.minIdx] ) {  // while can move the smallest one
    pointers[minMax.minIdx]++;
    minMax = findMinMax(arrays, pointers);
    let currDiff = minMax.max - minMax.min;
    if (currDiff < bestDiff) {
        bestDiff = currDiff;
        bestPointers = pointers.slice();
    }
}

console.log(bestPointers, bestDiff);
