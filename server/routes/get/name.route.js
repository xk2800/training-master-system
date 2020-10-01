/**
 * get user name using id
 * request:
 *   - id: the user id
 * response:
 *   - name: the name of the id
 *   - status: 0 = success, 1 = not found, 2 = error occurs
 */

import { models } from '../../db.js'

const { user, Trainer } = models;

export default (req, res) => {

  const { id, trainer_id } = req.query;
  
  if (id === undefined && trainer_id === undefined) {
    res.status(400).send('invalid usage')
    return
  }

  if(id !== undefined)
    user
      .findByPk(id)
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        return res.status(200).json({ status: 0, name: model.name })
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 2 })
      })
  else if(trainer_id !== undefined)
    Trainer
      .findOne({
        where: { id: trainer_id }
      })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        user
          .findByPk(model.userId)
          .then((model) => {
            if (!model) return res.status(200).json({ status: 1 })
            return res.status(200).json({ status: 0, name: model.name })
          })
          .catch((error) => {
            console.log(error)
            return res.status(500).json({ status: 2 })
          })
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 2 })
      })

}
