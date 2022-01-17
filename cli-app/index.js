import { load_json, load_millennium_config } from '../common-src/input/loaders.js';
import { build_input } from '../common-src/input/builder.js';
import { compute_odds } from '../common-src/computations/odds-computer.js';
import process from 'process'


const [ millennium_conf_path, empire_conf_path ] = [process.argv[2],process.argv[3]];

(async () => {

    const millennium_config = await load_millennium_config (millennium_conf_path)
    const empire_config = await load_json (empire_conf_path)
    const input =  build_input (millennium_config) (empire_config)
    const { odds } = compute_odds (input)
    
    console.log (odds)

}) ()
