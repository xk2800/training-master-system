/**
 * create a new feedback
 * request:
 *   - token: access token
 *   - trainee_id: the trainer who send this feedback
 *   - course_id: course that getting receiving feedback
 *   - title: the feedback title
 *   - content: the feedback content
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js';

const { feedback, Trainee, course } = models;

export default (req, res) => {

  feedback.belongsTo(Trainee, {foreignKey: 'trainee_id'});
  feedback.belongsTo(course, {foreignKey: 'course_id'});

  const { token, course_id, trainee_id, title, desc } = req.body;
  if(!token || trainee_id === undefined || course_id === undefined || !title || !desc) {
    res.status(400).send('invalid input')
    return
  }

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    course
      .findOne({ where: { id: course_id } })
      .then((model) => {
        if (!model) return res.status(200).json({ status: 1 })
        feedback
          .create({ trainee_id, course_id, title, content }, { include: [Trainee] } )
          .then((model) => {
            if (!model) return res.status(500).json({ status: 2 })
            res.status(200).json({ status: 0 })
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({ status: 2 })
          })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
  })
}