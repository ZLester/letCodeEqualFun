class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedStack {
    constructor () {
        this.head = null;
        this.length = 0;
    }

    push (value) {
        const node = new Node(value);

        if (this.head === null) {
            this.head = node;
            this.length++;

            return this;
        }

        node.next = this.head;
        this.head = node;
        this.length++;

        return this;
    }

    pop () {
        if (this.head === null) {
            return;
        }

        const head = this.head;

        this.head = this.head.next;
        this.length--;

        return head.value;
    }

    peek () {
        return this.head && this.head.value;
    }

    // has (value) {
    //     let cur = this.head;

    //     while (cur) {
    //         if (cur.value === value) {
    //             return true;
    //         }

    //         cur = cur.next;
    //     }

    //     return false;
    // }

    has (value) {
        for (const curValue of this) {
            if (value === curValue) {
                return true;
            }
        }

        return false;
    }

        // [Symbol.iterator] () {
    //     let cur = this.head;
        
    //     return {
    //         next () {
    //             if (cur === null) {
    //                 return { done: true };
    //             }
                
    //             const value = cur.value;
    //             cur = cur.next;

    //             return {
    //                 value,
    //                 done: false,
    //             };
    //         }
    //     };
    // }

    * [Symbol.iterator] () {
        let cur = this.head;

        while (cur) {
            yield cur.value;

            cur = cur.next;
        }
    }

    forEach (callback) {
        let i = 0;

        for (const value of this) {
            callback(value, i, this);
            i++;
        }
    }

    map (callback) {
        const list = new LinkedStack();

        this.forEach((value, i, col) => {
            list.push(callback(value, i, col));
        });

        return list;
    }

    reduce (callback, initialValue) {
        if (!this.head) {
            return initialValue;
        }

        let acc = initialValue;
        let cur = this.head;
        let i = 0;

        if (initialValue === undefined) {
            acc = cur.value;
            cur = cur.next;
            i = 1;
        }

        while (cur) {
            acc = callback(acc, cur.value, i, this);
            cur = cur.next;
            i++;
        }

        return acc;
    }
}

const test = () => {
    const testProperties = () => {
        const list = new LinkedStack();
    
        console.assert(
            list.length === 0,
            '.length should be 0',
            {
                expect: 0,
                actual: list.length,
            },
        );
    
        console.assert(
            list.head === null,
            '.head should be null',
            {
                expect: null,
                actual: list.head,
            },
        );
    
        console.assert(
            typeof list.pop === 'function',
            '.pop should be a function',
            {
                expect: 'function',
                actual: typeof list.pop,
            }
        );
    
        console.assert(
            typeof list.push === 'function',
            '.push should be a function',
            {
                expect: 'function',
                actual: typeof list.push,
            }
        );
    
        console.assert(
            typeof list.peek === 'function',
            '.peek should be a function',
            {
                expect: 'function',
                actual: typeof list.peek,
            }
        );
    
        console.assert(
            typeof list.has === 'function',
            '.has should be a function',
            {
                expect: 'function',
                actual: typeof list.has,
            }
        );
    };
    
    const testPush = () => {
        const list = new LinkedStack();
    
        list.push(1);
    
        console.assert(
            list.head !== null,
            '.head should not be null',
            {
                expect: null,
                actual: list.head,
            }
        );
    
        console.assert(
            list.head.value === 1,
            '.head.value should be 1',
            {
                expect: 1,
                actual: list.head.value,
            }
        );
    
        console.assert(
            list.length === 1,
            '.length should be 1',
            {
                expect: 1,
                actual: list.length,
            }
        );
    
        list.push(2);
    
        console.assert(
            list.head.value === 2,
            '.head.value should be 2',
            {
                expect: 1,
                actual: list.head.value,
            }
        );
    
        console.assert(
            list.length === 2,
            '.length should be 2',
            {
                expect: 2,
                actual: list.length,
            }
        );
    };
    
    const testPop = () => {
        const list = new LinkedStack();

        list.push(1);
        list.push(2);
        list.push(3);

        console.assert(
            list.head.value === 3,
            '.head.value should be 3',
            {
                expect: 3,
                actual: list.length,
            }
        );

        console.assert(
            list.length === 3,
            '.length should be 3',
            {
                expect: 3,
                actual: list.length,
            }
        );

        const popThree = list.pop();

        console.assert(
            popThree === 3,
            'list.pop() should be 3',
            {
                expect: 3,
                actual: popThree,
            }
        );

        console.assert(
            list.length === 2,
            '.length should be 2',
            {
                expect: 2,
                actual: list.length,
            }
        );

        list.pop()

        const popOne = list.pop();

        console.assert(
            popOne === 1,
            'list.pop() should be 1',
            {
                expect: 1,
                actual: popOne,
            }
        );

        console.assert(
            list.length === 0,
            '.length should be 0',
            {
                expect: 0,
                actual: list.length,
            }
        );
    };

    const testPeek = () => {
        const list = new LinkedStack();

        console.assert(
            list.peek() === null,
            '.peek() should return null',
            {
                expect: null,
                actual: list.peek(),
            }
        );

        list.push(1);
        
        console.assert(
            list.peek() === 1,
            '.peek() should return 1',
            {
                expect: 1,
                actual: list.peek(),
            }
        );

        list.push(2);
        list.push(3);

        console.assert(
            list.peek() === 3,
            '.peek() should return 3',
            {
                expect: 3,
                actual: list.peek(),
            }
        );
    };

    const testHas = () => {
        const list = new LinkedStack();

        console.assert(
            list.has(1) === false,
            '.has(1) should return false',
            {
                expect: false,
                actual: list.has(1),
            }
        );

        list.push(1);

        console.assert(
            list.has(1) === true,
            '.has(1) should return true',
            {
                expect: true,
                actual: list.has(1),
            }
        );

        list.push(2);
        list.push(3);

        console.assert(
            list.has(0) === false,
            '.has(0) should return false',
            {
                expect: false,
                actual: list.has(0),
            }
        );

        console.assert(
            list.has(2) === true,
            '.has(2) should return true',
            {
                expect: true,
                actual: list.has(2),
            }
        );

        console.assert(
            list.has(3) === true,
            '.has(3) should return true',
            {
                expect: true,
                actual: list.has(3),
            }
        );
    };

    testProperties();
    testPush();
    testPop();
    testPeek();
    testHas();
};

test();
