/**
 * get user name using id
 * request:
 *   - id: the user id
 * response:
 *   - name: the name of the id
 *   - status: 0 = success, 1 = not found, 2 = error occurs
 */

import { models } from '../../db.js'

const { user } = models;

export default (req, res) => {

  const { id } = req.query;
  
  if (id === undefined) {
    res.status(400).send('invalid usage')
    return
  }

  user
    .findOne({
      where: { id }
    })
    .then((model) => {
      if (!model) return res.status(200).json({ status: 1 })
      return res.status(200).json({ status: 0, name: model.name })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ status: 2 })
    })

}
