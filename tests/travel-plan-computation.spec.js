import  { dijsktra_travel_plan } from '../common-src/computations/travel-plan'

const earth_to_mercury_case = 
{
    input : {
        universe : {
            all_planets : ['earth', 'venus', 'mercury'],
            all_routes : [
                { start : 'earth', end : 'venus', distance : 1},
                { start : 'venus', end : 'mercury', distance : 2},
                { start : 'earth', end : 'mercury', distance : 4},
                { start : 'mercury', end : 'earth', distance : 2}
            ]
        }, 
        start:'earth', 
        end:'mercury', 
    }, 

    expected_output : [ 'earth', 'venus', 'mercury' ]
}

const earth_to_mercury_case_2 = 
{
    input : {
        universe : {
            all_planets : ['earth', 'venus', 'mercury'],
            all_routes : [
                { start : 'earth', end : 'venus', distance : 1},
                { start : 'venus', end : 'mercury', distance : 2},
                { start : 'earth', end : 'mercury', distance : 5},
                { start : 'mercury', end : 'earth', distance : 2}
            ]
        }, 
        start:'earth', 
        end:'mercury', 
    }, 

    expected_output : [ 'earth', 'venus', 'mercury' ]
}

const earth_to_uranus_case = 
{
    input : {
        universe : {
            all_planets : ['earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
            all_routes : [
                { start : 'earth', end : 'jupiter', distance : 5 },
                { start : 'earth', end : 'mars', distance : 2 },
                { start : 'mars', end : 'jupiter', distance : 8 },
                { start : 'mars', end : 'saturn', distance : 7 },
                { start : 'jupiter', end : 'saturn', distance : 2 },
                { start : 'jupiter', end : 'uranus', distance : 4 },
                { start : 'uranus', end : 'saturn', distance : 6 },
                { start : 'uranus', end : 'neptune', distance : 3 },
                { start : 'saturn', end : 'neptune', distance : 1 }
            ]
        }, 
        start:'earth', 
        end:'uranus', 
    }, 

    expected_output : [ 'earth', 'jupiter', 'uranus' ]
}

const earth_to_neptune_case = 
{
    input : {
        universe : {
            all_planets : ['earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
            all_routes : [
                { start : 'earth', end : 'jupiter', distance : 5 },
                { start : 'earth', end : 'mars', distance : 2 },
                { start : 'mars', end : 'jupiter', distance : 8 },
                { start : 'mars', end : 'saturn', distance : 7 },
                { start : 'jupiter', end : 'saturn', distance : 2 },
                { start : 'jupiter', end : 'uranus', distance : 4 },
                { start : 'uranus', end : 'saturn', distance : 6 },
                { start : 'uranus', end : 'neptune', distance : 3 },
                { start : 'saturn', end : 'neptune', distance : 1 }
            ]
        }, 
        start:'earth', 
        end:'neptune', 
    }, 

    expected_output : [ 'earth', 'jupiter', 'saturn', 'neptune' ]
}

const dataiku_example_1 = {
    input : {
        start : 'Tatooine',
        end : 'Endor',
        universe : {
            all_planets : ['Tatooine', 'Dagobah', 'Endor', 'Hoth' ],
            all_routes : [
                { start : 'Tatooine', end : 'Dagobah', distance : 6 },
                { start : 'Dagobah', end : 'Endor', distance : 4 },
                { start : 'Dagobah', end : 'Hoth', distance : 1 },
                { start : 'Hoth', end : 'Endor', distance : 1 },
                { start : 'Tatooine', end : 'Hoth', distance : 6 }
            ]
        },
        limitations : {
            max_time : 7,
            route_capacity : 6,
            risky_stops : [
                { planet : 'Hoth', time : 6 },
                { planet : 'Hoth', time : 7 },
                { planet : 'Hoth', time : 8 }
            ]
        }
    },

    expected_output : []
}

const dataiku_example_2 = {
    input : {
        start : 'Tatooine',
        end : 'Endor',
        universe : {
            all_planets : ['Tatooine', 'Dagobah', 'Endor', 'Hoth' ],
            all_routes : [
                { start : 'Tatooine', end : 'Dagobah', distance : 6 },
                { start : 'Dagobah', end : 'Endor', distance : 4 },
                { start : 'Dagobah', end : 'Hoth', distance : 1 },
                { start : 'Hoth', end : 'Endor', distance : 1 },
                { start : 'Tatooine', end : 'Hoth', distance : 6 }
            ]
        },
        limitations : {
            max_time : 8,
            route_capacity : 6,
            risky_stops : [
                { planet : 'Hoth', time : 6 },
                { planet : 'Hoth', time : 7 },
                { planet : 'Hoth', time : 8 }
            ]
        }
    },

    expected_output : [ 
        { planet : 'Tatooine', risky : false}, 
        { planet : 'Hoth', risky : true}, 
        { planet : 'Hoth', risky : true}, 
        { planet : 'Endor', risky : false}
    ]
}

const dataiku_example_3 = {
    input : {
        start : 'Tatooine',
        end : 'Endor',
        universe : {
            all_planets : ['Tatooine', 'Dagobah', 'Endor', 'Hoth' ],
            all_routes : [
                { start : 'Tatooine', end : 'Dagobah', distance : 6 },
                { start : 'Dagobah', end : 'Endor', distance : 4 },
                { start : 'Dagobah', end : 'Hoth', distance : 1 },
                { start : 'Hoth', end : 'Endor', distance : 1 },
                { start : 'Tatooine', end : 'Hoth', distance : 6 }
            ]
        },
        limitations : {
            max_time : 9,
            route_capacity : 6,
            risky_stops : [
                { planet : 'Hoth', time : 6 },
                { planet : 'Hoth', time : 7 },
                { planet : 'Hoth', time : 8 }
            ]
        }
    },

    expected_output : [  
        { planet : 'Tatooine', risky : false}, 
        { planet : 'Dagobah', risky : false},  
        { planet : 'Dagobah', risky : false}, 
        { planet : 'Hoth', risky : true}, 
        { planet : 'Endor', risky : false}
    ]
}

const dataiku_example_4 = {
    input : {
        start : 'Tatooine',
        end : 'Endor',
        universe : {
            all_planets : ['Tatooine', 'Dagobah', 'Endor', 'Hoth' ],
            all_routes : [
                { start : 'Tatooine', end : 'Dagobah', distance : 6 },
                { start : 'Dagobah', end : 'Endor', distance : 4 },
                { start : 'Dagobah', end : 'Hoth', distance : 1 },
                { start : 'Hoth', end : 'Endor', distance : 1 },
                { start : 'Tatooine', end : 'Hoth', distance : 6 }
            ]
        },
        limitations : {
            max_time : 10,
            route_capacity : 6,
            risky_stops : [
                { planet : 'Hoth', time : 6 },
                { planet : 'Hoth', time : 7 },
                { planet : 'Hoth', time : 8 }
            ]
        }
    },

    expected_output : [ 
        { planet : 'Tatooine', risky : false}, 
        { planet : 'Tatooine', risky : false}, 
        { planet : 'Dagobah', risky : false},  
        { planet : 'Dagobah', risky : false}, 
        { planet : 'Hoth', risky : false}, 
        { planet : 'Endor', risky : false}
    ]
}

describe ( "the travel plan", () => {

    test ("is empty IF the list of planets is empty", () => {
        expect (dijsktra_travel_plan({ universe : { all_planets : []}}).travel_plan.map(({ planet }) => planet).length).toBe(0)
    })

    test ("is empty IF the params are undefined", () => {
        expect (dijsktra_travel_plan().travel_plan.map(({ planet }) => planet).length).toBe(0)
    })

    test ("works for earth_to_mercury_case", () => {
        expect (dijsktra_travel_plan(earth_to_mercury_case.input).travel_plan.map(({ planet }) => planet))
        .toEqual(earth_to_mercury_case.expected_output)
    })

    test ("works for dataiku_example_1", () => {
        const { input, expected_output } = dataiku_example_1
        const { travel_plan } = dijsktra_travel_plan(input)  
        expect (travel_plan).toEqual(expected_output)
    })

    test ("works for dataiku_example_2", () => {
        const { input, expected_output } = dataiku_example_2
        const { travel_plan } = dijsktra_travel_plan(input)  
        expect (travel_plan).toEqual(expected_output)
    })

    test ("works for dataiku_example_3", () => {
        const { input, expected_output } = dataiku_example_3
        const { travel_plan } = dijsktra_travel_plan(input)  
        expect (travel_plan).toEqual(expected_output)
    })

    test ("works for dataiku_example_4", () => {
        const { input, expected_output } = dataiku_example_4
        const { travel_plan } = dijsktra_travel_plan(input)  
        expect (travel_plan).toEqual(expected_output)
    })

    test ("return an empty travel plan if the deadline is shorter than the best path", () => {
        expect (
            dijsktra_travel_plan({ 
                ...earth_to_mercury_case.input,
                limitations : {
                    max_time : 2
                }
            }).travel_plan.map(({ planet }) => planet)
        )
        .toEqual([])
    })
    

    test ("should avoid bounty in priority (before gaining distance)", () => {
        expect (
            dijsktra_travel_plan({ 
                ...earth_to_mercury_case.input,
                limitations : {
                    max_time : 4,
                    risky_stops : [
                        { planet : 'venus', time : 1 }
                    ]
                }
            }).travel_plan.map(({ planet }) => planet)
        )
        .toEqual([ 'earth', 'mercury' ])
    })


    test ("should stay longer on the same planet when refuel is needed", () => {
        expect (
            dijsktra_travel_plan({ 
                ...earth_to_mercury_case_2.input,
                limitations : {
                    max_time : 4,
                    route_capacity: 2
                }
            }).travel_plan.map(({ planet }) => planet)
        )
        .toEqual([ 'earth', 'venus', 'venus', 'mercury' ])
    })
        
    test ("should take risk when there is no time", () => {
        expect (
            dijsktra_travel_plan({ 
                ...earth_to_mercury_case.input,
                limitations : {
                    max_time : 3,
                    risky_stops : [
                        { planet : 'venus', time : 1 }
                    ]
                }
            }).travel_plan.map(({ planet }) => planet)
        )
        .toEqual([ 'earth', 'venus', 'mercury' ])
    })

    test ("works for earth_to_uranus_case", () => {
        expect (dijsktra_travel_plan(earth_to_uranus_case.input).travel_plan.map(({ planet }) => planet))
        .toEqual(earth_to_uranus_case.expected_output)
    })

    test ("works for earth_to_neptune_case", () => {
        expect (dijsktra_travel_plan(earth_to_neptune_case.input).travel_plan.map(({ planet }) => planet))
        .toEqual(earth_to_neptune_case.expected_output)
    })
})