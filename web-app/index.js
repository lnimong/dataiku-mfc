import { load_millennium_config } from '../common-src/input/loaders.js';
import express from 'express'
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser'
import { build_input } from '../common-src/input/builder.js';
import { compute_odds } from '../common-src/computations/odds-computer.js';


(async () => {

    const millennium_config = await load_millennium_config ('./config/millennium-falcon.json')

    const input =  build_input (millennium_config) 

    const app = express()

    app.use(fileUpload())    
    app.use('/',express.static('web-app/public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
   
    app.post('/api/compute-odds', function (req, res) {
        
        console.log( JSON.stringify (input(req.body), null, 2) )
        res.send(compute_odds(input(req.body)));
    })

    app.post('/api/compute-odds/upload', function (req, res) {
        
        let {file} = req.files
        const empire_json = JSON.parse (file.data.toString())

        res.send({ 
            empire_json,
            result : compute_odds(input(empire_json))
        })
    })

    app.listen(3000)
}) ()
