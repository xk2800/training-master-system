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

const { post, Trainer } = models;

export default (req, res) => {

  const { token, post_id, trainer_id, course_id, title, desc, fileName, content } = req.body;
  if(!token || post_id === undefined || trainer_id === undefined || course_id === undefined || !title) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    Trainer
      .findOne({ where: { userId: trainer_id } })
      .then((trainer) => {
        if(!fileName || !content)
          post
            .update({ title, desc },{ where: { id: post_id, course_id, trainer_id: trainer.id}})
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
            .update({ title, desc, fileName, content }, { where: { id: post_id, course_id, trainer_id: trainer.id } })
            .then(([affected_row, _]) => {
              if (affected_row <= 0) return res.status(500).json({ status: 1 })
              res.status(200).json({ status: 0 })
            })
            .catch((error) => {
              console.log(error)
              res.status(500).json({ status: 2 })
            })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
    
  })

}