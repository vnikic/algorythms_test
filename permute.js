function permute(n) {
    var perm = [], used = [];
    for (var i = 0; i < n; i++) {
        perm[i] = -1;
        used[i] = false;
    }
    
    var index = 0;
    while (index >= 0) {
        var curr = perm[index];
        if (curr >= 0) {
            used[curr] = false;
        }
        var next = -1;
        for (var i = curr + 1; i < n && next == -1; i++) {
            if (!used[i]) {
                next = i;
            }
        }

        if (next >= 0) {
            perm[index] = next;
            used[next] = true;
            if (index == n - 1) {
                console.log(perm);
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

permute(3);