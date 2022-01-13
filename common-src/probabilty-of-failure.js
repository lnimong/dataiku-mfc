import { _helper_ } from "./helper"

const _help_ = _helper_ (false)

export const probability_of_failure = 
    input_params => {
        const default_param = {
            travel_plan : []
        }

        const { travel_plan } = {
            ...default_param,
            ...input_params?input_params:{}
        }

        const number_of_encounter_with_bounty_hunter = 
            travel_plan
            .filter ( ({ bounty_hunters })=> bounty_hunters)
            .length

        _help_ ('we can simplify the probability formula using')
        _help_ ('geometric serie')
        _help_ ('https://en.wikipedia.org/wiki/Geometric_series')
        _help_ ('https://fr.wikipedia.org/wiki/S%C3%A9rie_g%C3%A9om%C3%A9trique')
        
        _help_ ('the next line should be')
        _help_ ('1 - Math.pow(9/10, number_of_encounter_with_bounty_hunter)')
        _help_ ("but javascript doesn't handled float computations ")
        _help_ ('https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript')

        return  (Math.pow(10, number_of_encounter_with_bounty_hunter) - Math.pow(9, number_of_encounter_with_bounty_hunter)) / Math.pow(10, number_of_encounter_with_bounty_hunter) 
    }