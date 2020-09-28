/**
 * create a course associated with a trainer
 * request:
 * response:
 *   - status: 0 = success, 1 = account exists, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { enrollment } = models;

export default (req, res) => {

  const {token, trainer_id, course_id, trainee_id, traineeRateNum } = req.body.params

  if(!token || trainer_id === undefined || course_id === undefined || trainee_id === undefined || traineeRateNum === undefined) {
    res.status(400).send('invalid input')
    return
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    enrollment
      .update({ traineeRateNum }, { where: { course_id, trainer_id, user_id: trainee_id } })
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

