/**
 * create a course associated with a trainer
 * request:
 *   - token: access token
 *   - admin_id: the admin that editing the course
 *   - course_id: the editing course
 *   - title: new title of the course
 *   - desc: new course description
 * response:
 *   - status: 0 = success, 1 = account exists, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course, Admin, Trainer, enrollment } = models;

export default (req, res) => {

  const {token, admin_id, trainer_id, course_id, title, desc} = req.body
  console.log(req.body)

  if(!token || admin_id === undefined || trainer_id == undefined || course_id === undefined || !title || !desc) {
    res.status(400).send('invalid input')
    return
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    Admin
      .findOne({ where: { userId: admin_id } })
      .then((admin) => {
        Trainer
          .findOne({ where: { userId: trainer_id } })
          .then((trainer) => {
            course
              .update({ title, desc, trainer_id: trainer.id }, { where: { id: course_id, admin_id: admin.id } })
              .then(([affected_row, _]) => {
                if (affected_row <= 0) return res.status(500).json({ status: 1 })
                enrollment
                  .update({ trainer_id: trainer.id }, { where: { course_id: course_id } })
                  .then(([affected_row, _]) => {
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

