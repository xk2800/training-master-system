/**
 * get specific course info
 * request:
 *   - course_id: id of that specific course
 *   - token: access token
 * response:
 *   - trainer_id: the trainer who associated with the course
 *   - admin_id: the admin who create the course
 *   - title: title of the course
 *   - desc: course description
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course } = models;

export default (req, res) => {

  const { token, course_id } = req.query

  if (!token || course_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    course
      .findOne({ where: { id: course_id } })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        const { trainer_id, admin_id, title, desc } = model
        res.status(200).json({ status: 0, admin_id, trainer_id, title, desc })
      })
      .catch((error) => { 
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })

}