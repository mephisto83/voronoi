import Edge from "./edge";
import { Site } from "./sites";
export default class HalfEdge {
    site: Site;
    edge: Edge;
    angle: number;
    constructor(edge: Edge, lSite: Site, rSite: Site);
    getStartpoint(): any;
    getEndpoint(): any;
}
