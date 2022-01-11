export const dijsktra_travel_plan = 
    (input_params) => {
        const default_params = { 
            universe : [], 
            start:null, 
            end:null, 
            move_validity:() => true 
        }
        
        const { universe, start, end, move_validity }  = {
            ...default_params,
            ...input_params?input_params:{}
        }

        if (
            universe.length === 0
            || !universe
            || !start
            || !end
        ) return []

        
        // https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34
        
        git status // track distances from the start node using a hash object
	
        // track paths using a hash object
        
        // collect visited nodes

        // find the nearest node
        
        // for that node:
        
        // find its child nodes
            
        // for each of those child nodes:
    
        // make sure each child node is not the start node
                
        // save the distance from the start node to the child node
    
        // if there's no recorded distance from the start node to the child node in the distances object
    
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
                    
        // record the path
                    
        // move the current node to the visited set
            
        // move to the nearest neighbor node
            
        // when the end node is reached, reverse the recorded path back to the start node
    
        //this is the shortest path

        // return the shortest path & the end node's distance from the start node


        return []
    }

