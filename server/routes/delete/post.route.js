/**
 * delete a post from the course
 * request:
 *   - token: access token
 *   - trainer_id: the trainer who made the post
 *   - course_id: course that getting the post
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import {models} from '../../db.js';

const { post } = models;

export default (req, res) => {
  const { token, trainer_id, course_id } = req.body
  
  if(!token || trainer_id === undefined || course_id === undefined) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    post
      .destroy({ where: { id: course_id, trainer_id } })
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