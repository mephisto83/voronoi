import Cell from "./cell";
import Edge from "./edge";
import { Site } from "./sites";
import Vertex from "./vertex";
export default class Diagram {
    site?: Site;
    cells?: Cell[];
    edges?: Edge[];
    vertices?: Vertex[];
    execTime: number;
    constructor(site?: Site);
}
