const OP_PLUS = 0;
const OP_MINUS = 1;
const OP_MULT = 2;
const OP_DIV = 3;

const ALL_OPS = [OP_PLUS, OP_MINUS, OP_MULT, OP_DIV];


class CalcNode {
    constructor() {
        this.left = null;
        this.right = null;
    }

    getStrength() {
        return 10;
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

    toString() {
    }

    isNotDuplicate() {
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

    getStrength() {
        return this.operator;
    }

    getOpPrecedence() {
        return this.operator === OP_PLUS || this.operator === OP_MINUS ? 1 : 2;
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

        // remove commutative duplicates
        if (this.right.isLeaf() && !this.left.isLeaf() && this.left.right.isLeaf() && this.getOpPrecedence() === this.left.getOpPrecedence()) {
            if (this.left.right.num < this.right.num) {
                return NaN;
            }
        }

        switch (this.operator) {
            case OP_PLUS:
                if (this.left.isLeaf() === this.right.isLeaf() && leftCalc < rightCalc) {   // duplicate
                    return NaN;
                }
                return leftCalc + rightCalc;
            case OP_MINUS:
                return leftCalc > rightCalc ? leftCalc - rightCalc : NaN;
            case OP_MULT:
                if (this.left.isLeaf() === this.right.isLeaf() && leftCalc < rightCalc) {   // duplicate
                    return NaN;
                }
                return leftCalc !== 1 ? leftCalc * rightCalc : NaN;
            case OP_DIV:
                if (leftCalc >= rightCalc) {
                    let div = leftCalc / rightCalc;
                    return div % 1 === 0.0 ? div : NaN;
                }
                break;
        }
        return NaN;
    }

    getOperationSign() {
        switch (this.operator) {
            case OP_PLUS: return "+";
            case OP_MINUS: return "-";
            case OP_MULT: return "*";
            case OP_DIV: return "/";
        }
        return "#";
    }

    print() {
        let lp = this.left.isLeaf() ? "x" : this.left.print();
        let rp = this.right.isLeaf() ? "x" : this.right.print();
        return `${this.getOperationSign()}${lp}${rp}`;
    }

    toString() {
        let leftStr = this.left.toString();
        let rightStr = this.right.toString();
        switch (this.operator) {
            case OP_PLUS:
                return `${leftStr} + ${rightStr}`;
            case OP_MINUS:
                if (this.right.getStrength() <= 1) {
                    rightStr = "(" + rightStr + ")";
                }
                return `${leftStr} - ${rightStr}`;
            case OP_MULT:
                if (this.left.getStrength() <= 1) {
                    leftStr = "(" + leftStr + ")";
                }
                if (this.right.getStrength() <= 1) {
                    rightStr = "(" + rightStr + ")";
                }
                return `${leftStr} * ${rightStr}`;
            case OP_DIV:
                if (this.left.getStrength() <= 1) {
                    leftStr = "(" + leftStr + ")";
                }
                if (this.left.getStrength() <= 2) {
                    leftStr = "(" + leftStr + ")";
                }
                return `${leftStr} / ${rightStr}`;
        }
    }

    isNotDuplicate() {
        if ((this.operator === OP_PLUS || this.operator === OP_MULT) && this.left.isLeaf()) {
            return this.right.isLeaf();
        } else if (!this.right.isLeaf() && this.getOpPrecedence() === this.right.getOpPrecedence()) {
            return false;
        }
        return true;
    }

    defineCalcTreeNumberPlaceholders() {
        if (this.left === null) {
            this.setLeft(new NumberNode());
        } else {
            this.left.defineCalcTreeNumberPlaceholders();
        }
        if (this.right === null) {
            this.setRight(new NumberNode());
        } else {
            this.right.defineCalcTreeNumberPlaceholders();
        }
    }

    getOperationNodes() {
        let collectOperationNodes = (calcTree, collectedNodes) => {
            if (calcTree !== null && !calcTree.isLeaf()) {
                collectedNodes.push(calcTree);
                collectOperationNodes(calcTree.left, collectedNodes);
                collectOperationNodes(calcTree.right, collectedNodes);
            }
        };

        let opNodes = [];
        collectOperationNodes(this, opNodes);
        return opNodes;
    }

    getNumberNodes () {
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
        collectNumberNodes(this, opNodes);
        return opNodes;
    }
}


class NumberNode extends CalcNode {
    constructor() {
        super();
        this.num = NaN;
    }

    setNumber(num) {
        this.num = num;
    }

    isLeaf() {
        return true;
    }

    calc() {
        return this.num;
    }

    toString() {
        return this.num;
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
    rootNode.defineCalcTreeNumberPlaceholders();
    return rootNode;
};


let createExpressions = (n, nodes, calcTrees) => {
    if (n > 0) {
        for (let i = 0; i < nodes.length; i++) {
            let nodeToAppend = nodes[i];
            for (let j = 0; j <= 1; j++) {
                let newNode = nodeToAppend + j;
                if (nodes[nodes.length - 1] < newNode) {
                    nodes.push(newNode);
                    createExpressions(n - 1, nodes, calcTrees);
                    nodes.pop();
                }
            }
        }
    } else {
        calcTrees.push(createCalcTree(nodes));
    }
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


let areOperationsValid = (opNodes) => {
    for (let ii = 0; ii < opNodes.length; ii++) {      // eliminate some of duplicate expressions this way
        if (!opNodes[ii].isNotDuplicate()) {
            return false;
        }
    }
    return true;
};


let findMyNumber = (nums, result) => {
    let startTime = Date.now();

    let count = 0;

    nums.sort();

    let bestMatch = -1;
    let bestExpression = null;

    for (let opCount = 0; opCount <= nums.length - 2; opCount++) {
        let expressions = [];
        createExpressions(opCount, [""], expressions);
        let opSequences = getAllOperationSequences(opCount + 1);
        let numSequences = getAllNumberSequences(opCount + 2, nums);

        for (let i = 0; i < expressions.length; i++) {
            let expression = expressions[i];
            let opNodes = expression.getOperationNodes();
            let numNodes = expression.getNumberNodes();

            for (let j = 0; j < opSequences.length; j++) {
                setOperations(opNodes, opSequences[j]);
                if (areOperationsValid(opNodes)) {
                    for (let k = 0; k < numSequences.length; k++) {
                        setNumbers(numNodes, numSequences[k]);
                        let currCalc = expression.calc();
                        if (!isNaN(currCalc)) {
                            if (currCalc === result) {
                                count++;
                                console.log(`${expression.toString()} = ${currCalc}`);
                            }
                            if (count === 0 && Math.abs(result - bestMatch) > Math.abs(currCalc - result)) {
                                bestMatch = currCalc;
                                bestExpression = expression.toString();
                            }
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
};



// TESTING

// findMyNumber([3, 5, 7, 1, 10, 75], 8);
findMyNumber([3, 5, 7, 1, 10, 75], 1024);
// findMyNumber([3, 1, 8, 8, 10, 75], 977);
// findMyNumber([2, 2, 8, 8, 11, 34], 1183);

