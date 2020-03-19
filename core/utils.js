function calcCanvasWidth() {
    return 2 * canvasMargin + ((maxVerticesRow - 1) * spacing);
}

function calcCanvasHeight() {
    return 2 * canvasMargin + nbRows * (edgeSize + vertexSize) + (nbRows * y_spacing / 2);
}

function nbDistinctVertices() {
    if (edges == null)
        return 0;
    s = {};
    for (let i = 0; i < edges.length; i++)
        for (let j = 0; j < 2; j++)
            s[edges[i][j]] = true;
    return Object.keys(s).length;
}

function sortGroups(descending = true) {
    groups.sort((groupA, groupB) => {
        if (descending)
            return groupB.length - groupA.length;
        return groupA.length - groupB.length;
    });
}

function twoPairsMatch(vertex, pair) {
    return (pair[0] == vertex[0] ||
            pair[0] == vertex[1] ||
            pair[1] == vertex[0] ||
            pair[1] == vertex[1]
        )
}

function removeLabels() {
    for (e in labels) {
        arr = labels[e];
        toDelete = false;
        if (vertices[e] == null) {
            toDelete = true;
            for (let j = 0; j < arr.length; j++)
                arr[j].remove();
        }
        if (toDelete)
            delete labels[e];
    }
}
