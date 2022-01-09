import  { travel_plan } from '../common-src/travel-plan'

describe ( "the travel plan", () => {

    test ("should work", () => {
        expect (travel_plan().length).toBe(0)
    })
})