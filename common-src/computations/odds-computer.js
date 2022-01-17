import { probability_of_failure } from "./probabilty-of-failure.js";
import { dijsktra_travel_plan } from "./travel-plan.js";


export const compute_odds = 
    input_data => {
        const plan = dijsktra_travel_plan (input_data)
        const failure_proba = probability_of_failure (plan)
        const odds = 100 - failure_proba * 100
        return {
            odds, 
            ...plan
        }
    }