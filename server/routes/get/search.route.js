/**
 * get specific course info
 * request:
 *   - course_id: id of that specific course
 *   - token: access token
 * response:
 *   - trainer_id: the trainer who associated with the course
 *   - admin_id: the admin who create the course
 *   - title: title of the course
 *   - desc: course description
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course } = models;

export default (req, res) => {

  const { token, searchName } = req.query

  if (!token || !searchName) {
    return res.status(400).send('invalid usage')
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    course
      .findAll()
      .then((models) => {
        if (!models) return res.status(200).json({ status: 1 })
        const courses = []
        for(const model of models){
          if(model.title.toLowerCase().includes(searchName)){
            const { trainer_id, admin_id, title, desc, duration, status } = model
            courses.push({trainer_id, admin_id, title, desc, duration, status})
          }
        }
        res.status(200).json({ status: 0, courses })
        
      })
      .catch((error) => { 
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })

}