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
        ellipse(object.x, object.y, object.size, object.size);
    }
}