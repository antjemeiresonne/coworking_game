import { Router } from "express";
import { getAllHighscores} from '../controllers/highscores.js'
import {addHighscore} from '../controllers/highscores.js'
const highscoreRouter = Router();

highscoreRouter.route('/')
    .get(getAllHighscores)
    .post(addHighscore)

export {highscoreRouter};