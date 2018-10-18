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
}

makeTrees(3, "", [], 3);
