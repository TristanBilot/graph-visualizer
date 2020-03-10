var vertices = {};  /*   2  =>  Vertex(2)        */
var groups = [];    /*  [0] => [(0,1), (0,2)]    */

const canvasMargin = 125;
const spacing = 50;
const edges = [[10, 4], [10, 13], [1, 2], [2, 3], [3, 4], [4, 6], [14, 15], [16, 17]];

function setup() {
    const width = calcCanvasWidth();
    const height = 500;

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
    return 2 * canvasMargin + (edges.length+1) * spacing;
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
    var midX = -canvasMargin * edges.length / 4;
    var top = true;

    visited = {};
    for (let i = 0; i < nbGroups; i++) {                /* group i */
        for (let j = 0; j < groups[i].length; j++) {    /* element of group i */
            for (let k = 0; k < 2; k++) {               /* (x,y) tuple of element */
                v = groups[i][j][k];
                if (visited[v] == null) {
                    visited[v] = true;
                    top = !top;
                    x = floor(midX);
                    y = floor(top ? (height / 4) : (-height / 4));
                    vertices[v] = new Vertex(x, y, v);
                    midX += spacing;
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
        ellipse(object.x, object.y, 50, 50);
    }
}

function twoPairsMatch(vertex, pair) {
    return (pair[0] == vertex[0] || 
            pair[0] == vertex[1] || 
            pair[1] == vertex[0] || 
            pair[1] == vertex[1]
        )
}
