var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */

const canvasMargin      = 80;
const vertexSize        = 40;
const edgeSize          = 150;
const spacing           = 50;
const nbVertexPerLine   = 8;
const y_spacing         = 2.5 * edgeSize;

const edges = [[54, 33],[233, 'tristan'],['A', 44],[22, 43],[18, 41],[19, 40], [10, 13], [1, 2], [2, 3], [3, 4], [4, 3], [14, 15], [16, 17]];

const nbVertices        = nbDistinctVertices();
const maxVerticesRow    = nbVertices >= nbVertexPerLine ? nbVertexPerLine : nbVertices;
const nbRows            = Math.ceil(nbVertices / nbVertexPerLine);

/* ---- P5 functions ---- */
function setup() {
    init();
    style();
    build();
}

function draw() {
    background(240);
    drawEdges();
    drawVertices();
}
/* ----------- ----------- */

function init() {
    const width = calcCanvasWidth();
    const height = calcCanvasHeight();

    var x = (windowWidth - width) / 2;
    var y = 0;
    var canvas = createCanvas(width, height, WEBGL);
    canvas.position(x, y);
}

function style() {
    strokeWeight(2);
    fill(220);
    stroke(220);
}

function build() {
    buildGroups();
    sortGroups();
    buildVertices();
}
