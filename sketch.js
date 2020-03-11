var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */

const canvasMargin      = 80;
const vertexSize        = 50;
const edgeSize          = 150;
const spacing           = 50;
const nbVertexPerLine   = 8;
const y_spacing         = 2.5 * edgeSize;

const edges = [[54, 33],[23, 90],[24, 44],[22, 43],[18, 41],[19, 40], [10, 13], [1, 2], [2, 3], [3, 4], [4, 3], [14, 15], [16, 17]];

const nbVertices        = nbDistinctVertices();
const maxVerticesRow    = nbVertices >= nbVertexPerLine ? nbVertexPerLine : nbVertices;
const nbRows            = Math.ceil(nbVertices / nbVertexPerLine);

function setup() {
    const width = calcCanvasWidth();
    const height = calcCanvasHeight();

    var x = (windowWidth - width) / 2;
    var y = 0;
    var canvas = createCanvas(width, height, WEBGL);
    canvas.position(x, y);

    strokeWeight(2);
    fill(220);
    stroke(220);
    
    buildGroups();
    sortGroups();
    buildVertices();
    console.log(groups);
}

function draw() {
    background(240);

    drawEdges();
    drawVertices();
}

function calcCanvasWidth() {
    return 2 * canvasMargin + ((maxVerticesRow - 1) * spacing); // a modifier avec nbVertices
}

function calcCanvasHeight() {
    return nbRows * (edgeSize + vertexSize) + (nbRows * y_spacing / 2);
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
    const nbGroups = groups.length;
    const fixedOriginX = -(width / 2) + canvasMargin;
    var originX = fixedOriginX;
    var originY = -(height / 2) + edgeSize + vertexSize;
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

                    if (nbPush % nbVertexPerLine == 0) {
                        originX = fixedOriginX;
                        originY += y_spacing;
                    }
                }
            }
        }
    }
}

function sortGroups(descending = true) {
    groups.sort((groupA, groupB) => {
        if (descending)
            return groupB.length - groupA.length;
        return groupA.length - groupB.length;
    });
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
