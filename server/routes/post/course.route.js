/**
 * create a course associated with a trainer
 * request:
 *   - token: access token
 *   - admin_id: the admin that creating the course
 *   - trainer_id: the assigned trainer 
 *   - title: title of the course
 *   - desc: course description
 * response:
 *   - title: newly created course title
 *   - desc: newly created course description
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'
 
const { course, user } = models;

export default (req, res) => {

  const {token, admin_id, trainer_id, title, desc} = req.body

  if(!token || admin_id === undefined || trainer_id === undefined || !title || !desc) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(admin_id, res, (type) => {
      if (type !== 0)  return res.status(200).json({ status: 1 })
      get_type(trainer_id, res, (type) => {
        if (type !== 1)  return res.status(200).json({ status: 1 })
        course
          .create({ admin_id, trainer_id, title, desc })
          .then((model) => {
            if (!model) return res.status(500).json({ status: 2 })
            res.status(200).json({ status: 0 })
          })
          .catch((error) => { 
            console.log(error)
            res.status(500).json({ status: 2 })
          })
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
