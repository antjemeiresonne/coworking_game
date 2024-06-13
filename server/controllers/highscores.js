import {pool} from "../db.js"

export const getAllHighscores = async (req, res) => {
    const query = 'SELECT * FROM highscores ORDER BY score LIMIT 5;'
    try {
      const [rows] = await pool.execute(query);
      res.status(200)
        .json({
          data: rows
        })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  export const addHighscore =async(req,res) => {
    const { naam, score } = req.body;
    const query = 'INSERT INTO highscores (naam, score) VALUES (? , ?)'
    const values = [ naam, score ]
  
    try{
      const [result] = await pool.execute(query,values)
        res.status(201).json({
          status: 'success',
          id: result.insertId
        })
    } catch(error) {
      console.error('Error adding highscore', error)
      return res.status(500).json({
        status: 'error',
        message: 'internal server error'
      })
    }
  }