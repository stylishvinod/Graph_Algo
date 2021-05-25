
//https://leetcode.com/problems/cut-off-trees-for-golf-event/

const getNeighbors = (grid, [i,j]) => {
    const m = grid.length;
    const n = grid[0].length;     
    const neighbors = [];
    const directions = [[-1,0],[1,0],[0,1],[0,-1]];
    for (const [x, y] of directions) {
        const p = i + x;
        const q = j + y;
        
        if(p >=0 && p < m && q >=0 && q < n && grid[p][q] !==0) {
          neighbors.push([p,q]);  
        }
        
    }
    return neighbors;
}
const bfs = (grid, [i, j], [x,y]) => {
    const m = grid.length;
    const n = grid[0].length;    
    const visited = new Array(m).fill(0).map(a => new Array(n).fill(false));
    visited[i][j] = true
    
    const queue = [[i,j,0]]
    while(queue.length > 0) {
        const [p,q, d] = queue.shift();
        if(p === x && q === y) {
            return d;
        }
        const neighbors = getNeighbors(grid, [p,q]);
        for (const neighbor of neighbors) {
            const [nx, ny, nd] =  neighbor;
            if(!visited[nx][ny]) {
                visited[nx][ny] = 1;
                queue.push([...neighbor, d + 1]);
            }
        }
    }  
    return -1;
}
/**
 * @param {number[][]} forest
 * @return {number}
 */
var cutOffTree = function(forest) {
    /**
    - cut off all the trees in a forest for a golf event
    - The forest is represented as an m x n matrix.
        - 0 means the cell cannot be walked through.
        - 1 represents an empty cell that can be walked through.
        - A number greater than 1 represents a tree in a cell that can be walked through, and this number is the tree's height.
    - In one step, you can walk in any of the four directions: 
        - north 
        - east 
        - south 
        - west
    - If you are standing in a cell with a tree, you can choose whether to cut it off.
    - You must cut off the trees in order from shortest to tallest.
    - When you cut off a tree, the value at its cell becomes 1 (an empty cell).
    - Starting from the point (0, 0)
    - return the minimum steps you need to walk to cut off all the trees.
    - If you cannot cut off all the trees, return -1.
    - You are guaranteed that no two trees have the same height, and there is at least one tree needs to be cut off.
    - Approach : 
        - sort all trees as per height
        - get steps to reach highest tree
        - add steps to toal ans
        
    */
    const m = forest.length;
    const n = forest[0].length;
    
    const tree = [];
    for (let i=0; i < m; i++) {
        for (let j=0; j < n; j++) {
            const height = forest[i][j];
            if(height > 1) {
                tree.push([height, i, j]);
            }
        }
    }
    // sort tree as per decreasing height
    tree.sort((a, b) => a[0] - b[0]);
    let ans = 0;
    let x = 0;
    let y = 0;
    for (const [h, i, j] of tree) {
        const steps = bfs(forest, [x,y], [i,j]);
        if(steps === -1) {
            return -1;
        }
        ans += steps;
        x = i;
        y = j;
    }
    return ans;
};