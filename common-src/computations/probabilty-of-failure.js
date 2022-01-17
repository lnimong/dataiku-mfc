
export const probability_of_failure = 
    input_params => {
        const default_param = {
            travel_plan : []
        }

        const { travel_plan } = {
            ...default_param,
            ...input_params?input_params:{}
        }

        if (travel_plan.length === 0) return 1

        const number_of_risky_stops = 
            travel_plan
            .filter ( ({ risky })=> risky)
            .length

        // we can simplify the probability formula using
        // geometric serie
        // https://en.wikipedia.org/wiki/Geometric_series
        // https://fr.wikipedia.org/wiki/S%C3%A9rie_g%C3%A9om%C3%A9trique
        
        // the next line should be
        // 1 - Math.pow(9/10, number_of_encounter_with_bounty_hunter)
        // but javascript doesn't handle float computations well
        // https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
        return  (Math.pow(10, number_of_risky_stops) - Math.pow(9, number_of_risky_stops)) / Math.pow(10, number_of_risky_stops) 
    }