import CircleEvent from "./circleevent";
import Edge from "./edge";

export default class RBTree {

    // ---------------------------------------------------------------------------
    // Red-Black tree code (based on C version of "rbtree" by Franck Bui-Huu
    // https://github.com/fbuihuu/libtree/blob/master/rb.c
    root: RBTree | null = null;
    rbPrevious: RBTree | null = null;
    rbNext: RBTree | null = null;
    rbLeft: RBTree | null = null;
    rbRight: RBTree | null = null;
    rbParent: RBTree | null = null;
    circleEvent?: CircleEvent;
    rbRed: boolean;
    edge?: Edge;
    arc: any;
    site?: any;
    x: number;
    y: number;
    ycenter: number;
    constructor() {
        // rhill 2013-10-12: it helps to state exactly what we are at ctor time.
        this.arc = null;
        this.rbLeft = null;
        this.rbNext = null;
        this.rbParent = null;
        this.rbPrevious = null;
        this.rbRed = false;
        this.rbRight = null;
        this.site = null;
        this.root = null;
        this.rbRed = false;
        this.x = this.y = this.ycenter = 0;
    };
    rbInsertSuccessor(node: RBTree | null, successor: RBTree) {
        var parent;
        if (node) {
            // >>> rhill 2011-05-27: Performance: cache previous/next nodes
            successor.rbPrevious = node;
            successor.rbNext = node.rbNext;
            if (node.rbNext) {
                node.rbNext.rbPrevious = successor;
            }
            node.rbNext = successor;
            // <<<
            if (node.rbRight) {
                // in-place expansion of node.rbRight.getFirst();
                node = node.rbRight;
                while (node.rbLeft) { node = node.rbLeft; }
                node.rbLeft = successor;
            }
            else {
                node.rbRight = successor;
            }
            parent = node;
        }
        // rhill 2011-06-07: if node is null, successor must be inserted
        // to the left-most part of the tree
        else if (this.root) {
            node = this.getFirst(this.root);
            // >>> Performance: cache previous/next nodes
            successor.rbPrevious = null;
            successor.rbNext = node;
            node.rbPrevious = successor;
            // <<<
            node.rbLeft = successor;
            parent = node;
        }
        else {
            // >>> Performance: cache previous/next nodes
            successor.rbPrevious = successor.rbNext = null;
            // <<<
            this.root = successor;
            parent = null;
        }
        successor.rbLeft = successor.rbRight = null;
        successor.rbParent = parent;
        successor.rbRed = true;
        // Fixup the modified tree by recoloring nodes and performing
        // rotations (2 at most) hence the red-black tree properties are
        // preserved.
        var grandpa, uncle;
        node = successor;
        while (parent && parent.rbRed) {
            grandpa = parent.rbParent;
            if (grandpa && parent === grandpa.rbLeft) {
                uncle = grandpa.rbRight;
                if (uncle && uncle.rbRed) {
                    parent.rbRed = uncle.rbRed = false;
                    grandpa.rbRed = true;
                    node = grandpa;
                }
                else {
                    if (node === parent.rbRight) {
                        this.rbRotateLeft(parent);
                        node = parent;
                        parent = node.rbParent;
                    }
                    if (parent)
                        parent.rbRed = false;
                    grandpa.rbRed = true;
                    this.rbRotateRight(grandpa);
                }
            }
            else {
                if (!grandpa) {
                    throw new Error('grandpa should not be null')
                }
                uncle = grandpa.rbLeft;
                if (uncle && uncle.rbRed) {
                    parent.rbRed = uncle.rbRed = false;
                    grandpa.rbRed = true;
                    node = grandpa;
                }
                else {
                    if (node === parent.rbLeft) {
                        this.rbRotateRight(parent);
                        node = parent;
                        parent = node.rbParent;
                    }
                    if (!parent) {
                        throw new Error('parent should not be null')
                    }
                    parent.rbRed = false;
                    grandpa.rbRed = true;
                    this.rbRotateLeft(grandpa);
                }
            }
            parent = node.rbParent;
        }
        if (!this.root) {
            throw new Error('this.root should not be null')
        }
        this.root.rbRed = false;
    };

    rbRemoveNode(node: RBTree | null) {
        // >>> rhill 2011-05-27: Performance: cache previous/next nodes
        if (!node) {
            throw new Error('node should not be null')
        }
        if (node.rbNext) {
            node.rbNext.rbPrevious = node.rbPrevious;
        }
        if (node.rbPrevious) {
            node.rbPrevious.rbNext = node.rbNext;
        }
        node.rbNext = node.rbPrevious = null;
        // <<<
        var parent = node.rbParent,
            left = node.rbLeft,
            right = node.rbRight,
            next;
        if (!left) {
            next = right;
        }
        else if (!right) {
            next = left;
        }
        else {
            next = this.getFirst(right);
        }
        if (parent) {
            if (parent.rbLeft === node) {
                parent.rbLeft = next;
            }
            else {
                parent.rbRight = next;
            }
        }
        else {
            this.root = next;
        }
        // enforce red-black rules
        var isRed;
        if (left && right) {
            if (!next) {
                throw new Error('should not be null')
            }
            isRed = next.rbRed;
            next.rbRed = node.rbRed;
            next.rbLeft = left;
            left.rbParent = next;
            if (next !== right) {
                parent = next.rbParent;
                next.rbParent = node.rbParent;
                node = next.rbRight;
                if (!parent) { throw new Error('should not be null') }
                parent.rbLeft = node;
                next.rbRight = right;
                right.rbParent = next;
            }
            else {
                next.rbParent = parent;
                parent = next;
                node = next.rbRight;
            }
        }
        else {
            isRed = node.rbRed;
            node = next;
        }
        // 'node' is now the sole successor's child and 'parent' its
        // new parent (since the successor can have been moved)
        if (node) {
            node.rbParent = parent;
        }
        // the 'easy' cases
        if (isRed) { return; }
        if (node && node.rbRed) {
            node.rbRed = false;
            return;
        }
        // the other cases
        var sibling;
        do {
            if (node === this.root) {
                break;
            }
            if (parent && node === parent.rbLeft) {
                sibling = parent.rbRight;
                if (!sibling) {
                    throw new Error('sibling should not be null')
                }
                if (sibling.rbRed) {
                    sibling.rbRed = false;
                    parent.rbRed = true;
                    this.rbRotateLeft(parent);
                    sibling = parent.rbRight;
                }
                if (!sibling) {
                    throw new Error('sibling should not be null')
                }
                if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
                    if (!sibling.rbRight || !sibling.rbRight.rbRed) {
                        if (!sibling.rbLeft) {
                            throw new Error('sibling.rbLeft should not be null')
                        }
                        sibling.rbLeft.rbRed = false;
                        sibling.rbRed = true;
                        this.rbRotateRight(sibling);
                        sibling = parent.rbRight;
                    }
                    if (!sibling) {
                        throw new Error('sibling should not be null')
                    }
                    sibling.rbRed = parent.rbRed;
                    if (!sibling.rbRight) {
                        throw new Error('sibling.rbRight should not be null')
                    }
                    parent.rbRed = sibling.rbRight.rbRed = false;
                    this.rbRotateLeft(parent);
                    node = this.root;
                    break;
                }
            }
            else {
                if (!parent) {
                    throw new Error('parent should not be null')
                }
                sibling = parent.rbLeft;

                if (!sibling) {
                    throw new Error('sibling should not be null')
                }
                if (sibling.rbRed) {
                    sibling.rbRed = false;
                    parent.rbRed = true;
                    this.rbRotateRight(parent);
                    sibling = parent.rbLeft;
                }

                if (!sibling) {
                    throw new Error('sibling should not be null')
                }
                if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
                    if (!sibling.rbLeft || !sibling.rbLeft.rbRed) {

                        if (!sibling.rbRight) {
                            throw new Error('sibling.rbRight should not be null')
                        }
                        sibling.rbRight.rbRed = false;
                        sibling.rbRed = true;
                        this.rbRotateLeft(sibling);
                        sibling = parent.rbLeft;
                    }

                    if (!sibling) {
                        throw new Error('sibling should not be null')
                    }
                    sibling.rbRed = parent.rbRed;
                    if (!sibling.rbLeft) {
                        throw new Error('sibling.rbLeft should not be null')
                    }

                    parent.rbRed = sibling.rbLeft.rbRed = false;

                    this.rbRotateRight(parent);
                    node = this.root;
                    break;
                }
            }
            sibling.rbRed = true;
            node = parent;
            parent = parent.rbParent;
        } while (!node.rbRed);
        if (node) { node.rbRed = false; }
    };

    rbRotateLeft(node: RBTree) {
        var p = node,
            q = node.rbRight, // can't be null
            parent = p.rbParent;
        if (parent) {
            if (parent.rbLeft === p) {
                parent.rbLeft = q;
            }
            else {
                parent.rbRight = q;
            }
        }
        else {
            this.root = q;
        }

        if (!q) {
            throw new Error('q should not be null')
        }
        q.rbParent = parent;
        p.rbParent = q;
        p.rbRight = q.rbLeft;
        if (p.rbRight) {
            p.rbRight.rbParent = p;
        }
        q.rbLeft = p;
    };

    rbRotateRight(node: RBTree) {
        var p = node,
            q = node.rbLeft, // can't be null
            parent = p.rbParent;
        if (parent) {
            if (parent.rbLeft === p) {
                parent.rbLeft = q;
            }
            else {
                parent.rbRight = q;
            }
        }
        else {
            this.root = q;
        }
        if (!q) {
            throw new Error('q should not be null')
        }

        q.rbParent = parent;
        p.rbParent = q;
        p.rbLeft = q.rbRight;
        if (p.rbLeft) {
            p.rbLeft.rbParent = p;
        }
        q.rbRight = p;
    };

    getFirst(node: RBTree) {
        while (node.rbLeft) {
            node = node.rbLeft;
        }
        return node;
    };

    getLast(node: RBTree) {
        while (node.rbRight) {
            node = node.rbRight;
        }
        return node;
    };

}