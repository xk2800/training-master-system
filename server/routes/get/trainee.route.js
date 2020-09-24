/**
 * get user data
 * request:
 *   - token: access token AND
 *   - id: user id OR
 *   - trainee_id: trainee_id
 * response:
 *   - id: the trainee id OR
 *   - userId: the trainee's user id AND
 *   - department: user department
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Trainee } = models

export default (req, res) => {
  
  const { token, id, trainee_id } = req.query

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    if(id !== undefined)
      Trainee
        .findOne({ where: { userId: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { id, department } = model
          res.status(200).json({
            status: 0,
            id, department
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
    else if(trainee_id !== undefined)
      Trainee
        .findOne({ where: { id: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { userId, department } = model
          res.status(200).json({
            status: 0,
            userId, department
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
  })

}