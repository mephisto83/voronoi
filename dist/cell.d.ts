import HalfEdge from "./halfedge";
import { Site } from "./sites";
export default class Cell {
    site: Site;
    halfedges: HalfEdge[];
    closeMe: any;
    constructor(site: Site);
    init(site: Site): this;
    prepareHalfedges(): number;
    getNeighborIds(): number[];
    getBbox(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    pointIntersection(x: any, y: any): 0 | 1 | -1;
}
