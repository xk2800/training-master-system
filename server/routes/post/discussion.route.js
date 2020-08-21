/**
 * create a new discussion post
 * request:
 *   - subject: discussion post's subject
 *   - content: discussion post's content
 * response:
 *   - status: 0 = success, 1 = fail, 2 = error occurs
 */

import { models } from '../../db.js'

const { discussion } = models

export default (req, res) => {
  const {subject, content} = req.body
  console.log(req.body);

  if(!subject || !content) {
    res.status(400).send('Subject or content cannot be empty');
    return
  }
  discussion
    .create({
      defaults: {
        subject: subject,
        content: content
      }
    })
    .then(([model_discussion, isCreated]) => {
      if (!isCreated) {
        res.status(200).json({ status: 1 })
        return
      }
      res.status(200).json({ status: 0 })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ status: 2 })
    })
}