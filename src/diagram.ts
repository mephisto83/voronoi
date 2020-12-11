

// ---------------------------------------------------------------------------
// Diagram methods

import { Site } from "./sites";

export default class Diagram {
    site?: Site;
    cells: any;
    edges: any;
    vertices: any;
    execTime: number = 0;
    constructor(site?: Site) {
        this.site = site;
    };
}