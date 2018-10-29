let OP_PLUS = 0;
let OP_MINUS = 1;
let OP_MULT = 2;
let OP_DIV = 3;

let ALL_OPS = [OP_PLUS, OP_MINUS, OP_MULT, OP_DIV];


class CalcNode {
    constructor() {
        this.left = null;
        this.right = null;
    }

    calc() {
        return NaN;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    isLeaf() {
        return false;
    }

    getPrecedence() {
        return 0;
    }

    toString() {
    }

    isValid() {
        return true;
    }
}


class OperatorNode extends CalcNode {
    constructor() {
        super();
    }

    setOperator(op) {
        this.operator = op;
    }

    calc() {
        let leftCalc = this.left.calc();
        if (isNaN(leftCalc)) {
            return NaN;
        }
        let rightCalc = this.right.calc();
        if (isNaN(rightCalc)) {
            return NaN;
        }
        switch (this.operator) {
            case OP_PLUS:
                if (this.left.isLeaf() === this.right.isLeaf() && leftCalc < rightCalc) {
                    return NaN;
                }
                return leftCalc + rightCalc;
            case OP_MINUS:
                return leftCalc > rightCalc ? leftCalc - rightCalc : NaN;
            case OP_MULT:
                if (this.left.isLeaf() === this.right.isLeaf() && leftCalc < rightCalc) {
                    return NaN;
                }
                return leftCalc !== 1 ? leftCalc * rightCalc : NaN;
            case OP_DIV:
                if (leftCalc > rightCalc) {
                    let div = leftCalc / rightCalc;
                    return div % 1 === 0.0 ? div : NaN;
                }
                break;
        }
        return NaN;
    }

    getPrecedence() {
        return this.operator === OP_PLUS || this.operator === OP_MINUS ? 2 : 1;
    }

    toString() {
        let leftStr = this.left ? this.left.toString() : "y";
        let rightStr = this.right ? this.right.toString(): "y";
        let opStr = "#";
        switch (this.operator) {
            case OP_PLUS: opStr = "+"; break;
            case OP_MINUS: opStr = "-"; break;
            case OP_MULT: opStr = "*"; break;
            case OP_DIV: opStr = "/"; break;
        }

        let s = `${leftStr} ${opStr} ${rightStr}`;
        if (this.operator !== OP_MULT) {
            s = `(${s})`;
        }
        return s;
    }

    isValid() {
        if ((this.operator === OP_PLUS || this.operator === OP_MULT) && this.left.isLeaf()) {
            return this.right.isLeaf();
        }
        return true;
    }
}


class NumberNode extends CalcNode {
    constructor(num) {
        super();
        this.num = num;
    }

    setNumber(num) {
        this.num = num;
    }

    isLeaf() {
        return true;
    }

    setLeft(node) {
    }

    setRight(node) {
    }

    calc() {
        return this.num ? this.num: NaN;
    }

    toString() {
        return this.num ? this.num : "x";
    }
}


let getOperationNodes = (calcTree) => {
    let collectOperationNodes = (calcTree, collectedNodes) => {
        if (calcTree !== null && !calcTree.isLeaf()) {
            collectOperationNodes(calcTree.left, collectedNodes);
            collectedNodes.push(calcTree);
            collectOperationNodes(calcTree.right, collectedNodes);
        }
    };

    let opNodes = [];
    collectOperationNodes(calcTree, opNodes);
    return opNodes;
};


let getNumberNodes = (calcTree) => {
    let collectNumberNodes = (calcTree, collectedNodes) => {
        if (calcTree !== null) {
            if (calcTree.isLeaf()) {
                collectedNodes.push(calcTree);
            } else {
                collectNumberNodes(calcTree.left, collectedNodes);
                collectNumberNodes(calcTree.right, collectedNodes);
            }
        }
    };

    let opNodes = [];
    collectNumberNodes(calcTree, opNodes);
    return opNodes;
};


let defineCalcTreeNumberPlaceholders = (calcTree) => {
    if (calcTree !== null && !calcTree.isLeaf()) {
        if (calcTree.left === null) {
            calcTree.setLeft(new NumberNode(1));
        } else {
            defineCalcTreeNumberPlaceholders(calcTree.left);
        }
        if (calcTree.right === null) {
            calcTree.setRight(new NumberNode(1));
        } else {
            defineCalcTreeNumberPlaceholders(calcTree.right);
        }
    }
};


let createCalcTree = (nodes) => {
    let rootNode = null;
    for (let i = 0; i < nodes.length; i++) {
        let currNode = nodes[i];
        if (currNode === "") {
            rootNode = new OperatorNode();
        } else {
            let nodeToInsertInto = rootNode;
            for (let i = 0; i < currNode.length - 1; i++) {
                if (currNode[i] === "0") {
                    nodeToInsertInto = nodeToInsertInto.left;
                } else {
                    nodeToInsertInto = nodeToInsertInto.right;
                }
            }
            let last = currNode[currNode.length - 1];
            if (last === "0") {
                nodeToInsertInto.setLeft(new OperatorNode());
            } else {
                nodeToInsertInto.setRight(new OperatorNode());
            }
        }
    }
    defineCalcTreeNumberPlaceholders(rootNode);
    return rootNode;
};


let createCalcTrees = (n, nodes, calcTrees) => {
    if (n > 0) {
        for (let i = 0; i < nodes.length; i++) {
            let nodeToAppend = nodes[i];
            for (let j = 0; j <= 1; j++) {
                let newNode = nodeToAppend + j;
                if (nodes[nodes.length - 1] < newNode) {
                    nodes.push(newNode);
                    createCalcTrees(n - 1, nodes, calcTrees);
                    nodes.pop();
                }
            }
        }
    } else {
        calcTrees.push(createCalcTree(nodes));
    }
};


let getAllCalcTrees = () => {
    let calcTrees = [];
    for (let i = 1; i <= 4; i++) {
        createCalcTrees(i, [""], calcTrees);
    }
    return calcTrees;
};


let setOperations = (opNodes, ops) => {
    for (let i = 0; i < Math.min(opNodes.length, ops.length); i++) {
        opNodes[i].setOperator(ops[i]);
    }
};


let setNumbers = (numNodes, numbers) => {
    for (let i = 0; i < Math.min(numNodes.length, numbers.length); i++) {
        numNodes[i].setNumber(numbers[i]);
    }
};


let getAllOperationSequences = (n) => {
    let generateOpSeq = (num, currCombination, allCombinations) => {
        if (num === 0) {
            allCombinations.push(currCombination.slice());
        } else {
            for (let i = 0; i < ALL_OPS.length; i++) {
                currCombination.push(ALL_OPS[i]);
                generateOpSeq(num - 1, currCombination, allCombinations);
                currCombination.pop();
            }
        }
    };

    let all = [];
    generateOpSeq(n, [], all);
    return all;
};


let getAllNumberSequences = (n, numbers) => {
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

    let all = [];
    const allDiff = new Set([]);
    variationsNoRepetition(numbers, n, v => {
        let s = v.toString();
        if (!allDiff.has(s)) {
            all.push(v.slice());
            allDiff.add(s);
        }
    });
    return all;
};


// TESTING
let startTime = Date.now();

let nums = [4, 3, 8, 7, 11, 52];
let result = 2221;
let count = 0;

nums.sort();

let calcTrees = getAllCalcTrees();
let allOperationSequences = [];
for (let i = 1; i <= nums.length - 1; i++) {
    allOperationSequences[i - 1] = getAllOperationSequences(i);
}
let allNumberSequences = [];
for (let i = 1; i <= nums.length; i++) {
    allNumberSequences[i - 1] = getAllNumberSequences(i, nums);
}

let bestMatch = -1;
let bestExpression = null;

for (let i = 0; i < calcTrees.length; i++) {
    let calcTree = calcTrees[i];
    let opNodes = getOperationNodes(calcTree);
    let opNodeCount = opNodes.length;
    let numNodes = getNumberNodes(calcTree);
    let numNodesCount = numNodes.length;

    let properOperationSequences = allOperationSequences[opNodeCount - 1];
    for (let j = 0; j < properOperationSequences.length; j++) {
        setOperations(opNodes, properOperationSequences[j]);
        let valid = true;
        for (let ii = 0; ii < opNodes.length && valid; ii++) {      // eliminate some of duplicate expressions this way
            if (!opNodes[ii].isValid()) {
                valid = false;
            }
        }
        if (valid) {
            let properNumberSequences = allNumberSequences[numNodesCount - 1];
            for (let k = 0; k < properNumberSequences.length; k++) {
                let numSeq = properNumberSequences[k];
                setNumbers(numNodes, numSeq);
                let currCalc = calcTree.calc();
                if (!isNaN(currCalc)) {
                    if (currCalc === result) {
                        count++;
                        console.log(`${calcTree.toString()} = ${currCalc}`);
                    }
                    if (count === 0 && Math.abs(result - bestMatch) > Math.abs(currCalc - bestMatch)) {
                        bestMatch = currCalc;
                        bestExpression = calcTree.toString();
                    }
                }
            }
        }
    }
}

if (count === 0) {
    console.log(`Nearest match: ${bestExpression} = ${bestMatch}`);
}

console.log(`Number of expressions found: ${count}. Calculation done in ${Date.now() - startTime}ms`);
