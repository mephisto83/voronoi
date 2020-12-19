import { Site } from "./sites";
import Vertex from "./vertex";
export default class Edge {
    lSite: Site;
    rSite: Site | null;
    va: Vertex | any;
    vb: Vertex | any;
    constructor(lSite: Site, rSite: Site | null);
}
