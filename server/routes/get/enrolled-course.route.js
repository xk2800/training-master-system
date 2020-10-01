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

const { course, Trainee, Trainer, Admin, enrollment } = models;

export default (req, res) => {

  enrollment.belongsTo(course, {foreignKey: 'course_id'});
  enrollment.belongsTo(Trainee, {foreignKey: 'user_id'});

  const { token, user_id, type } = req.query

  if (!token || user_id === undefined || type === undefined) {
    return res.status(400).send('invalid usage')
  }
  
  const courses = []
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    
    if(type == 2) {  // trainee
      enrollment
      .findAll({ where: { user_id }})
      .then((enrollment) => {
        for (const enroll of enrollment) {
          course
          .findAll({ where: { id: enroll.course_id }})
          .then((models) => { 
            for (const model of models) {
              const { id, trainer_id, admin_id, title, desc, duration, status } = model
              const { progress, grade } = enroll
              courses.push({ id, trainer_id, admin_id, title, desc, duration, status, progress, grade })
            }
            if(enroll == enrollment[enrollment.length-1])
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
    }
    else if (type == 1) { // trainer
      Trainer
        .findOne({ where: { userId: user_id }})
        .then((trainer) => {
          course
            .findAll({ where: { trainer_id: trainer.id }})
            .then((models) => {
              if (!models) return res.status(200).json({ status: 1 })
              for (const model of models) {
                const { id, trainer_id, admin_id, title, desc, duration, status } = model
                courses.push({ id, trainer_id, admin_id, title, desc, duration, status })
              }
              res.status(200).json({ status: 0, courses })
            })
        })
        .catch((error) => { 
          console.log(error)
          res.status(500).json({ status: 2 })
      })
    }
    else { // admin
      Admin
        .findOne({ where: { userId: user_id }})
        .then((admin) => {
          course
            .findAll({ where: { admin_id: admin.id }})
            .then((models) => {
              for (const model of models) {
                const { id, trainer_id, admin_id, title, desc, duration, status } = model
                courses.push({ id, trainer_id, admin_id, title, desc, duration, status })
              }
              res.status(200).json({ status: 0, courses })
            })
        })
        .catch((error) => { 
          console.log(error)
          res.status(500).json({ status: 2 })
      })
    }
  })

}