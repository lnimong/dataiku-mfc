import { _helper_ } from "./helper"

const _help_ = _helper_ (false)

export const dijsktra_travel_plan = 
    input_params => {
        const infinity = -1
        const default_params = { 
            universe : {
                all_planets : [],
                routes_data : {}
            }, 
            start:null, 
            end:null, 
            limitations : {
                max_time : infinity,
                min_required_stops : 0

            },
            route_key : (planet_a, planet_b) => `${planet_a}==>${planet_b}`,
            route_start : (planet_a, route) => route.startsWith(`${planet_a}==>`),
        }
        
        const no_limitation = !(input_params && input_params.limitations)

        const { universe : { all_planets, routes_data }, start, end, route_key, route_start, limitations : {  max_time, min_required_stops } }  = {
            ...default_params,
            ...input_params?input_params:{}
        }
        
        const no_max_time_limitation = (no_limitation || max_time === infinity)
        const max_allowed_stops = 
            no_max_time_limitation
            ? infinity
            : max_time

        const planet_stop = n => p => `${p}@${n}`
        const planet_stop_name = p => p.split('@')[0]
        const first_stop = planet_stop (0)

        const all_planets_stops =  
            all_planets
            .map(
                pname => 
                    [...Array(max_allowed_stops === infinity?1:max_allowed_stops).keys()]
                    .map(stop_num => planet_stop (stop_num) (pname)) 
            )
            .flat()


        if (
            !all_planets_stops
            || !routes_data
            || !start
            || !end
            || all_planets_stops.length === 0
            || routes_data.length === 0
        ) return []


        _help_ ('https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34')
        let hash = 
            all_planets_stops
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

        let bounty_hunters_encounters = 
            all_planets_stops
            .map(_ => 0)
 
        let travel_durations = 
            all_planets_stops
            .map(_ => infinity)
        
        all_planets_stops
        .forEach (
            planet => 
                hash_update (travel_durations, planet) ( 
                    planet === planet_stop (1) (start)
                    ? 0
                    : (
                        routes_data[route_key(start, planet_stop_name(planet))] 
                        && (
                            no_max_time_limitation 
                            || routes_data[route_key(start, planet_stop_name(planet))].distance < max_time
                        )
                    )
                    ? routes_data[route_key(start, planet_stop_name(planet))].distance
                    : infinity
                )
        )
	
        let origins = 
            all_planets_stops
            .map(_ => null)
        
        all_planets_stops
        .forEach (
            planet => 
                hash_update (origins, planet) (
                    planet === planet_stop (1) (start)
                    ? first_stop (start)
                    : routes_data[route_key(start, planet_stop_name (planet))] 
                    && (
                        no_max_time_limitation 
                        || routes_data[route_key(start, planet_stop_name (planet))].distance < max_time
                    )
                    ? first_stop (start)
                    : null
                )
        )
        
        _help_('collect visited nodes')
        let visited_planets = new Set ([start])

        _help_('find the nearest node')
        const compute_best_unvisited_planet = 
            () => {
                let known_distances =
                    all_planets_stops
                    .filter (
                        planet => 
                            !visited_planets.has (planet_stop_name(planet))
                            && hash_get (travel_durations, planet) !== infinity
                    )
                let nearest_planet = null
                known_distances
                .forEach (
                    planet => 
                        nearest_planet = 
                            nearest_planet && hash_get(travel_durations, planet) < hash_get(travel_durations, nearest_planet)
                            ? planet
                            : !nearest_planet 
                            ? planet
                            : nearest_planet
                )
                if(nearest_planet)
                    visited_planets.add(planet_stop_name(nearest_planet))
                return nearest_planet
            }

        const will_encounter_bounty_hunters = (planet, day) => {
            return false
        } 
        
        let best_planet = compute_best_unvisited_planet ()
        
        _help_('for that node:')
        const all_existing_routes_keys = Object.keys(routes_data)
        
        while (best_planet) {

            let time_to_best_planet = 
                hash_get (travel_durations, best_planet)
            
            let best_planet_followings =
                all_existing_routes_keys
                .filter(
                    route => 
                        (max_time === infinity || routes_data[route].distance + time_to_best_planet <= max_time)
                        && route_start(planet_stop_name(best_planet), route)
                        && routes_data[route].end !== start
                ) 
                .map(route => first_stop (routes_data[route].end))
          
            best_planet_followings
            .forEach (next_planet => {

                let new_time = 
                    time_to_best_planet 
                    + routes_data[route_key(planet_stop_name(best_planet), planet_stop_name(next_planet) )].distance
              
                if (
                    hash_get(travel_durations, next_planet) === infinity
                    || hash_get(travel_durations, next_planet) > new_time
                ) {
                    hash_update(travel_durations, next_planet) (new_time)
                    hash_update(origins, next_planet) (best_planet)
                    // if (will_encounter_bounty_hunters (planet_stop_name(next_planet), new_time))
                    //     hash_update(bounty_hunters_encounters, next_planet) (
                    //         1 + hash_get (bounty_hunters_encounters, next_planet) 
                    //     )
                }
            })        

            const next_planet_to_visit = compute_best_unvisited_planet () 

            best_planet = next_planet_to_visit
        }

        if (end !== start && hash_get(origins, first_stop(end) ) === null) return []

        let shortest_path = [ first_stop(end) ]
        let count = origins.length
        while (shortest_path[0] !== start && count-- > 0) {
            let previous_step = hash_get(origins, shortest_path[0])
            if (previous_step && previous_step !== '') shortest_path.unshift(previous_step)
        }
        
        return shortest_path.map(planet_stop_name)
        
    }

