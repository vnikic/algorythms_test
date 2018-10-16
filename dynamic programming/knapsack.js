/*
Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total
value in the knapsack. In other words, given two integer arrays val[0..n-1] and wt[0..n-1] which represent
values and weights associated with n items respectively. Also given an integer W which represents knapsack capacity,
find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W.
You cannot break an item, either pick the complete item, or don’t pick it (0-1 property).
*/

// items - array of items, all having size and value properties
let findBestItemSet = (items, totalSize) => {
    // rows - items,
    // columns - all possible knapsack sizes from 0 to totalSize, each
    // each cell (i, j) tells whether to include item i in the set and the best value for size j
    let matrix = [];
    let [maxValue, x, y]  = [0, 0, 0];      // keep track of the best possible value in the whole matrix, together with the row and column
    for (let i = 0; i < items.length; i++) {
        matrix[i] = [];
        let currSize = items[i].size;
        let currValue = items[i].value;
        for (let j = 0; j <= totalSize; j++) {
            let include = false;
            let bestValue = 0;
            if (i > 0) {
                bestValue = matrix[i - 1][j][1];
                if (j >= currSize) {
                    let prevCell = matrix[i - 1][j - currSize];
                    if (prevCell[1] + currValue > bestValue) {
                        bestValue = prevCell[1] + currValue;
                        include = true;
                    }
                }
            } else if (currSize === j) {
                bestValue = currValue;
                include = true;
            }
            if (bestValue > maxValue) {
                [maxValue, x, y] = [bestValue, i, j];
            }

            matrix[i][j] = [include, bestValue];
        }
    }

    let size = y;
    let result = [];
    while (x >= 0) {
        if (matrix[x][y][0]) {
            result.unshift({
                index: x,
                size: items[x].size,
                value: items[x].value,
            });
            y -= items[x].size;
        }
        x--;
    }

    return {
        items: result,
        maxvalue: maxValue,
        itemssize: size
    };
};


// TESTING

let items = [
    {size: 2, value: 60},
    {size: 2, value: 100},
    {size: 3, value: 150},
    {size: 4, value: 170},
    {size: 2, value: 30},
    {size: 3, value: 90},
];

let indices = findBestItemSet(items, 8);
console.log(indices);
