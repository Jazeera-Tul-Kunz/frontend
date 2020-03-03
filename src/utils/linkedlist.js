class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor(val=null) {
        this.linkedlist = [];
        this.head = new Node(val);
        this.linkedlist.push(this.head.value);
        this.tail = this.head; //initial linked list only one entry
    }

    attach(val) {
        if (!this.size()) {
            this.head = new Node(val);
            this.tail = this.head;
        }

        const node = new Node(val);
        // node.prev = this.tail;
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = this.tail.next;
        this.linkedlist.push(this.tail.value);
    }

    detach() {
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
        this.linkedlist.pop();
    }

    insert(val) {
        const node = new Node(val);
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        this.linkedlist.unshift(node.value);
    }

    behead() {
        if (this.size() <= 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head.next.prev = null;
            this.head = this.head.next;
            return this.linkedlist.shift();
        }
    }

    size() {
        return this.linkedlist.length
    }

    print() {
        let node = this.head;
        while (node) {
            console.log(node);
            node = node.next;
        }
    }
}

module.exports = LinkedList;

// ll = new LinkedList(10);

// ll.attach(20);
// ll.attach(30);
// ll.attach(40);
// ll.attach(1);
// ll.attach(2);
// ll.attach(3);
// ll.insert(50);
// ll.insert(60);
// ll.insert(70);
// ll.insert(80);
// ll.insert(90);
// console.log(ll.linkedlist)
// ll.detach();
// ll.detach();
// ll.detach();
// ll.behead();
// ll.behead();
// console.log(ll.linkedlist);







