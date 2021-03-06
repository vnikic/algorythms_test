/*
Longest Common Subsequence (LCS) Problem Statement: Given two sequences, find the length of longest subsequence present in both of them.
A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.
For example, “abc”, “abg”, “bdf”, “aeg”, ‘”acefg”, .. etc are subsequences of “abcdefg”.
So a string of length n has 2^n different possible subsequences.

It is a classic computer science problem, the basis of diff (a file comparison program that outputs the
differences between two files), and has applications in bioinformatics.

Examples:
LCS for input Sequences “ABCDGH” and “AEDFHR” is “ADH” of length 3.
LCS for input Sequences “AGGTAB” and “GXTXAYB” is “GTAB” of length 4.
 */

let createLCSMatrix = (arr1, arr2) => {
    let matrix = [];
    for (let i = 0; i < arr1.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                matrix[i][j] = i > 0 && j > 0 ? matrix[i - 1][j - 1] + 1 : 1;
            } else {
                let prev1 = i > 0 ? matrix[i - 1][j] : 0;
                let prev2 = j > 0 ? matrix[i][j - 1] : 0;
                matrix[i][j] = Math.max(prev1, prev2);
            }
        }
    }
    return matrix;
};

let getLCSLength = (arr1, arr2) => {
    let m = createLCSMatrix(arr1, arr2);
    return m[arr1.length - 1][arr2.length - 1];
};

let getLCSSequence = (arr1, arr2) => {
    let seq = [];

    let m = createLCSMatrix(arr1, arr2);
    let i = arr1.length - 1;
    let j = arr2.length - 1;

    while (i >= 0 && j >= 0) {
        let curr = m[i][j];
        let prev1 = i > 0 ? m[i - 1][j] : 0;
        let prev2 = j > 0 ? m[i][j - 1] : 0;
        if (curr === prev1) {
            i--;
        } else if (curr === prev2) {
            j--;
        } else {
            seq.unshift(arr1[i]);   // add element at the beginning of the array
            i--;
            j--;
        }
    }
    return seq;
};


// TESTING

let arr1 = ['B', 'C', 'A', 'Z', 'D', 'A'];
let arr2 = ['B', 'A', 'C', 'B', 'A', 'D', 'A'];

let matrix = createLCSMatrix(arr1, arr2);
console.log(matrix);

console.log(`LCS length is ${getLCSLength(arr1, arr2)}`);

console.log(`LCS sequence is ${getLCSSequence(arr1, arr2)}`);