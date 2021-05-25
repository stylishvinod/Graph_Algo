

// https://leetcode.com/problems/pacific-atlantic-water-flow/

// Time & space complexity O(M * N)

const getKey = ([x,y]) => `${x}-${y}`;
const getNeighbors = (matrix, [i,j]) => {
    const m = matrix.length;
    const n = matrix[0].length;
    
    const neighbors = [];
    const directions = [[-1,0],[1,0],[0,1],[0,-1]];
    for (const [p,q] of directions) {
        const x = i + p;
        const y = j + q;
        
        if(x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] >= matrix[i][j]) {
            neighbors.push([x,y]);
        }
        
    }
    return neighbors;
}
const dfs = (matrix, visited, node) => {
    visited.add(getKey(node));
    const neighbors = getNeighbors(matrix, node);

    for (const neighbor of neighbors) {
        if(!visited.has(getKey(neighbor))) {
            dfs(matrix, visited, neighbor);
        }
    }
}
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
    /**
    - m x n matrix of non-negative integers representing the height of each unit cell in a continent,
    - the "Pacific ocean" touches the left and top edges of the matrix 
    - the "Atlantic ocean" touches the right and bottom edges.
    - Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.
    - Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.
    - Approach: 
        - Apply dfs on each row and column
        - Get intersection of visited nodes
    */
    const m = matrix.length;
    if(m === 0) {
        return [];
    }
    const n = matrix[0].length;
    
    const pacific = new Set();
    const atlantic = new Set();
    
    // iterate each row
    for (let i=0; i < m; i++) {
        dfs(matrix, pacific, [i, 0]);
        dfs(matrix, atlantic, [i, n-1]);
    }
    
    // iterate each column
    for (let j=0; j < n; j++) {
        dfs(matrix, pacific, [0, j]);
        dfs(matrix, atlantic, [m-1, j])
    }
    
    // get intersection of both pacific and atlantic
    const ans = [];
    for (const node of pacific) {
        if(atlantic.has(node)) {
            ans.push(node.split('-'));
        }
    }
    return ans;
    
};