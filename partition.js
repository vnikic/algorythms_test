/**
 * Generate all partitions for the given integer. Partitions are combinations of a sum number.
 * @param n Integer to be partitioned
 * @partFunc Function to apply to partition array
 */
let partition = (n, partFunc) => {
    let partitionRecursive = (n, max, partArr, index) => {
        if (n === 0) {
            if (partFunc) {
                partFunc( partArr.slice(0, index) );
            }
        } else {
            for (let i = max; i >= 1; i--) {
                let m = n - i;
                if (m >= 0) {
                    partArr[index] = i;
                    partitionRecursive(m, i, partArr, index + 1);
                }
            }
        }
    };

    partitionRecursive(n, n, [], 0);
};


// test
partition( 7, (a) => console.log(a) );
