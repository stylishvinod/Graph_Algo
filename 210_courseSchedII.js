

// https://leetcode.com/problems/course-schedule-ii/


/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    // using Kahn's algorithm

    // 1. build adjacencylist and indegree array
    const inDegree = new Array(numCourses).fill(0);
    const graph = new Array(numCourses).fill(0).map(() => []);

    for (let [u, v] of prerequisites) {
        graph[v].push(u);
        inDegree[u]++;
    }
    const result = [];

    bfs(graph, inDegree, result);

    if (result.length !== numCourses) return [];
    return result;

};


const bfs = (graph, inDegree, result) => {
    const qu = [];
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] === 0) {
            qu.push(i)
        }
    }

    while (qu.length) {
        const node = qu.shift();

        for (let nei of graph[node]) {
            inDegree[nei]--

            if (inDegree[nei] === 0) {
                qu.push(nei);
            }
        }
        result.push(node);
    }

    return result;
}