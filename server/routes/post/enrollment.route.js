/**
 * enroll trainee to a course
 * request: 
 *    - course_id: id of the chosen course
 *    - user_id: user id of the trainee
 * response: 
 *    - status: 0 = success, 1 = previously enrolled, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { course, Trainee, enrollment } = models;

export default (req, res) => {

  enrollment.belongsTo(course, {foreignKey: 'course_id'});
  enrollment.belongsTo(Trainee, {foreignKey: 'user_id'});

  const { token, trainee_id, course_id } = req.body.params;

  if(!token || trainee_id === undefined || course_id === undefined)
    return res.status(400).send('Enroll Failed')
  
  verifier(token, (valid) => {
    if(!valid) return res.status(200).json({ status: 1 })
    course
      .findOne({ where: {id: course_id}})
      .then(course => {
        Trainee
          .findOne({ where: {userId: trainee_id}})
          .then(trainee => {
            enrollment
              .findOrCreate({
                where: {
                  user_id: trainee.userId,
                  course_id: course.id
                },
                defaults: {
                  user_id: trainee.userId,
                  course_id: course.id
                }
              })
              .then(([model_enrollment, isCreated]) => {
                if(!isCreated) {
                  return res.status(500).send({ status: 1 })
                }
                res.status(200).json({ status: 0 });
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({ status: 2 })
              })
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json({ status: 2 })
          })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ status: 2 })
      })
  })

}
