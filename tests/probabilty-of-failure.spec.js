import  { probability_of_failure } from '../common-src/probabilty-of-failure'

describe ('the probability of failure', () => { 
    
    test ("is 0 IF the params are undefined", () => {
        expect (probability_of_failure()).toBe(0)
    })

    test ("is 0.1 IF there is one stop with bounty hunters", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', bounty_hunters : true  },
                    { planet : 'mars', bounty_hunters : false  }
                ]
            })
        ).toBe(0.1)
    })
    
    test ("is 0.19 IF there are 2 stop with bounty hunters", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', bounty_hunters : true  },
                    { planet : 'mars', bounty_hunters : true  }
                ]
            })
        ).toBe(0.19)
    })
    
    test ("is 0.271 IF there are 2 stop with bounty hunters", () => {
        expect (
            probability_of_failure({ 
                travel_plan : [
                    { planet : 'earth', bounty_hunters : true  },
                    { planet : 'mars', bounty_hunters : true  },
                    { planet : 'jupiter', bounty_hunters : true  }
                ]
            })
        ).toBe(0.271)
    })

})