edges = [];
vertices = {}; // ex: 2 => Vertex(2)

function setup() {
    createCanvas(500, 500, WEBGL);
    strokeWeight(2);
    fill(220);
    stroke(220);

    edges = [[1, 2], [2, 3], [3, 4], [0, 6]];

    build_vertices();
}

function draw() {
    background(240);

    draw_edges();
    draw_vertices();
}

function build_vertices() {
    visited = {};
    edges.forEach((pair) => {
        for (let i = 0; i < pair.length; i++) {
            v = pair[i];
            if (visited[v] == null) {
                visited[v] = true;
                x = (floor(random(-width/3, width/3)) + width/150);
                y = (floor(random(-width/3, width/3)) + height/150);
                vertices[v] = new Vertex(x, y, v);
            }
        }
    });
}

function draw_edges() {
    beginShape(LINES);
    for (let i = 0; i < edges.length; i++) {
        pair = edges[i];

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
