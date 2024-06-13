import { Router } from "express";
import { getAllHighscores} from '../controllers/highscores.js'
import {addHighscore} from '../controllers/highscores.js'
import {Validatie} from "../middleware/validatie.js";
const highscoreRouter = Router();

highscoreRouter.route('/')
    .get(getAllHighscores)
    .post(Validatie, addHighscore)

export {highscoreRouter};