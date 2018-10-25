let OP_NONE = 0;
let OP_PLUS = 1;
let OP_MINUS = 2;
let OP_MULT = 3;
let OP_DIV = 4;

let ALL_OPS = [OP_NONE, OP_PLUS, OP_MINUS, OP_MULT, OP_DIV];


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

    setNodes(left, right) {
        this.left = left;
        this.right = right;
    }

    getPrecedence() {
        return 0;
    }

    toString() {
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
        switch (this.operator) {
            case OP_NONE:
                if (this.left) {
                    return this.left.calc();
                }
                break;
            case OP_PLUS:
                if (this.left && this.right) {
                    return this.left.calc() + this.right.calc();
                }
                break;
            case OP_MINUS:
                if (this.left && this.right) {
                    return this.left.calc() - this.right.calc();
                }
                break;
            case OP_MULT:
                if (this.left && this.right) {
                    return this.left.calc() * this.right.calc();
                }
                break;
            case OP_DIV:
                if (this.left && this.right) {
                    let x = this.right.calc();
                    return x !== 0 ? this.left.calc() / x : NaN;
                }
                break;
        }
        return NaN;
    }

    getPrecedence() {
        switch (this.operator) {
            case OP_PLUS, OP_MINUS: return 2;
            case OP_MULT, OP_DIV: return 1;
        }
        return 0;
    }

    toString() {
        let leftStr = this.left ? this.left.toString() : "y";
        if (this.operator === OP_NONE) {
            return leftStr;
        }
        let rightStr = this.right ? this.right.toString(): "y";
        let opStr = "#";
        switch (this.operator) {
            case OP_PLUS: opStr = "+"; break;
            case OP_MINUS: opStr = "-"; break;
            case OP_MULT: opStr = "*"; break;
            case OP_DIV: opStr = "/"; break;
        }

        let s = `(${leftStr} ${opStr} ${rightStr})`;
        // if (this.getPrecedence() === 2) {
        //     s = `(${s})`;
        // }
        return s;
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

    setNodes(left, right) {
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
        if (calcTree === null) {
            return;
        } else if (!calcTree.isLeaf()) {
            collectOperationNodes(calcTree.left, collectedNodes);
            collectedNodes.push(calcTree);
            collectOperationNodes(calcTree.right, collectedNodes);
        }
    };

    let opNodes = [];
    collectOperationNodes(calcTree, opNodes);
    return opNodes;
}


let getNumberNodes = (calcTree) => {
    let collectNumberNodes = (calcTree, collectedNodes) => {
        if (calcTree === null) {
            return;
        } else if (calcTree.isLeaf()) {
            collectedNodes.push(calcTree);
        } else {
            collectNumberNodes(calcTree.left, collectedNodes);
            collectNumberNodes(calcTree.right, collectedNodes);
        }
    };

    let opNodes = [];
    collectNumberNodes(calcTree, opNodes);
    return opNodes;
}


let defineCalcTreeNumberPlaceholders = (calcTree) => {
    if (calcTree === null) {
        return;
    } else if (!calcTree.isLeaf()) {
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
}


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
    createCalcTrees(4, [""], calcTrees);
    return calcTrees;
}


let setOperations = (calcTree, ops) => {
    let opNodes = getOperationNodes(calcTree);
    for (let i = 0; i < Math.min(opNodes.length, ops.length); i++) {
        opNodes[i].setOperator(ops[i]);
    }
};


let setNumbers = (calcTree, numbers) => {
    let numNodes = getNumberNodes(calcTree);
    for (let i = 0; i < Math.min(numNodes.length, numbers.length); i++) {
        numNodes[i].setNumber(numbers[i]);
    }
};


let getAllOperationSequences = () => {
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
    generateOpSeq(5, [], all);
    return all;
}


let getAllNumberSequences = (numbers) => {
    let permute = (n, f) => {
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

    let all = [];
    let permF = p => {
        let resSeq = [];
        for (let i = 0; i < p.length; i++) {
            resSeq.push(numbers[p[i]]);
        }
        all.push(resSeq);
    }
    permute(numbers.length, permF);
    return all;
}


// TESTING

let nums = [5, 4, 7, 1, 15, 50];
let result = 873;

let calcTrees = getAllCalcTrees();
let allOperationSequences = getAllOperationSequences();
let allNumberSequences = getAllNumberSequences(nums);

let startTime = Date.now();

// for (let i = 0; i < calcTrees.length; i++) {
for (let i = 5; i < 10; i++) {
    let calcTree = calcTrees[i];
    for (let j = 0; j < allOperationSequences.length; j++) {
        let opSeq = allOperationSequences[j];
        for (let k = 0; k < allNumberSequences.length; k++) {
            let numSeq = allNumberSequences[k];
            setNumbers(calcTree, numSeq);
            setOperations(calcTree, opSeq);
            let currCalc = calcTree.calc();
            if (currCalc === result) {
                console.log(`${calcTree.toString()} = ${currCalc}`);
            }
        }
    }
}

console.log(`Calculation done in ${Date.now() - startTime}`);
