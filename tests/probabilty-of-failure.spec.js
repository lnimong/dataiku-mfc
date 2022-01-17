import  { probability_of_failure } from '../common-src/computations/probabilty-of-failure'

describe ('the probability of failure', () => { 
    
    test ("is 1 IF there is no plan", () => {
        expect (probability_of_failure()).toBe(1)
        expect (probability_of_failure({travel_plan : []})).toBe(1)
    })

    test ("is 1 IF there is no risk", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', risky : false  },
                    { planet : 'mars', risky : false  }
                ]
            })
        ).toBe(0)
    })

    test ("is 0.1 IF there is one stop with risk", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', risky : true  },
                    { planet : 'mars', risky : false  }
                ]
            })
        ).toBe(0.1)
    })
    
    test ("is 0.19 IF there are 2 stop with risk", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', risky : true  },
                    { planet : 'mars', risky : true  }
                ]
            })
        ).toBe(0.19)
    })
    
    test ("is 0.271 IF there are 2 stop with risk", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', risky : true  },
                    { planet : 'mars', risky : true  },
                    { planet : 'jupiter', risky : true  }
                ]
            })
        ).toBe(0.271)
    })

})