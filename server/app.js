import express from 'express'
import cors from 'cors'
import { highscoreRouter } from './routers/highscores.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/highscores', highscoreRouter)

export {app}