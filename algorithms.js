var queue = [];

function build_graph() {
    let s = {};
    for (let i = 0; i < edges.length; i++) {
        v1 = edges[i][0];
        v2 = edges[i][1];
        if (s[v1] == null)
            s[v1] = [];
        if (s[v2] == null)
            s[v2] = [];
        s[v1].push(v2);
        s[v2].push(v1);
    }
    return s;
}

function dfs(start) {
    let graph = build_graph();
    let visited = {};
    queue = [];
    dfs_util(start, graph, visited);
}

function dfs_util(start, graph, visited) {
    if (visited[start] == undefined) {
        visited[start] = true;
        for (let i = 0; i < graph[start].length; i++)
            dfs_util(graph[start][i], graph, visited);
        queue.push(start);
        console.log(start);
    }
}

function animate() {
    for (let i = 0; i < queue.length; i++) {
        setTimeout(() => {
            ellToAnimate[queue[i]] = true;
        }, i * animationDelay * 1000);
    }
}
