
// https://leetcode.com/problems/find-the-celebrity/

/**
 * Definition for knows()
 * 
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function(knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function(n) {
     let celebrity = 0;
        
        for(let i = 1; i <n; i++) {
            
            if(knows(celebrity, i)) {
                celebrity = i;
            }
        }
        
        
        if(isCelebrity(celebrity, knows, n)) {
            return celebrity
        }
        
        return -1;
    };
};


const isCelebrity = (celebrity, knows, n) => {
    
    for(let i = 0 ; i < n; i++) {
        if(i === celebrity) {
            continue;
        }
        
        if(knows(celebrity, i) || !knows(i, celebrity)) {
            return false;
        }
     
    }
       return true;
}


