module.exports = {
    swapCount: 0,
    comparisonCount: 0,
    
    reset: function() {
        this.swapCount = 0;
        this.comparisonCount = 0;
    },
    
    getRandom: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    getRandomInt: function(min, max) {
        return Math.round(this.getRandom(min, max));
    },

    getRandomArray: function (len, min, max) {
        var array = [];
        for (var i = 0; i < len; i++) {
            array[i] = this.getRandom(min, max);
        }
        return array;
    },

    getRandomIntArray: function(len, min, max) {
        var array = [];
        for (var i = 0; i < len; i++) {
            array[i] = this.getRandomInt(min, max);
        }
        return array;
    },
    
    ascCompare: function(a, b) {
        return a < b ? -1 : (a == b ? 0 : 1);
    },

    descCompare: function(a, b) {
        return a > b ? -1 : (a == b ? 0 : 1);
    },
    
    compare: function(a, b) {
        return a < b ? -1 : (a == b ? 0 : 1);
    },

    swap: function(array, i, j) {
        if (i >= 0 && i < array.length && j >= 0 && j < array.length && i != j) {
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
            this.swapCount++;
        }
    },

    isBefore: function(a, b) {
        this.comparisonCount++;
        return this.compare(a, b) < 0;
    }
    
};