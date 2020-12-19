import CircleEvent from "./circleevent";
import Edge from "./edge";
export default class RBTree {
    root: RBTree | null;
    rbPrevious: RBTree | null;
    rbNext: RBTree | null;
    rbLeft: RBTree | null;
    rbRight: RBTree | null;
    rbParent: RBTree | null;
    circleEvent?: CircleEvent;
    rbRed: boolean;
    edge?: Edge;
    arc: any;
    site?: any;
    x: number;
    y: number;
    ycenter: number;
    constructor();
    rbInsertSuccessor(node: RBTree | null, successor: RBTree): void;
    rbRemoveNode(node: RBTree | null): void;
    rbRotateLeft(node: RBTree): void;
    rbRotateRight(node: RBTree): void;
    getFirst(node: RBTree): RBTree;
    getLast(node: RBTree): RBTree;
}
