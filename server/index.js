import "dotenv/config.js";

import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

import sequelize from './db.js'
import router from './routes/index.js'
import {errorHandingMiddleware} from './middleware/index.js'

import path from 'path'
import { fileURLToPath } from 'url'

const PORT = process.env.SERVER_PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/static'))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandingMiddleware)

const start = async () => {
   try {
       await sequelize.authenticate()
       await sequelize.sync()
       app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
   } catch (e) {
       console.log(e)
   }
}


start()