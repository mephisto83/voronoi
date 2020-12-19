var Voronoi = require('./dist/voronoi').default
var Util = require('./dist/util').default

var voronoi = new Voronoi();
var bbox = { xl: 0, xr: 800, yt: 0, yb: 600 }; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [{ x: 200, y: 200, info: '1' }, { x: 50, y: 250, info: '2' }, { x: 400, y: 100, info: '3' } /* , ... */];

// a 'vertex' is an object exhibiting 'x' and 'y' properties. The
// Voronoi object will add a unique 'voronoiId' property to all
// sites. The 'voronoiId' can be used as a key to lookup the associated cell
// in diagram.cells.

var diagram = voronoi.compute(sites, bbox);
console.log(diagram)

console.log(diagram.cells[0])
console.log('----------------------------------------')
console.log(diagram.cells[0].halfedges[0].edge)
console.log('----------')
console.log(diagram.cells[0].halfedges[1].edge)