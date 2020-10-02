/**
 * get all course that has been assigned to that trainer
 * request:
 *   - trainer_id: id of that trainer
 *   - token: access token
 * response:
 *   - courses: the courses that has been assigned to trainer
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course, Trainer } = models;

export default (req, res) => {

  const { token, trainer_id } = req.query

  if (!token || trainer_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  const courses = []

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    Trainer
      .findOne({ where: { userId: trainer_id}})
      .then((trainer) => {
        course
          .findAll({ where: { trainer_id: trainer.id } })
          .then((models) => {
            if (!models) return res.status(200).json({ status: 1 })
            for(const model of models){
              const { id, title, desc, duration, status } = model
              courses.push({ id, title, desc, duration, status })
              if(courses.length === models.length){
                res.status(200).json({ status: 0, courses })
              }
            }
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