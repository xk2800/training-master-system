import { models } from '../../db.js'

const { user } = models

export default (req, res) => {
  const email = req.params.email;
  console.log('Searching for user with email: ' + email);

  user.findAll({
    where: {
      email: email
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("Some error occurred while retrieving user data.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data."
      });
    });
}