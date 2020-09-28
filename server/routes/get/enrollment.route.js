/**
 * get enrollment status
 * request:
 *   - token: access token
 *   - user_id: current user's id
 *   - course_id: the course to be checked for enrolled state
 * response:
 *   - status: 0 = enrolled, 1 = not enroll, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { enrollment } = models;

export default (req, res) => {

  const { token, user_id, course_id } = req.query
 

  if (!token || user_id === undefined || course_id === undefined) {
    return res.status(400).send('invalid usage')
  }


  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    enrollment
      .findOne({ where: { user_id, course_id }})
      .then((enrollment) => {
        if(!enrollment) return res.status(200).json({ status: 1 })
        const { traineeRateNum } = enrollment
        return res.status(200).json({ status: 0, traineeRateNum })
      })
      .catch((error) => { 
        console.log(error)
        res.status(500).json({ status: 2 })
      })    
  
  })
}
