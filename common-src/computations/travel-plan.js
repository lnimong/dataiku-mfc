
export const dijsktra_travel_plan = 
    input_params => {
        const infinity = -1
        const no_origin = null
        const default_values = { 
            universe : {
                all_planets : [],
                all_routes : []
            }, 
            start:null, 
            end:null, 
            limitations : {
                max_time : infinity,
                risky_stops : [],
                route_capacity : infinity
            }
        }
        
        const route_key = (planet_a, planet_b) => `${planet_a}==>${planet_b}`

        const route_start = (planet_a, route) => route.startsWith(`${planet_a}==>`)
            
        const { universe, start, end, limitations  }  = {
            ...default_values,
            ...input_params?input_params:{}
        }
        const {  max_time, risky_stops, route_capacity } = { 
            ...default_values.limitations,
            ...limitations
        }
        const { all_planets, all_routes } = {
            ...default_values.universe,
            ...universe
        }

        const max_allowed_stops = max_time
        const max_fuel = route_capacity

        const planet_stop = (n,f) => p => `${p}@${n}@${f}`
        const planet_name = p => p.split('@')[0]
        const stop_time  = p => p.split('@')[1]
        const first_stop = planet_stop (0, max_fuel)
        const one_more_day = 
            p => {
                const will_be_too_long = 1+parseInt(p.split('@')[1]) < max_allowed_stops  
                return (
                    will_be_too_long
                    ? `${p.split('@')[0]}@${1+parseInt(p.split('@')[1])}@${max_fuel}`
                    : null
                )
            }
        const routes_data =
            all_routes
            .reduce (
                (R, {start,end,distance}) => ({ ...R, [route_key(start,end)] : {start,end,distance} }),
                {}
            )

        const bad_planet_stops = 
            new Set (
                risky_stops.map(({ planet, time }) => planet_stop (time) (planet))
            )

        const will_be_risky = (time, planet) => {
            return bad_planet_stops.has (
                planet_stop 
                    (time)
                    (planet_name(planet))
            )
        } 

        if (
            !all_planets
            || !routes_data
            || !start
            || !end
            || all_planets.length === 0
            || all_routes.length === 0
        ) return { travel_plan : []}

        const all_existing_routes_keys = Object.keys(routes_data)
        const initial_stop =  first_stop (start)

        const hash = 
            [initial_stop]
            .reduce(
                (result, planetname, ind)=>({
                    ...result,
                    [planetname] : ind + 1
                }),
                {}
            )
        
        const _update_ = 
            (array, planet_key) => value => {
                if (!hash[planet_key]) 
                    hash[planet_key] = 1 + Object.keys(hash).length
                
                while (array.length < 1+hash[planet_key])
                    array.push(array[0])
            
                array[hash[planet_key]] = value
            }

        const _value_ = 
            (array, planet_key) => {

                return (
                    hash[planet_key] 
                    ? array[hash[planet_key]]
                    : array[0]
                )
            }
            
        const available_fuel = [ max_fuel ]

        const risk_level = [ infinity ]
 
        const travel_durations = [ infinity ]
        
        const origins = [ no_origin ]
        
        _update_ (available_fuel, initial_stop) (max_fuel)
        _update_ (risk_level, initial_stop) (will_be_risky (0, start) ? 1 : 0)
        _update_ (travel_durations, initial_stop) (0)

        const current_known_planets  =
            () =>
                Object.keys(hash)
                .filter(
                    stop => _value_ (travel_durations, stop) !== infinity
                )

        const possible_stops_after = 
            (current_stop) => {
                
                const time_to_current_stop = 
                    _value_ (travel_durations, current_stop)
                
                const current_fuel = 
                    _value_ (available_fuel, current_stop)
                    
                const stop_one_more_day = 
                    time_to_current_stop < max_time
                    ? one_more_day (current_stop)
                    : null
                  
                const next_possible_routes =
                    all_existing_routes_keys
                    .filter (
                        route => 
                            route_start(planet_name(current_stop), route)
                            && routes_data[route].end !== start
                    )
                    .filter(
                        route => {

                            const possible_within_max_time = 
                                max_time === infinity 
                                || routes_data[route].distance + time_to_current_stop <= max_time
                            
                            const within_route_limit = 
                                route_capacity === infinity 
                                || routes_data[route].distance <= route_capacity

                            return possible_within_max_time && within_route_limit
                        }
                    ) 
                    
                if (next_possible_routes.length === 0) return []
                
                const next_stops =
                    next_possible_routes
                    .filter(
                        route => {
                            const there_is_enough_fuel = 
                                max_fuel === infinity 
                                || routes_data[route].distance <= current_fuel

                            return there_is_enough_fuel                        
                        }
                    ) 
                    .map (
                        route => 
                            planet_stop 
                                (
                                    routes_data[route].distance + time_to_current_stop, 
                                    max_fuel === infinity
                                    ? -1
                                    : current_fuel - routes_data[route].distance
                                ) 
                                (routes_data[route].end)
                    )
                    .concat ( stop_one_more_day ? [stop_one_more_day] : [] )


                return next_stops
            
            } 
        
        const first_stops = possible_stops_after (initial_stop)

        first_stops
        .forEach (
            stop => {

                if (stop === one_more_day(initial_stop)) {

                    _update_ (available_fuel, stop) (route_capacity)
                    _update_ (risk_level, stop) (will_be_risky (1, start) ? 1 : 0)
                    _update_ (travel_durations, stop) (1)
                    _update_ (origins, stop) (initial_stop)
                }
                else {
                    const shorter_than_max_time =
                        max_time === infinity 
                        || max_time >= routes_data [route_key(start, planet_name(stop))].distance
                    
                    const shorter_than_route_limit =
                        route_capacity === infinity
                        || route_capacity >= routes_data [route_key(start, planet_name(stop))].distance

                    const route_is_possible = 
                        shorter_than_max_time && shorter_than_route_limit
                    
                    if (route_is_possible) {

                        _update_ 
                            (available_fuel, stop) 
                            (
                                route_capacity === infinity
                                ? infinity 
                                : route_capacity - routes_data [route_key(start, planet_name(stop))].distance
                            )
                        
                        _update_ 
                            (travel_durations, stop) 
                            (routes_data[route_key(start, planet_name(stop))].distance)

                        _update_ 
                            (origins, stop) 
                            (first_stop (start))
                        
                        _update_ 
                            (risk_level, stop) 
                            ( 
                            
                                will_be_risky (
                                        routes_data[route_key(start, planet_name(stop))].distance,
                                        planet_name(stop)
                                )
                                ? 1
                                : 0
                            )
                    }
                }
            }
        )
        const visited_planets = new Set ([ initial_stop ])

        const best_stop = 
            (stop_a, stop_b) => {
                return (
                    !stop_b
                    ? stop_a
                    : _value_(risk_level, stop_a) < _value_(risk_level, stop_b)
                    ? stop_a
                    : _value_(risk_level, stop_a) > _value_(risk_level, stop_b)
                    ? stop_b
                    : _value_(travel_durations, stop_a) < _value_(travel_durations, stop_b)
                    ? stop_a
                    : _value_(travel_durations, stop_a) > _value_(travel_durations, stop_b)
                    ? stop_b
                    : _value_(available_fuel, stop_a) < _value_(available_fuel, stop_b)
                    ? stop_a
                    : stop_b
                )
            } 

        const compute_best_unvisited_planet = 
            () => {
                const stops_to_check =
                    current_known_planets()
                    .filter (
                        planet => 
                            !visited_planets.has (planet)
                            && _value_ (travel_durations, planet) !== infinity
                    )
                let tmp_best_stop = null
                stops_to_check
                .forEach (
                    planet => tmp_best_stop = best_stop (planet, tmp_best_stop)
                )
                if(tmp_best_stop)
                    visited_planets.add(tmp_best_stop)
                return tmp_best_stop
            }

        let current_stop = compute_best_unvisited_planet ()
        
        while (current_stop) {

            const time_to_current_stop = 
                _value_ (travel_durations, current_stop)
            
            const current_fuel = 
                _value_ (available_fuel, current_stop)

            const current_risk = 
                _value_ (risk_level, current_stop)
            
            const stop_one_more_day = 
                time_to_current_stop < max_time
                ? one_more_day (current_stop)
                : null
            
            const next_stops = possible_stops_after (current_stop)

            next_stops
            .forEach (next_stop => {

                const time_between_current_and_next_stops = 
                    next_stop === stop_one_more_day
                    ? 1
                    : routes_data[route_key(planet_name(current_stop), planet_name(next_stop) )].distance

                const next_stop_time = 
                    time_to_current_stop 
                    + time_between_current_and_next_stops
                
                const next_fuel_level = 
                    route_capacity === infinity
                    ? infinity
                    : next_stop === stop_one_more_day
                    ? route_capacity
                    : current_fuel - time_between_current_and_next_stops
              
                const next_risk_level = 
                    current_risk
                    + (
                        will_be_risky (next_stop_time, next_stop)
                        ? 1
                        : 0
                    )

                const new_path_to_next_planet_is_less_risky =
                    _value_(risk_level, next_stop) === infinity
                    || _value_(risk_level, next_stop) > next_risk_level
                
                const new_path_to_next_planet_is_shorter =
                    _value_(travel_durations, next_stop) === infinity
                    || _value_(travel_durations, next_stop) > next_stop_time
                
                const new_fuel_situation_is_better =
                    max_fuel !== infinity
                    && next_fuel_level > _value_ (available_fuel, next_stop)
                
                const new_path_to_next_planet_has_same_risk =
                    _value_(risk_level, next_stop) === next_risk_level
                
                const new_path_to_next_planet_has_same_distance = 
                    _value_(travel_durations, next_stop) === next_stop_time

    
                const found_a_better_path_to_next_planet = 
                    new_path_to_next_planet_is_less_risky
                    || (
                        new_path_to_next_planet_has_same_risk
                        && new_path_to_next_planet_is_shorter
                    )
                    || (
                        new_path_to_next_planet_has_same_risk
                        && new_path_to_next_planet_has_same_distance
                        && new_fuel_situation_is_better
                    )
                
                if (found_a_better_path_to_next_planet) {
                    _update_(travel_durations, next_stop) (next_stop_time)
                    _update_(origins, next_stop) (current_stop)
                    _update_(risk_level, next_stop) (next_risk_level)
                    _update_(available_fuel, next_stop) (next_fuel_level)
                }
            })        

            const next_planet_to_visit = compute_best_unvisited_planet () 

            current_stop = next_planet_to_visit
        }

        const success_paths =
            Object.keys(hash)
            .filter(
                stop => 
                    planet_name(stop) === end
                    && _value_ (risk_level, stop) !== infinity
                    && _value_(origins, stop) !== no_origin
            )
        
        if (success_paths.length === 0) return { travel_plan : []}

        const best_path = [
            success_paths
            .reduce ( 
                (current_best, current_stop) => best_stop (current_best, current_stop),
                success_paths[0]
            )
        ]

        let count = origins.length
        while (best_path[0] !== start && count-- > 0) {
            let previous_step = _value_(origins, best_path[0])
            if (previous_step && previous_step !== '') best_path.unshift(previous_step)
        }

        const path_and_risks = 
            best_path
            .map (
                stop => ({
                    planet : planet_name(stop),
                    risky : bad_planet_stops.has (
                        planet_stop (stop_time(stop)) (planet_name(stop))
                    )
                })
            )
        
        return {
            travel_plan : path_and_risks
        }
        
    }

