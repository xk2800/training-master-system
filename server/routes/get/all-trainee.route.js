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

const { user } = models;

export default (req, res) => {

  const { token, user_id } = req.query

  if (!token || user_id === undefined) {
    return res.status(400).send('invalid usage')
  }
  
  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    get_type(user_id, res, (type) => {
      if (type !== 0) return res.status(200).send({ status: 1 })
      user
        .findAll({where : { type: 2 }})
        .then((models) => {
          const trainees = []
          for (const model of models) {
            const { id, name } = model
            trainees.push({ trainee_id: id, name })
          }
          return res.status(200).send({ status: 0, trainees })
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
