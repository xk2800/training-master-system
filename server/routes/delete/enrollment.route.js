/**
 * enroll trainee to a course
 * request: 
 *    - course_id: id of the chosen course
 *    - user_id: user id of the trainee
 * response: 
 *    - status: 0 = success, 1 = not enrolled, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { enrollment } = models;

export default (req, res) => {

  console.log(req.query)

  const { token, trainee_id, course_id } = req.query;

  if(!token || trainee_id === undefined || course_id === undefined)
    return res.status(400).send('invalid input')
  
  verifier(token, (valid) => {
    if(!valid) return res.status(200).json({ status: 1 })
    enrollment
      .destroy({
        where: {
          user_id: trainee_id,
          course_id: course_id
        }
      })
      .then((destroyed_row) => {
        if (destroyed_row <= 0) return res.status(500).json({ status: 1 });
        res.status(200).json({ status: 0 })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ status: 2 })
      })
  })

}
