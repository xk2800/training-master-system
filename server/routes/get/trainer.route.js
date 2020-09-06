/**
 * get user data
 * request:
 *   - token: access token
 *   - id: user id
 * response:
 *   - name: the user display name
 *   - email: email address of user account
 *   - type: user account type
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Trainer } = models

export default (req, res) => {
  
  const { token, id, trainer_id } = req.query

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    if(id !== undefined)
      Trainer
        .findOne({ where: { userId: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { id, email, name, type } = model
          res.status(200).json({
            status: 0,
            id, email, name, type
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
    else if(trainer_id !== undefined)
      Trainer
      .findOne({ where: { id: id } })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        const { userId, email, name, type } = model
        res.status(200).json({
          status: 0,
          userId, email, name, type
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 2 })
      })
  })

}