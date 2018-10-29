let combinations = (arr, n, f) => {
    let combine = (lastIndex, k, resArray) => {
        if (k === 0) {
            f(resArray);
        } else {
            for (let i = lastIndex + 1; i < arr.length; i++) {
                resArray.push(arr[i]);
                combine(i, k - 1, resArray);
                resArray.pop();
            }
        }
    };

    combine(-1, n, []);
};


let variationsWithRepetition = (arr, n, f) => {
    let variate = (k, resArray) => {
        if (k === 0) {
            f(resArray);
        } else {
            for (let i = 0; i < arr.length; i++) {
                resArray.push(arr[i]);
                variate(k - 1, resArray);
                resArray.pop();
            }
        }
    };

    variate(n, []);
};

let variationsNoRepetition = (arr, n, f) => {
    let variate = (k, usedArray, resArray) => {
        if (k === 0) {
            f(resArray);
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (usedArray[i] === undefined) {
                    usedArray[i] = false;
                }
                if (!usedArray[i]) {
                    resArray.push(arr[i]);
                    usedArray[i] = true;
                    variate(k - 1, usedArray, resArray);
                    usedArray[i] = false;
                    resArray.pop();
                }
            }
        }
    };

    variate(n, [], []);
};


variationsNoRepetition([0, 1, 2, 3, 4], 3, comb => console.log(comb));