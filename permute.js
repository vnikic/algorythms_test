function permute(n, f) {
    let perm = [], used = [];
    for (let i = 0; i < n; i++) {
        perm[i] = -1;
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
            if (index === n - 1) {
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

permute(4, p => console.log(p));