import "dotenv/config.js";

import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

import sequelize from './db'
import router from './routes'
import {errorHandingMiddleware} from './middleware'

import path from 'node:path'

const PORT = process.env.CLIENT_PORT || 5555

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
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