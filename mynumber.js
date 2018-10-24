let OPERATOR_NONE = 0;
let OPERATOR_PLUS = 1;
let OPERATOR_MINUS = 2;
let OPERATOR_MULTIPLICATION = 3;
let OPERATOR_DIVIDE = 4;

let ALL_OPERATORS = [OPERATOR_NONE, OPERATOR_PLUS, OPERATOR_MINUS, OPERATOR_MULTIPLICATION, OPERATOR_DIVIDE];

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
}


class OperatorNode extends CalcNode {
    setOperator(op) {
        this.operator = op;
    }

    calc() {
        switch (this.operator) {
            case OPERATOR_NONE:
                if (this.left) {
                    return this.left.calc();
                }
                break;
            case OPERATOR_PLUS:
                if (this.left && this.right) {
                    return this.left.calc() + this.right.calc();
                }
                break;
            case OPERATOR_MINUS:
                if (this.left && this.right) {
                    return this.left.calc() - this.right.calc();
                }
                break;
            case OPERATOR_MULTIPLICATION:
                if (this.left && this.right) {
                    return this.left.calc() * this.right.calc();
                }
                break;
            case OPERATOR_DIVIDE:
                if (this.left && this.right) {
                    let x = this.right.calc();
                    return x !== 0 ? this.left.calc() / x : NaN;
                }
                break;
        }
        return NaN;
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

let addNumberToCalcTree = (calcTree, num) => {
    let inserted  = false;
    if (!calcTree.isLeaf() && calcTree.left === null) {
        calcTree.setLeft(new NumberNode(num));
        inserted  = true;
    } else if (!calcTree.isLeaf() && calcTree.right === null) {
        calcTree.setRight(new NumberNode(num));
        inserted  = true;
    }
    if (!inserted) {
        inserted = addNumberToCalcTree(calcTree.left, num);
        if (!inserted) {
            inserted = addNumberToCalcTree(calcTree.right, num);
        }
    }
    return inserted;
};

let addNumbersToCalcTree = (calcTree, numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        addNumberToCalcTree(calcTree, numbers[i]);
    }
};


let calcTrees = [];
createCalcTrees(4, [""], calcTrees);

addNumbersToCalcTree(calcTrees[0], [10, 5, 76, 34, 11, 22]);

console.log(calcTrees[0]);


