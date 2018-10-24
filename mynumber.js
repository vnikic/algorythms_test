let NodeOption = {
    left: ["0"],
    right: ["1"],
    leftandright: ["0", "1"],
    none: []
};

let makeTrees = (nodeCount, path, nodes, initialNodeCount) => {
    if (nodeCount === 0 && nodes.length === initialNodeCount) {
        console.log(nodes);
    } else {
        nodeCount--;
        for (let i = 0; i <= nodeCount; i++) {
            let leftToPush = nodeCount - i;
            let rightToPush = i;
            makeTrees(leftToPush, path + "0", nodes.concat([path]), initialNodeCount);
            makeTrees(rightToPush, path + "1", nodes.concat([path]), initialNodeCount);
        }
    }
};


let create = (n, nodes) => {
    if (n > 0) {
        for (let i = 0; i < nodes.length; i++) {
            let nodeToAppend = nodes[i];
            for (let j = 0; j <= 1; j++) {
                let newNode = nodeToAppend + j;
                if (nodes[nodes.length - 1] < newNode) {
                    nodes.push(newNode);
                    create(n - 1, nodes);
                    nodes.pop();
                }
            }
        }
    } else {
        console.log(nodes);
    }
};

// makeTrees(3, "", [], 3);

create(3, ["0"]);
