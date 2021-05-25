//https://leetcode.com/problems/reconstruct-itinerary/

// Time complexiy E log(E/V)
// space E + V

const buildGraph = tickets => {
    const graph = new Map();
    for (const [from, to] of tickets) {
        if(!graph.has(from)){
            graph.set(from, []);
        }
        if(!graph.has(to)){
            graph.set(to, []);
        }        
        graph.get(from).push(to);
        // sort it in lexicographical order
        graph.get(from).sort();
    }
    return graph;
}
const dfs = (graph, node, output) => {

    while(graph.get(node).length > 0) {
        // Get next edge to process
        const nextNeighbor = graph.get(node).shift();

        // Run dfs
        dfs(graph, nextNeighbor, output);        
    }
    output.unshift(node); // add in the beggining    
}
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    // build graph
    const graph = buildGraph(tickets);

    // Run modified dfs
    const output = [];
    dfs(graph, 'JFK', output);
    return output;
};