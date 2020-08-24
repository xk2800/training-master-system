import { models } from '../../db.js'

const { discussion } = models;

export default (req, res) => {
  const id = null; // req.params.id
  console.log(id);
  
  if(id == null) {
    discussion
    .findAll()
    .then(data => {
      res.status(200).json(data);
      console.log('data: ' + data);
      return
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('Error retrieving discussion post');
    })
  }
  else {
    discussion
    .findByPk(id) 
    .then(data => {
      res.status(200).json(data.content);
      console.log('data: ' + data.content);
      return
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('Error retrieving discussion post id = ' + id);
    })
  }
}