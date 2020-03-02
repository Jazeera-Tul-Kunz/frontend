const LinkedList = require('../utils/linkedlist');

class Queue {
    constructor(data=null) {
        this.queue = new LinkedList(data);
    }

    enque(val) {
        this.queue.attach(val);
    }

    deque() {
        this.queue.behead();
    }

    size() {
        return this.queue.linkedlist.length;
    }
}

// q = new Queue(10);
// q.enque(20);
// q.enque(30);
// q.enque(40);
// console.log(q);
// q.deque();
// q.deque();
// console.log(q);
// x = q.size();
// console.log(x);

