/**
 * create a new user account
 * request:
 *   - email: user's email
 *   - password: user's password
 *   - name: user's name
 *   - type: user type
 * response:
 *   - status: 0 = success, 1 = account exists, 2 = internal error
 */

import { models } from '../../db.js';
import bcrypt from 'bcrypt';

// Salt can be randomized everytime to make it more secure
const saltRounds = 10;
const { user, Trainer, Trainee, Admin } = models;

export default (req, res) => {
  const { name, email, password, type } = req.body

  if (!email || !password || !name || !type) {
    res.status(400).send('invalid input')
    return
  }

  Trainer.belongsTo(user);
  Trainee.belongsTo(user);
  Admin.belongsTo(user);

  bcrypt.hash(password, saltRounds, (err, hash) => {

    if(err) {
      return res.status(500).json({
        type: 'error',
        message: 'Bcrypt failed'
      });
    }
    
    user
      .findOrCreate({
        where: { email: email },
        defaults: {
          email: email,
          password: hash,
          name: name,
          type: type
        }
      })
      .then(([model_user, isCreated]) => {
        if (!isCreated) {
          res.status(200).json({ status: 1 })
          return
        }
        if(model_user.type == 2)
          Trainee.create({
            userId: model_user.id,
            department: ''
          },{
            include:[user]
          });
        else if(model_user.type == 1)
          Trainer.create({
            userId: model_user.id,
            name: model_user.name,
            title: ''
          },{
            include:[user]
          });
        res.status(200).json({ status: 0 })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ status: 2 })
      })
      
  });
  
}



