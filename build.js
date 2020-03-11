function buildGroups() {
    if (edges == null)
        return;
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
    var originY = -(height / 2) + edgeSize + vertexSize + canvasMargin;
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
