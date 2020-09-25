/**
 * get all the enrolled courses
 * request:
 *   - token: access token
 *   - user_id: current user's id
 * response:
 *   - courses:
 *     - id: the enrolled course id
 *     - trainer_id: the trainer who associated with the course
 *     - admin_id: the admin who created the course
 *     - title: title of the course
 *     - desc: course description
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course, Trainee, enrollment } = models;

export default (req, res) => {

  const { token, user_id } = req.query

  if (!token || user_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    Trainee
      .findOne({where: {userId: user_id}})
      .then((trainee) => {
        enrollment
          .findAll({ where: { trainee_id: trainee.id }})
          .then((enrollment) => {
            for (const enroll of enrollment) {
              course
              .findAll({ where: { id: enroll.course_id }})
              .then((models) => {
                const courses = []
                for (const model of models) {
                  const { id, trainer_id, admin_id, title, desc } = model
                  courses.push({ id, trainer_id, admin_id, title, desc })
                }
                res.status(200).json({ status: 0, courses })
              })
              .catch((error) => { 
                console.log(error)
                res.status(500).json({ status: 2 })
              })
            }
          })
          .catch((error) => { 
            console.log(error)
            res.status(500).json({ status: 2 })
          })
      })
    
  })

}