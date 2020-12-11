export type Sites = Site[]

export interface Site {
    x: number;
    y: number;
    voronoiId: number;
    // [{x:300,y:300}, {x:100,y:100}, {x:200,y:500}, {x:250,y:450}, {x:600,y:150}]
}