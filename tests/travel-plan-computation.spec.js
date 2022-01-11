import  { dijsktra_travel_plan } from '../common-src/travel-plan'

describe ( "the travel plan", () => {

    test ("is empty IF the universe is empty", () => {
        expect (dijsktra_travel_plan({ universe : []}).length).toBe(0)
    })

    test ("is empty IF there the params are undefined", () => {
        expect (dijsktra_travel_plan({ universe : []}).length).toBe(0)
    })
})