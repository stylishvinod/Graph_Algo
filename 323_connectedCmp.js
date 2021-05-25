// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    const graph = buildGraph(n, edges);
    const visited = new Array(n).fill(0);
    let connected = 0;
    
    for(let i = 0 ; i <n; i++) {
        if(!visited[i]) {
            connected++;
            bfs(graph, i, visited);
        }
    }
    
    return connected;
};


const dfs = (graph, node, visited) => {
    visited[node] = 1;
    
    for(let nei of graph[node]) {
        if(!visited[nei]) {
            dfs(graph, nei, visited);
        }
    }
}

const bfs = (graph, head, visited) => {
    let qu = [head];
    
    while(qu.length) {
        let node = qu.shift();
        
        for(let nei of graph[node]) {
            if(!visited[nei]) {
                visited[nei] = 1;
                qu.push(nei)
            }
        }
    }
}


const buildGraph = (n, edges) => {
    const arr = new Array(n).fill(0).map(a => []);
    
    for(let [a,b] of edges) {
        arr[a].push(b);
        arr[b].push(a)
    }
    
    return arr;
}