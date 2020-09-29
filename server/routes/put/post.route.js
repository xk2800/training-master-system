/**
 * update a post from the course
 * request:
 *   - token: access token
 *   - trainer_id: the trainer who made the post
 *   - course_id: course that getting the post
 *   - title: the new post title
 *   - desc: the new post description
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import {models} from '../../db.js';

const { post } = models;

export default (req, res) => {

  const { token, trainer_id, course_id, title, desc, fileName, content } = req.body;
  if(!token || trainer_id === undefined || course_id === undefined || !title) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    if(!fileName || !content)
      post
        .update({ title, desc },{ where: { course_id, trainer_id}})
        .then(([affected_row, _]) => {
          if (affected_row <= 0) return res.status(500).json({ status: 1 })
          res.status(200).json({ status: 0 })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({ status: 2 })
        })
    else
      post
        .update({ title, desc, fileName, content }, { where: { course_id, trainer_id } })
        .then(([affected_row, _]) => {
          if (affected_row <= 0) return res.status(500).json({ status: 1 })
          res.status(200).json({ status: 0 })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({ status: 2 })
        })
  })

}