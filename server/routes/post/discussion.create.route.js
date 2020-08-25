/**
 * create a new discussion post
 * request:
 *   - content: discussion post's content
 * response:
 *   - status: 0 = success, 1 = fail, 2 = error occurs
 */

import { models } from '../../db.js'

const { discussion } = models;

export default (req, res) => {
  const { content } = req.body;
  console.log(req.body);

  if(!content) {
    res.status(400).send('Content cannot be empty');
    return
  }
  discussion
    .create({
      content: content
    })
    .then((data) => {
      res.status(200).json({ status: 0 })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ status: 2 })
    })
}