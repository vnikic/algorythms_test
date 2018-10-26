let combine= (arr, k, f)=> {
    let tmp = (k, fromIndex, resultArray) => {
        if (k === 0) {
            f(resultArray);
        } else {
            for (let i = fromIndex; i < arr.length; i++) {
                resultArray.push(arr[i]);
                tmp(k - 1, i + 1, resultArray);
                resultArray.pop();
            }
        }
    };
    tmp(k, 0, []);
};



combine([0, 1, 2, 3, 4, 5], 3, arr => console.log(arr));