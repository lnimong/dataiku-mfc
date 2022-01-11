const _help_ = (data, overwrite) => {
    const default_val = false
    const debug = 
        (overwrite === true || overwrite === false)
        ? overwrite
        : default_val
    
    if (debug) console.log(data)
} 

export const dijsktra_travel_plan = 
    (input_params) => {
        const default_params = { 
            universe : {
                all_planets : [],
                routes_data : {}
            }, 
            start:null, 
            end:null, 
            move_validity:() => true,
            route_key : (planet_a, planet_b) => `${planet_a}==>${planet_b}`,
            route_start : (planet_a, route) => route.startsWith(`${planet_a}==>`),
        }
        
        const { universe : { all_planets, routes_data }, start, end, move_validity, route_key, route_start }  = {
            ...default_params,
            ...input_params?input_params:{}
        }

        if (
            !all_planets
            || !routes_data
            || !start
            || !end
            || all_planets.length === 0
            || routes_data.length === 0
             
        ) return []

        const infinity = -1

        _help_ ('https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34')
        let hash = 
            all_planets
            .reduce(
                (result, planet_name, ind)=>({
                    ...result,
                    [planet_name] : ind
                }), 
                {}
            )
        
        let hash_update = 
            (array, planet_key) => value => {
                array[hash[planet_key]] = value
            }

        let hash_get = 
            (array, planet_key) => array[hash[planet_key]]

        _help_('track distances from the start node using a hash object')
        let distances = 
            all_planets
            .map(_ => infinity)
        
        all_planets
        .forEach (
            planet => 
                hash_update (distances, planet) ( 
                    planet === start
                    ? 0
                    : routes_data[route_key(start, planet)]
                    ? routes_data[route_key(start, planet)].distance
                    : infinity
                )
        )

	
        _help_('track paths using a hash object (parents)')
        let origins = 
            all_planets
            .map(_ => null)
        
        all_planets
        .forEach (
            planet => 
                hash_update (origins, planet) (
                    routes_data[route_key(start, planet)]
                    ? start
                    : null
                )
        )
        
        _help_('collect visited nodes')
        let visited_planets = new Set ([])

        _help_('find the nearest node')
        const compute_nearest_unvisited_planet = 
            () => {
                let known_distances =
                    all_planets
                    .filter (
                        planet => 
                            !visited_planets.has (planet)
                            && hash_get (distances, planet) !== infinity
                    )
                let nearest_planet = null
                known_distances
                .forEach (
                    planet => 
                        nearest_planet = 
                            nearest_planet && hash_get(distances, planet) < hash_get(distances, nearest_planet)
                            ? planet
                            : !nearest_planet 
                            ? planet
                            : nearest_planet
                )
                
                visited_planets.add(nearest_planet)
                return nearest_planet
            }

        let nearest_planet = compute_nearest_unvisited_planet ()
        
        _help_('for that node:')
        const all_existing_routes_keys = Object.keys(routes_data)
        
        while (nearest_planet) {

            _help_('find its child nodes')
            let distance_to_nearest_planet = hash_get (distances, nearest_planet)
            let nearest_planet_followings =
                all_existing_routes_keys
                .filter(route => route_start(nearest_planet, route) && routes_data[route].end !== start) 
                .map(route => routes_data[route].end)
                
            _help_ (
                `hash : ${JSON.stringify( hash)}\n`
                + `distances : ${distances}\n`
                + `origins : ${origins}\n`
                + `distance_to_nearest_planet : ${distance_to_nearest_planet}\n`
                + `nearest_planet_followings : ${nearest_planet_followings}\n`
                + `visited_planets : ${[...visited_planets]}\n`
                + `nearest_planet : ${nearest_planet}\n`
            )

            _help_('for each of those child nodes:')
            nearest_planet_followings
            .forEach (next_planet => {

                _help_('make sure each child node is not the start node')
                _help_('save the distance from the start node to the child node')
                let new_distance = distance_to_nearest_planet + routes_data[route_key(nearest_planet, next_planet)].distance
                        
                _help_ (
                    `hash : ${JSON.stringify( hash)}\n`
                    + `distance to ${next_planet} : ${hash_get(distances, next_planet)}\n`
                    + `new potential distance : ${new_distance}\n`
                    + `will be updated : ${
                        hash_get(distances, next_planet) === infinity
                        || hash_get(distances, next_planet) > new_distance
                    }\n`
                )

                _help_("if there's no recorded distance from the start node to the child node in the distances object")
                _help_('or if the recorded distance is shorter than the previously stored distance from the start node to the child node')
                if (
                    hash_get(distances, next_planet) === infinity
                    || hash_get(distances, next_planet) > new_distance
                ) {
                    _help_('save the distance to the object')
                    hash_update(distances, next_planet) (new_distance)
                    _help_('record the path')
                    hash_update(origins, next_planet) (nearest_planet)
                }
            })        


            _help_('move the current node to the visited set')
            const next_planet_to_visit = compute_nearest_unvisited_planet () 

            _help_ (
                `hash : ${JSON.stringify( hash)}\n`
                + `distances : ${distances}\n`
                + `origins : ${origins}\n`
                + `visited_planets : ${[...visited_planets]}\n`
                + `nearest_planet : ${nearest_planet}\n`
                + `next_planet_to_visit : ${next_planet_to_visit}\n`
                + `---------------------------------------`
            )

            _help_('move to the nearest neighbor node')
            nearest_planet = next_planet_to_visit
        }

        _help_('when the end node is reached, reverse the recorded path back to the start node')
        let shortest_path = [ end ]
        let count = origins.length
        while (shortest_path[0] !== start && count-- > 0) {
            let previous_step = hash_get(origins, shortest_path[0])
            if (previous_step && previous_step !== '') shortest_path.unshift(previous_step)
        }
        
        _help_('this is the shortest path')
        _help_(shortest_path)
        _help_("return the shortest path & the end node's distance from the start node")
        return shortest_path
    }

