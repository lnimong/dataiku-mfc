import fs from 'fs/promises'
import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const load_json = async fpath => JSON.parse ((await fs.readFile (fpath)).toString())

export const load_millennium_config = 

    async (millennium_conf_path) => {

        const config_dir = path.dirname (millennium_conf_path)

        const { autonomy, departure, arrival, routes_db } = 
            await load_json (millennium_conf_path)

        const db = await open({
            filename:  path.join(config_dir, routes_db),
            driver: sqlite3.Database
        })
        const routes = await db.all('SELECT * FROM ROUTES')

        return { autonomy, departure, arrival, routes }
    }
