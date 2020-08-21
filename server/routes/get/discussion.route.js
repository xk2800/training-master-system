import { models } from '../../db.js'

const { discussion } = models

export default (req, res) => {
  const id = req.params.id
  console.log(id);
  
  discussion
    .findByPk(id) 
    .then(data => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving discussion post id = ' + id);
    })
}