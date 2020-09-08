/**
 * update user details
 * request:
 *   - token: access token
 *   - id: the user who requested to update profile
 *   - email: new email of the user
 *   - name: new user name
 *   - password: new user password
 * response:
 *   - status: 0 = success, 1 = update failed, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'
import bcrypt from 'bcrypt';

const { user } = models;

export default (req, res) => {
  const saltRounds = 10;
  const {token, id, email, name, ppassword, npassword} = req.body

  if(!token || id === undefined || !email || !name || !ppassword || !npassword) {
    res.status(400).send('invalid input')
    return
  }
  let password = ''
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    user
      .findByPk(id)
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        password = model
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 2 })
      })
    if (bcrypt.compare(ppassword, password)) {
      bcrypt.hash(npassword, saltRounds, (err, hash) => {

        if(err) {
          return res.status(500).json({
            type: 'error',
            message: 'Bcrypt failed'
          });
        }

        user
        .update(
          { email, name, password: hash },
          { where: { id } }
        )
        .then(([affected_row, _]) => {
          if (affected_row <= 0) return res.status(500).json({ status: 1 })
          res.status(200).json({ status: 0 })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({ status: 2 })
        })
      });
    }
    else {
      res.status(400).send('Wrong password')
    }
  })
}

