/**
 * get enrolled, handling, or, teaching course from specific user
 * request:
 *   - token: access token
 *   - user_id: user that viewing all enrolled, handling, or, teaching course
 * response:
 *   - courses:
 *     - trainer_id: the trainer who associated with the course
 *     - title: title of the course
 *     - desc: course description
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course, user, enrollment } = models;

export default (req, res) => {

  const { token, user_id } = req.query

  if (!token || user_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(user_id, res, (type) => {
      if (type === 0) {
        get_course('admin_id', user_id, res)
      } else if (type === 1) {
        get_course('trainer_id', user_id, res)
      } else if (type === 2) {
        enrollment
          .findAll({ where: { user_id } })
          .then(async (models) => {
            try {
              const courses = []
              for (const model of models) {
                const { course_id } = model
                const course_model = await course.findOne({ where: { id: course_id } })
                const { trainer_id, title, desc, duration, status } = course_model
                courses.push({ trainer_id, title, desc, duration, status })
              }
              res.status(200).json({ status: 0, courses })
            } catch (error) {
              console.log(error)
              res.status(500).json({ status: 2 })
            }
          })
          .catch((error) => { 
            console.log(error)
            res.status(500).json({ status: 2 })
          })
      }
    })
    
  })

}

const get_type = (id, res, callback) => {
  user
    .findOne({ where: { id } })
    .then((model) => {
      if (!model) return res.status(200).send({ status: 1 })
      callback(model.type)
    })
    .catch((error) => { 
      console.log(error)
      res.status(500).json({ status: 2 })
    })
}

const get_course = (typename, id, res) => {
  const where = {}
  where[typename] = id
  course
    .findAll({ where })
    .then((models) => {
      const courses = []
      for (const model of models) {
        const { trainer_id, title, desc } = model
        courses.push({ trainer_id, title, desc })
      }
      res.status(200).json({ status: 0, courses })
    })
    .catch((error) => { 
      console.log(error)
      res.status(500).json({ status: 2 })
    })
}
