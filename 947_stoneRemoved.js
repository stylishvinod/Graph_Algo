// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/


/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function(stones) {
    const graph = buildGraph(stones)
    const visited = new Array(graph.length).fill(false);
    let total = 0;
    
    for(let i = 0; i < graph.length; i++) {
        if(!visited[i]) {
            const size = dfs(graph, i, visited);
            total += size-1;  // since we will not remove last node, which don't have any 
            //adjacency nodes
        }
    }
    
    return total;
};

const dfs = (graph, node, visited) => {
    visited[node] = true;
    let steps = 1;
    for(let nei of graph[node]) {
        if(!visited[nei]) {
           steps += dfs(graph, nei, visited);
        }
    }
    return steps;
}

const buildGraph = (stones) => {
    const m = stones.length;
    const graph = new Array(m).fill(0).map(() => []);
    
    for(let i = 0;i < m; i++) {
        const [x, y] = stones[i];
        for(let j = i+ 1; j < m; j++) {
            const [p, q] = stones[j];
            
            if(x === p  || y === q) {
                graph[i].push(j);
                graph[j].push(i)
            }
        }
    }
    
    return graph;
}