var queue = [];

function build_graph() {
    let s = {};
    for (let i = 0; i < edges.length; i++) {
        v1 = edges[i][0];
        v2 = edges[i][1];
        if (s[v1] == null)
            s[v1] = [];
        s[v1].push(v2);
    }
    return s;
}

function dfs(start) {
    let graph = build_graph();
    let visited = [];
    let maxi = f_max(edges) + 1;
    for (let i = 0; i < maxi; i++)
        visited[i] = false;
    dfs_util(start, graph, visited);
}

function dfs_util(start, graph, visited) {
    queue.push(start);
    visited[start] = true;
    if (graph[start] == null)
        return;
    graph[start].forEach((e) => {
        if (visited[e] == false) {
            dfs_util(e, graph, visited);
        }
    });
}

function f_max(edges) {
    m = 0;
    edges.forEach((t) => {
        m = max(t[0], t[1]) > m ? max(t[0], t[1]) : m;
    });
    return m;
}

function animate() {
    for (let i = 0; i < queue.length; i++) {
        setTimeout(() => {
            ellToAnimate[queue[i]] = true;
        }, i * 1000);
    }
}
