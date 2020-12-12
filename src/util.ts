import Edge from "./edge";

export default class Util {
    static calculateAngleBetweenEdges(edge1: Edge, edge2: Edge) {

        let zeroPoint = edge1.vb;
        var p1 = {
            x: edge1.va.x - zeroPoint.x,
            y: edge1.va.y - zeroPoint.y
        }


        var p2 = {
            x: edge2.vb.x - zeroPoint.x,
            y: edge2.vb.y - zeroPoint.y
        }

        // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        return {
            angleRadians,
            angleDeg
        }
    }
}