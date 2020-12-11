import { Site } from "./sites";

export default class Edge {
    lSite: Site;
    rSite: Site | null;
    va: any;
    vb: any;
    constructor(lSite: Site, rSite: Site | null) {
        this.lSite = lSite;
        this.rSite = rSite;
        this.va = this.vb = null;
    };
}