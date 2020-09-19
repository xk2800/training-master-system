/**
 * create a new post for the course
 * request:
 *   - token: access token
 *   - trainer_id: the trainer who made the post
 *   - course_id: course that getting the post
 *   - title: the post title
 *   - desc: post description
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import {models} from '../../db.js';

const { post, course, Trainer } = models;

export default (req, res) => {

  const { token, trainer_id, course_id, title, desc, content, fileName } = req.body;
  if(!token || trainer_id === undefined || course_id === undefined || !title || !desc || !content || !fileName) {
    res.status(400).send('invalid input')
    return
  }

  console.log('hi' + content)

  post.belongsTo(Trainer, {foreignKey: 'trainer_id'});

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    Trainer
      .findOne({ where: { userId: trainer_id }})
      .then((trainer) => {
        course
          .findOne({ where: { id: course_id, trainer_id: trainer.id } })
          .then((model) => {
            if (!model) return res.status(200).json({ status: 1 })
            post
              .create({ course_id, trainer_id: trainer.id, title, desc, fileName, content }, { include: [Trainer] })
              .then((model) => {
                if (!model) return res.status(500).json({ status: 2 })
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
      .catch((err) => {
        console.log(err)
        res.status(500).json({ status: 2 })
      })
    
  })

};