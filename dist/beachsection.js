"use strict";
// ---------------------------------------------------------------------------
// Beachline methods
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rbtree_1 = __importDefault(require("./rbtree"));
// rhill 2011-06-07: For some reasons, performance suffers significantly
// when instanciating a literal object instead of an empty ctor
var Beachsection = /** @class */ (function (_super) {
    __extends(Beachsection, _super);
    function Beachsection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Beachsection;
}(rbtree_1.default));
exports.default = Beachsection;
//# sourceMappingURL=beachsection.js.map