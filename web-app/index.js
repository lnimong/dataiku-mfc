import { travel_plan } from '../common-src/travel-plan.js'
import express from 'express'

const app = express()
app.use('/',express.static('web-app/public'));


console.log(travel_plan())
app.listen(3000)
