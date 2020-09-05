/**
 * authenticate the user
 * request:
 *   - email: user's email
 *   - password: user's password
 * response:
 *   - status: 0 = success, 1 = account not exists, 2 = failed, 3 = internal error
 */

import { models } from '../../db.js'
import { secret } from '../../config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const { user } = models

export default (req, res) => {
  
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({ status: 2 })
  }
   
  models.user
    .findOne({ where: { email } })
    .then((model) => {
      if (!model) return res.status(200).json({ status: 1 })
      const { id, email } = model
      bcrypt.compare(password, model.password, (err, result) => {
        if (err) return res.status(500).json({ status: 3 })
        if (result) {
          res.status(200).json({
            status: 0, id,
            token: jwt.sign({ id, email }, secret),
            type: model.type
          })
        } else {
          res.status(200).json({ status: 2 })
        }
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ status: 3 })
    })

}

