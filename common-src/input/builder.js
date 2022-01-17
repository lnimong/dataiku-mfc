
export const build_input =
    millennium_json => empire_json => {
        const { departure, arrival, autonomy , routes } = {
            routes : [],
            ...millennium_json
        }
        const { countdown, bounty_hunters } = {
            bounty_hunters : [],
            ...empire_json
        }
        return {
            start : departure,
            end : arrival,
            universe : {
                all_planets :  [
                    ...new Set (
                        routes
                        .map (({ origin, destination })=> [ origin, destination ])
                        .flat ()
                    )
                ],
                all_routes :
                    routes
                    .map (
                        ({ origin, destination, travel_time }) => ({
                            start : origin,
                            end : destination,
                            distance : travel_time
                        })
                    ) 
            },
            limitations : {
                max_time : countdown,
                route_capacity : autonomy,
                risky_stops : 
                    bounty_hunters
                    .map (
                        ({ planet, day }) => ({ planet, time:day})
                    )
            }
        }
    }