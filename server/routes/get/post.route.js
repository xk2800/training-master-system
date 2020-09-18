/**
 * get all post from a course
 * request:
 *   - token: the access token
 *   - user_id: the user that trying to get post information
 *   - course_id: course id
 * response:
 *   - posts:
 *     - title: the post title
 *     - desc: the post description
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js';

const { post, user, course, enrollment, Trainer } = models;

export default (req, res) => {

  const { token, user_id, course_id } = req.query

  if (!token || user_id === undefined || course_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  const get_type = (id, res, callback) => {
    user
      .findOne({ where: { id } })
      .then((model) => {
        if (!model) return res.status(200).send({ status: 1 })
        callback(model.type)
      })
      .catch((error) => { error_handle(error, res) })
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(user_id, res, (type) => {
      if (type === 0) {
        get_posts(course_id, res)
      } else if (type === 1) {
        check_trainer(user_id, course_id, res)
      } else if (type === 2) {
        check_enrolled(user_id, course_id, res)
      }
    })
  })

  const get_posts = (course_id, res) => {
    post
      .findAll({ where: { course_id } })
      .then((models) => {
        const posts = []
        for (const model of models) {
          const { id, title, desc, content, fileName  } = model
          posts.push({ id, title, desc, content, fileName })
        }
        res.status(200).send({ status: 0, posts })
      })
      .catch((error) => { error_handle(error, res) })
  }

  const check_enrolled = (user_id, course_id, res) => {
    enrollment
      .findOne({ where: { user_id, course_id } })
      .then((model) => {
        if (!model) return res.status(200).send({ status: 1 })
        get_posts(course_id, res)
      })
      .catch((error) => { error_handle(error, res) })
  }

  const check_trainer = (user_id, course_id, res) => {
    Trainer
      .findOne({ where: { userId: user_id } })
      .then((trainer) => {
        course
        .findOne({ where: { id: course_id, trainer_id: trainer.id } })
        .then((model) => {
          if (!model) return res.status(200).send({ status: 1 })
          get_posts(course_id, res)
        })
        .catch((error) => { error_handle(error, res) })
      })
      .catch((error) => { error_handle(error, res) })
    
  }

  const error_handle = (error, res) => {
    console.log(error)
    res.status(500).send({ status: 2 })
  }

}