edges = [];
vertices = {}; // ex: 2 => Vertex(2)
groups = []; // 0 => [(0,1), (0,2)...]

function setup() {
    createCanvas(500, 500, WEBGL);
    strokeWeight(2);
    fill(220);
    stroke(220);

    edges = [[1, 2], [2, 3], [3, 4], [0, 6]];
    
    build_groups();
    build_vertices();
}

function draw() {
    background(240);

    draw_edges();
    draw_vertices();
}

function build_groups() {
    groupIndex = 0;
    groups[groupIndex] = [];

    edges.forEach((pair) => {
        found = false;
        for (let i = 0; i < groups.length; i++) {
            for (let insertedVertex in groups[i]) {
                v1 = pair[0];
                v2 = pair[1];
                if (v1 == insertedVertex[0] || v1 == insertedVertex[1] || v2 == insertedVertex[0] || v2 == insertedVertex[1]) {
                    groups[i].append(pair);
                    found = true;
                }
            }
        }
        if (!found) {
            groups[++groupIndex] = [];
            groups[groupIndex].append(pair);
        }
    });
}

function build_vertices() {
    let nbGroups = groups.length;
    var widths = [];
    groups.forEach(arr => {
        widths.append(arr.length * (100 / 2));
    });
    var w = width/150;
    var h = height/150;
    var top = false;

    visited = {};
    for (let i = 0; i < nbGroups; i++) {                // group i
        for (let j = 0; j < groups[i].length; j++) {    // element of group i
            for (let k = 0; k < 2; k++) {               // (x,y) tuple of element
                v = groups[i][j][k];
                if (visited[v] == null) {
                    visited[v] = true;
                    top = !top;
                    x = floor(w);
                    y = floor(top ? h / 2 : h * 2);
                    vertices[v] = new Vertex(x, y, v);
                    w += 50;
                }
            }
        }
    }
}

// function build_vertices() {
//     visited = {};
//     edges.forEach((pair) => {
//         for (let i = 0; i < pair.length; i++) {
//             v = pair[i];
//             if (visited[v] == null) {
//                 visited[v] = true;
//                 x = (floor(random(-width/3, width/3)) + width/150);
//                 y = (floor(random(-width/3, width/3)) + height/150);
//                 vertices[v] = new Vertex(x, y, v);
//             }
//         }
//     });
// }

function draw_edges() {
    beginShape(LINES);
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].length; j++) {
        pair = groups[i][j];

        vertex1 = vertices[pair[0]];
        vertex2 = vertices[pair[1]];
        vertex(vertex1.x, vertex1.y);
        vertex(vertex2.x, vertex2.y);
    } 
    endShape();
}

function draw_vertices() {
    for (v in vertices) {
        object = vertices[v];
        ellipse(object.x, object.y, 50, 50);
    }
}

// function is_spaced(x, y) {
//     for (let key in positions) {
//         pos = positions[key];
//         offset = 10;
//         if (dist(pos[0], pos[1], x, y) < offset)
//             return false;
//     }
//     return true;
// }
