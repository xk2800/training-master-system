/**
 * create a new user account
 * request:
 *   - email: user's email
 *   - password: user's password
 *   - name: user's name
 *   - type: user type
 * response:
 *   - status: 0 = success, 1 = account exists, 2 = internal error
 */

import { models } from '../../db.js'

const { user } = models;

export default (req, res) => {
  const { name, email, password, type } = req.body
  console.log(req.body)

  if (!email || !password || !name || !type) {
    res.status(400).send('invalid input')
    return
  }
  user
    .findOrCreate({
      where: { email: email },
      defaults: {
        email: email,
        password: password,
        name: name,
        type: type
      }
    })
    .then(([model_user, isCreated]) => {
      if (!isCreated) {
        res.status(200).json({ status: 1 })
        return
      }
      res.status(200).json({ status: 0 })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ status: 2 })
    })
}



