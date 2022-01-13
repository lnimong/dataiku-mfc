import  { dijsktra_travel_plan } from '../common-src/travel-plan'

const earth_to_mercury_case = 
{
    input : {
        universe : {
            all_planets : ['earth', 'venus', 'mercury'],
            routes_data : {
                'earth==>venus' : { start : 'earth', end : 'venus', distance : 1},
                'venus==>mercury' : { start : 'venus', end : 'mercury', distance : 2},
                'earth==>mercury' : { start : 'earth', end : 'mercury', distance : 4},
                'mercury==>earth' : { start : 'mercury', end : 'earth', distance : 2}
            }
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
            routes_data : {
                'earth==>jupiter' : { start : 'earth', end : 'mars', distance : 5 },
                'earth==>mars' : { start : 'earth', end : 'mars', distance : 2 },
                'mars==>jupiter' : { start : 'mars', end : 'jupiter', distance : 8 },
                'mars==>saturn' : { start : 'mars', end : 'saturn', distance : 7 },
                'jupiter==>saturn' : { start : 'jupiter', end : 'saturn', distance : 2 },
                'jupiter==>uranus' : { start : 'jupiter', end : 'uranus', distance : 4 },
                'uranus==>saturn' : { start : 'uranus', end : 'saturn', distance : 6 },
                'uranus==>neptune' : { start : 'uranus', end : 'neptune', distance : 3 },
                'saturn==>neptune' : { start : 'saturn', end : 'neptune', distance : 1 }
            }
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
            routes_data : {
                'earth==>jupiter' : { start : 'earth', end : 'mars', distance : 5 },
                'earth==>mars' : { start : 'earth', end : 'mars', distance : 2 },
                'mars==>jupiter' : { start : 'mars', end : 'jupiter', distance : 8 },
                'mars==>saturn' : { start : 'mars', end : 'saturn', distance : 7 },
                'jupiter==>saturn' : { start : 'jupiter', end : 'saturn', distance : 2 },
                'jupiter==>uranus' : { start : 'jupiter', end : 'uranus', distance : 4 },
                'uranus==>saturn' : { start : 'uranus', end : 'saturn', distance : 6 },
                'uranus==>neptune' : { start : 'uranus', end : 'neptune', distance : 3 },
                'saturn==>neptune' : { start : 'saturn', end : 'neptune', distance : 1 }
            }
        }, 
        start:'earth', 
        end:'neptune', 
    }, 

    expected_output : [ 'earth', 'jupiter', 'saturn', 'neptune' ]
}

describe ( "the travel plan", () => {

    test ("is empty IF the list of planets is empty", () => {
        expect (dijsktra_travel_plan({ universe : { all_planets : []}}).length).toBe(0)
    })

    test ("is empty IF the params are undefined", () => {
        expect (dijsktra_travel_plan().length).toBe(0)
    })

    test ("works for earth_to_mercury_case", () => {
        expect (dijsktra_travel_plan(earth_to_mercury_case.input))
        .toEqual(earth_to_mercury_case.expected_output)
    })

    test ("return an empty travel plan if the deadline is shorter than the best path", () => {
        expect (
            dijsktra_travel_plan({ 
                ...earth_to_mercury_case.input,
                limitations : {
                    max_time : 2
                }
            })
        )
        .toEqual([])
    })

    test ("works for earth_to_uranus_case", () => {
        expect (dijsktra_travel_plan(earth_to_uranus_case.input))
        .toEqual(earth_to_uranus_case.expected_output)
    })

    test ("works for earth_to_neptune_case", () => {
        expect (dijsktra_travel_plan(earth_to_neptune_case.input))
        .toEqual(earth_to_neptune_case.expected_output)
    })
})