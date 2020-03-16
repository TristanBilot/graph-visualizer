var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */
var labels = {};    /*   2  =>  Label(2)         */

const strokeWidth       = 2;
const fillCol           = 220;
const backgroundCol     = 240;

const canvasMargin      = 80;
const vertexSize        = 40;
const edgeSize          = 150;
const spacing           = 50;
const nbVertexPerLine   = 12;
const y_spacing         = 2.5 * edgeSize;

// const edges = [[54, 33],[233, 'tristan'],['A', 44],[22, 43],[18, 41],[19, 40], [10, 13], [1, 2], [2, 3], [3, 4], [4, 3], [14, 15], [16, 17]];
var edges = [];

var nbVertices        = nbDistinctVertices();
var maxVerticesRow    = nbVertices >= nbVertexPerLine ? nbVertexPerLine : nbVertices;
var nbRows            = Math.ceil(nbVertices / nbVertexPerLine);

/* ---- P5 functions ---- */
function setup() {
    updateConstants();
    init();
    style();
    build();
}

function draw() {
    background(backgroundCol);
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
    strokeWeight(strokeWidth);
    fill(fillCol);
    stroke(fillCol);
}

function build() {
    buildGroups();
    sortGroups();
    buildVertices();
}

function updateConstants() {
    nbVertices        = nbDistinctVertices();
    maxVerticesRow    = nbVertices >= nbVertexPerLine ? nbVertexPerLine : nbVertices;
    nbRows            = Math.ceil(nbVertices / nbVertexPerLine);
}
