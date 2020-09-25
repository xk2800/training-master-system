/**
 * get all feedback from a course
 * request:
 *   - token: the access token
 *   - user_id: the user that trying to get feedback information
 *   - course_id: course id
 * response:
 *   - feedbacks:
 *     - title: the feedback title
 *     - content: the feedback content
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js';

const { feedback, user, Trainer, course, Trainee } = models;

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
        get_feedbacks(course_id, res)
      } 
      else if (type === 1) {
        check_trainer(user_id, course_id, res)
      }
      else{
        check_trainee(user_id, course_id, res)
      }
    })
  })

  const get_feedbacks = (course_id, res) => {
    feedback
      .findAll({ where: { course_id } })
      .then((models) => {
        const feedbacks = []
        for (const model of models) {
          const { trainee_id, title, content } = model
          feedbacks.push({ trainee_id, title, content })
        }
        res.status(200).send({ status: 0, feedbacks })
      })
      .catch((error) => {
        error_handle(error, res) })
  }

  const check_trainer = (user_id, course_id, res) => {
    Trainer
      .findOne({ where: { userId: user_id } })
      .then(trainer => {
        course
          .findOne({ where: { id: course_id, trainer_id: trainer.id } })
          .then((model) => {
            if (!model) return res.status(200).send({ status: 1 })
            get_feedbacks(course_id, res)
          })
          .catch((error) => { error_handle(error, res) })
      })
  }

  const check_trainee = (user_id, course_id, res) => {
    Trainee
      .findOne({ where: { userId: user_id } })
      .then(trainee => {
        feedback
          .findAll({ where: { trainee_id: trainee.id, course_id } })
          .then((models) => {
            if (!models) return res.status(200).send({ status: 1 })
            const feedbacks = []
            for (const model of models) {
              const { title, content } = model
              feedbacks.push({ title, content })
            }
            res.status(200).send({ status: 0, feedbacks })
          })
          .catch(err => {
            error_handle(err, res)
          })
      })
      .catch(err => {
        error_handle(err, res)
      })
  }

  const error_handle = (error, res) => {
    console.log(error)
    res.status(500).send({ status: 2 })
  }

}