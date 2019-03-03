function variate(n, k, f) {
    let perm = [], used = [];
    for (let i = 0; i < n; i++) {
        if (i < k) {
            perm[i] = -1;
        }
        used[i] = false;
    }

    let index = 0;
    while (index >= 0) {
        let curr = perm[index];
        if (curr >= 0) {
            used[curr] = false;
        }
        let next = -1;
        for (let i = curr + 1; i < n && next === -1; i++) {
            if (!used[i]) {
                next = i;
            }
        }

        if (next >= 0) {
            perm[index] = next;
            used[next] = true;
            if (index === k - 1) {
                f(perm);
            } else {
                index++;
            }
        } else {
            used[curr] = false;
            perm[index] = -1;
            index--;
        }
    }
}


function permute(n, f) {
    variate(n, n, f);
}


let permuteRecursive = (n, doWithPerm) => {
    let used = [];
    let perm = [];
    for (let i = 1; i <= n; i++) {
        used.push(false);
        perm.push(0);
    }

    let f = (k) => {
        if (k < n) {
            for (let i = 0; i < n; i++) {
                if (!used[i]) {
                    perm[k] = i;
                    used[i] = true;
                    f(k + 1);
                    used[i] = false;
                }
            }
        } else {
            doWithPerm(perm);
        }
    };


    f(0, perm, used);
};


// TEST

// permute(4, p => console.log(p));
permuteRecursive(4, perm => console.log(perm));