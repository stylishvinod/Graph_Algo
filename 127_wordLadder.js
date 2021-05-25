
// https://leetcode.com/problems/word-ladder/

// time & space O(M^2 * N) , when M is length of each word and N is totalwords

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    return bfs(beginWord, endWord, wordList);
    
};

const bfs = (beginWord, endWord, wordList) => {
 let visited = new Map();
    visited.set(beginWord, 1);
    let q = [beginWord];
    while(q.length) {
        let node = q.shift();
        
        if(node === endWord) {
            return visited.get(node);
        }
        
        let neighbours = getNeighbours(wordList, node);
        
        for(let nei of neighbours) {
            if(!visited.has(nei)) {
                visited.set(nei, visited.get(node) + 1);
                q.push(nei);
            }
        }
    }
    return 0;
}

const getNeighbours = (wordList, node) => {
    let list = [];
    
    for(let word of wordList) {
      if(isOneDiffence(word, node)) {
          list.push(word)
      }
    }
    return list;
}


const isOneDiffence = (word1, word2) => {
    let diff = 0;
    for(let i = 0;i < word1.length; i++) {
        
        if(word1[i] !== word2[i]) {
            diff++;
            if(diff > 1) return false;
        }
    }
    return diff === 1;
}