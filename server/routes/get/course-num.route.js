/**
 * get all the existsing trainer
 * request:
 *   - user_id: the admin that request for a course number for corresponding trainers/trainees
 *   - id: the trainer/trainee's id
 *   - token: access token
 *   - report_type: type of report generated, 1 - trainer report; 2 - trainee report;
 * response:
 *   
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Trainer, course, user, enrollment } = models;

export default (req, res) => {

  const { token, id, user_id, report_type } = req.query
  if (!token || id === undefined ||user_id === undefined || report_type === undefined) {
    return res.status(400).send('invalid usage')
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(user_id, res, (type) => {
      if (type === 2) return res.status(200).send({ status: 1 })
      if(report_type == 1 && type === 0)
        Trainer
          .findOne({ where: { userId: id } })
          .then((model) => {
            if(!model) return res.status(500).send({ status: 2 })
            course
              .findAll({ where: { trainer_id: model.id } })
              .then((courses) => {
                if(!courses)
                  return res.status(200).send({ status: 0, numCourse: 0 })
                return res.status(200).send({ status: 0, numCourse: courses.length })
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({ status: 2 })
              })
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({ status: 2 })
          })
      else if(report_type == 2)
        enrollment
          .findAll({ where: { user_id: id } })
          .then((courses) => {
            if(!courses)
              return res.status(200).send({ status: 0, numCourse: 0 })
            return res.status(200).send({ status: 0, numCourse: courses.length })
          })
          .catch((err) => {
            console.log(err)
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
