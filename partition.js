function partRecursive(n, max, partArr, index) {
    if (n == 0) {
        console.log( partArr.slice(0, index) );
    } else {
        for (var i = max; i >= 1; i--) {
            var m = n - i;
            if (m >= 0) {
                partArr[index] = i;
                partRecursive(m, i, partArr, index + 1);
            }
        }
    }
}

function part(n) {
    partRecursive(n, n, [], 0);
}


part(7);