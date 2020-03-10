var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */
var nbRows;
var nbVertices;

const canvasMargin      = 80;
const vertexSize        = 50;
const edgeSize          = 150;
const spacing           = 50;
const nbVertexPerLine   = 10;

const edges = [[54, 33],[23, 90],[24, 44],[22, 43],[18, 41],[19, 40], [10, 13], [1, 2], [2, 3], [3, 4], [4, 6], [14, 15], [16, 17], [56, 57],[58, 59],[60, 461], [62, 63], [63, 70]];

function setup() {
    nbVertices = nbDistinctVertices();
    nbRows = Math.ceil(nbVertices / nbVertexPerLine + 1);

    const width = calcCanvasWidth();
    const height = calcCanvasHeight();

    createCanvas(width, height, WEBGL);
    strokeWeight(2);
    fill(220);
    stroke(220);
    
    buildGroups();
    console.log(groups);
    buildVertices();
}

function draw() {
    background(240);

    drawEdges();
    drawVertices();
}

function calcCanvasWidth() {
    return 2 * canvasMargin + edges.length * (spacing + vertexSize / 2); // a modifier avec nbVertices
}

function calcCanvasHeight() {
    return 2 * nbRows * (edgeSize + vertexSize);
}

function nbDistinctVertices() {
    s = {};
    for (let i = 0; i < edges.length; i++)
        for (let j = 0; j < 2; j++)
            s[edges[i][j]] = true;
    return Object.keys(s).length;
}

function buildGroups() {
    groupIndex = 0;
    edges.forEach((pair) => {
        found = false;
        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].length; j++) {
                /* each vertex is compared to the pair */
                let currentPair = groups[i][j];
                if (twoPairsMatch(currentPair, pair)) {
                    groups[i].push(pair);
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            groups[groupIndex] = [];
            groups[groupIndex++].push(pair);
        }
    });
}

function buildVertices() {
    let nbGroups = groups.length;
    var widths = [];
    groups.forEach(arr => {
        widths.push(arr.length * (100 / 2));
    });
    var originX = -(canvasMargin * edges.length) / 2;
    var originY = -(edgeSize + vertexSize * 2) * nbRows / 2;
    var top = true;

    visited = {};
    nbPush = 0;
    for (let i = 0; i < nbGroups; i++) {                /* group i */
        for (let j = 0; j < groups[i].length; j++) {    /* element of group i */
            for (let k = 0; k < 2; k++) {               /* (x,y) tuple of element */
                v = groups[i][j][k];
                if (visited[v] == null) {
                    visited[v] = true;
                    top = !top;
                    x = floor(originX);
                    y = floor(top ? (originY + edgeSize) : (originY - edgeSize));
                    vertices[v] = new Vertex(x, y, v);
                    originX += spacing;
                    nbPush++;
                }
                if (nbPush % 10 == 0) {
                    originX = -canvasMargin * edges.length / 2;
                    originY += (2.5 * edgeSize);
                }
            }
        }
    }
}

function drawEdges() {
    beginShape(LINES);
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].length; j++) {
        pair = groups[i][j];

        vertex1 = vertices[pair[0]];
        vertex2 = vertices[pair[1]];
        vertex(vertex1.x, vertex1.y);
        vertex(vertex2.x, vertex2.y);
        }
    } 
    endShape();
}

function drawVertices() {
    for (v in vertices) {
        object = vertices[v];
        ellipse(object.x, object.y, vertexSize, vertexSize);
    }
}

function twoPairsMatch(vertex, pair) {
    return (pair[0] == vertex[0] || 
            pair[0] == vertex[1] || 
            pair[1] == vertex[0] || 
            pair[1] == vertex[1]
        )
}
