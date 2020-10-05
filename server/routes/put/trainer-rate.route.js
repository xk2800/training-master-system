/**
 * create a course associated with a trainer
 * request:
 * response:
 *   - status: 0 = success, 1 = account exists, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Trainer } = models;

export default (req, res) => {

  const {token, trainer_id, rating } = req.body.params

  if(!token || trainer_id === undefined || rating === undefined) {
    res.status(400).send('invalid input')
    return
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    var oriRating = 0;
    Trainer
      .findOne({ where: { id: trainer_id } })
      .then((trainer) => {
        oriRating = trainer.rating / 100
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })

    const  newRating = (oriRating === 0) ? (rating * 100) : ((rating + oriRating) / 2 * 100);

    Trainer
      .update({ rating: newRating }, { where: { id: trainer_id } })
      .then(([affected_row, _]) => {
        if (affected_row <= 0) return res.status(500).json({ status: 1 })
        res.status(200).json({ status: 0 })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })

}

