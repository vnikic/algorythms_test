"use strict";

class Heap {
    constructor(arr) {
        this.array = [];
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                this.insert(arr[i]);
            }
        }
    }

    parentIndex(i) {
        return Math.floor((i - 1)  / 2);
    }
    
    insert(el) {
        this.array.push(el);
        var lastIndex = this.array.length - 1;
        
        // find ancestor which is greater or equal to the new element
        var indexToMoveTo = lastIndex;
        while ( indexToMoveTo > 0 && this.array[this.parentIndex(indexToMoveTo)] < el ) {
            indexToMoveTo = this.parentIndex(indexToMoveTo);
        }
        // if ancestor is found move new element to it's place and push all ancestors on level down
        if (indexToMoveTo < lastIndex) {
            var i = lastIndex;
            while (i > indexToMoveTo) {
                var parentIndex = this.parentIndex(i);
                this.array[i] = this.array[parentIndex];
                i = parentIndex;
            }
            this.array[indexToMoveTo] = el;
        }
    }
    
    // removes biggest element from the heap and returns it    
    remove() {
        var len = this.array.length;
        if (len > 0) {
            var max = this.array[0];
            var last = this.array[this.array.length - 1];
            var idx = 0;
            var idxToMoveUp = 1;
            while (idxToMoveUp < len - 1) {
                if (idxToMoveUp < len - 2 && this.array[idxToMoveUp] < this.array[idxToMoveUp + 1]) {
                    idxToMoveUp++;
                }
                this.array[idx] = this.array[idxToMoveUp];
                idx = idxToMoveUp;
                idxToMoveUp = 2 * idxToMoveUp + 1;
            }
            this.array[idx] = last;
            this.array.splice(-1, 1);
            return max;
        }
        return null;
    }
    
    print() {
        console.log(this);
    }
    
    isEmpty() {
        return this.array.length == 0;
    }
}


var heap = new Heap([23, 56, 35, 21, 39, 71, 11, 17, 44, 27, 18]);

heap.print();

while (!heap.isEmpty()) {
    console.log(heap.remove());    
}
