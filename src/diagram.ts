

// ---------------------------------------------------------------------------
// Diagram methods

import Cell from "./cell";
import Edge from "./edge";
import { Site } from "./sites";
import Vertex from "./vertex";

export default class Diagram {
    site?: Site;
    cells?: Cell[];
    edges?: Edge[];
    vertices?: Vertex[];
    execTime: number = 0;
    constructor(site?: Site) {
        this.site = site;
    };
}