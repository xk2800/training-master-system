/**
 * delete a course created by the admin
 * request:
 *   - token: access token
 *   - admin_id: the admin that deleting the course
 *   - course_id: the deleting course
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course } = models;

export default (req, res) => {

  const {token, admin_id, course_id} = req.body

  if(!token || admin_id === undefined || course_id === undefined) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    course
      .destroy({ where: { id: course_id, admin_id } })
      .then((destroyed_row) => {
        if (destroyed_row <= 0) return res.status(500).json({ status: 1 })
        res.status(200).json({ status: 0 })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })

}

