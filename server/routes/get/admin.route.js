/**
 * get user data
 * request:
 *   - token: access token AND
 *   - id: user id OR
 *   - admin_id: admin id
 * response:
 *   - id: the admin id OR
 *   - userId: the admin's user id AND
 *   - title: admin's title
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Admin } = models

export default (req, res) => {
  
  const { token, id, admin_id } = req.query

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    if(id !== undefined)
      Admin
        .findOne({ where: { userId: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { id, title } = model
          res.status(200).json({
            status: 0,
            id, title
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
    else if(admin_id !== undefined)
      Admin
        .findOne({ where: { id: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { userId, title } = model
          res.status(200).json({
            status: 0,
            userId, title
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
  })

}