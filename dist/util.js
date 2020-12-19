"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.calculateAngleBetweenEdges = function (edge1, edge2) {
        var zeroPoint = edge1.vb;
        var p1 = {
            x: edge1.va.x - zeroPoint.x,
            y: edge1.va.y - zeroPoint.y
        };
        var p2 = {
            x: edge2.vb.x - zeroPoint.x,
            y: edge2.vb.y - zeroPoint.y
        };
        // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        return {
            angleRadians: angleRadians,
            angleDeg: angleDeg
        };
    };
    return Util;
}());
exports.default = Util;
//# sourceMappingURL=util.js.map