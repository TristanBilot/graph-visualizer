var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */
var labels = {};    /*   2  =>  Label(2)         */

var const_edgeSize          = 150;
var const_spacing           = 50;
var const_nbVertexPerLine   = 12;
var const_strokeWidth       = 2;

var strokeWidth         = const_strokeWidth;
var edgeSize            = const_edgeSize;
var spacing             = const_spacing;
var nbVertexPerLine     = const_nbVertexPerLine;

const fillCol           = 220;
const backgroundCol     = 255;
const canvasMargin      = 80;
const canvasPos         = {x:450, y:70};
const vertexSize        = 40;
const y_spacing         = 2.5 * edgeSize;

// const edges = [[54, 33],[233, 'tristan'],['A', 44],[22, 43],[18, 41],[19, 40], [10, 13], [1, 2], [2, 3], [3, 4], [4, 3], [14, 15], [16, 17]];
var edges = [];
var canvas;
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

    // var x = (windowWidth - width) / 2;
    canvas = createCanvas(width, height, WEBGL);
    canvas.position(canvasPos.x, canvasPos.y);
    initCanvas();
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

function initCanvas() {
    canvas.class("canvas");
}
