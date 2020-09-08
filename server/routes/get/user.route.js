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

const { user } = models

export default (req, res) => {
  
  const { token, id } = req.query

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    user
      .findOne({ where: { id } })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        const { email, name, type, password } = model
        res.status(200).json({
          status: 0,
          email, name, type, password
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 2 })
      })
  })

}