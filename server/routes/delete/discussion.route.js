/**
 * delete a discussion made by the user
 * request:
 *   - token: access token
 *   - id: the discussion post
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */
import verifier from '../../utils/token-verifier.js'
import {models} from '../../db.js';

const { discussion } = models;

export default (req, res) => {
  const { token, id } = req.query
  console.log("id: " + id)
  
  if(!token || id === undefined) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    discussion
      .destroy({ where: { id } })
      .then((destroyed_row) => {
        if (destroyed_row <= 0) return res.status(500).json({ status: 1 })
        res.status(200).json({ status: 0 })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })
}