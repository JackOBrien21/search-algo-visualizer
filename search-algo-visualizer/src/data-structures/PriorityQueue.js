class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }
  
    size() {
        return this._heap.length;
    }
  
    isEmpty() {
        return this.size() == 0;
    }
  
    peek() {
        return this._heap[0];
    }
  
    push(value) {
        this._heap.push(value);
        this._heap.sort(this._comparator);
    }
  
    pop() {
        return this._heap.shift();
    }
  }

export default PriorityQueue;