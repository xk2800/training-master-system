/**
 * get recent discussion
 * request:
 *   - token: access token
 *   - limit: the max number of discussion should get
 *   - offset: the offset number for database
 * response:
 *   - discussions:
 *     - user_id: the user who made this discussion
 *     - content: the discussion text
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import { models } from '../../db.js'
import verifier from '../../utils/token-verifier.js'

const { discussion } = models;

export default (req, res) => {
  
  const { token, limit, offset, course_id } = req.query
  if (!token || limit === undefined || offset === undefined || course_id === undefined) {
    return res.status(400).send('invalid usage')
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    discussion
      .findAll({
        where: { course_id }
      },
      {
        order: [['id', 'DESC']],
        limit, offset
      })
      .then((models) => {
        const discussions = []
        for (const model of models) {
          const { id, user_id, content, datetime } = model
          discussions.push({ id, user_id, content, datetime })
        }
        res.status(200).json({ status: 0, discussions })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })

}