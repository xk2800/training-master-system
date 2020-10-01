/**
 * get all the existsing trainee
 * request:
 *   - admin_id: the admin that getting all trainee
 *   - token: access token
 * response:
 *   - trainees:
 *     - trainee_id: the trainee who associated with the course
 *     - name: name of the trainee
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { user, enrollment, Trainer,course } = models;

export default (req, res) => {

  const { token, user_id, course_id } = req.query

  console.log(req.query)
  if (!token || user_id === undefined || course_id === undefined) {
    return res.status(400).send('invalid usage')
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(user_id, res, (type) => {
      if (type !== 2) return res.status(200).send({ status: 1 })
        enrollment
          .findOne({where : { course_id, user_id }})
          .then((model) => {
            if(!model) return res.status(500).json({ status: 1 })
            Trainer
              .findOne({ where: { id: model.trainer_id } })
              .then((trainer) => {
                user
                  .findOne({ where: {id: trainer.userId } })
                  .then((user) => {
                    course
                      .findOne({ where: { id: course_id } })
                      .then((course) => {
                        const { desc, duration } = course
                        const { name } = user
                        const { id } = trainer
                        const {grade, progress, rateSubmitted, enrollDate} = model
                        res.status(200).json({ status: 0, id, desc, duration, name, grade, progress, rateSubmitted, enrollDate })
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
