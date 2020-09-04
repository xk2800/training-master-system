/**
 * create a new discussion post
 * request:
 *   - token: access token
 *   - user_id: the user who made this discussion
 *   - content: discussion post's content
 * response:
 *   - status: 0 = success, 1 = fail, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { discussion, user } = models;

export default (req, res) => {
  const { token, user_id, content } = req.body

  if(!content || !user_id || !token) {
    res.status(400).send('Content cannot be empty');
    return
  }

  discussion.belongsTo(user);

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    discussion
      .create({ user_id, content }, { include: [user] })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        res.status(200).json({ status: 0 })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })
  
}