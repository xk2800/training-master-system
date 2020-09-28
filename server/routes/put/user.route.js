/**
 * update user details
 * request:
 *   - token: access token
 *   - id: the user who requested to update profile
 *   - email: new email of the user
 *   - name: new user name
 *   - ppassword: user's current password or refer as previous password
 *   - npassword: password that user wanted to change to or refer as new password
 * response:
 *   - status: 0 = success, 1 = access denied, 2 = internal error
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'
import bcrypt from 'bcrypt';

const { user } = models;

export default (req, res) => {
  const saltRounds = 10;
  const {token, id, email, name, ppassword, npassword} = req.body
  if (!token || id === undefined || !ppassword || !npassword) {
    res.status(400).send('invalid input')
    return
  }
  if (!ppassword || !npassword) {
    verifier(token, (valid) => {
      if (!valid) return res.status(200).json({ status: 1 })
      user
        .update(
          { email, name },
          { where: { id } }
        )
        .then(([affected_row, _]) => {
          if (affected_row <= 0) return res.status(500).json({ status: 1 })
          res.status(200).json({ status: 0 })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({ status: 2 })
        })
      })
  }
  else {
    verifier(token, (valid) => {
      if (!valid) return res.status(200).json({ status: 1 })
      user
        .findByPk(id)
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          bcrypt.compare(ppassword, model.password, function(error, isMatch) {
            if (error) return res.status(500).json({ status: 2 })
            if (!isMatch) {
              console.log('Incorrect password')
              res.status(400).send('Incorrect password')
              return
            }
            console.log('correct password')
            bcrypt.hash(npassword, saltRounds, (err, hash) => {
    
              if(err) {
                return res.status(500).json({
                  type: 'error',
                  message: 'Bcrypt failed'
                });
              }
              if (!email && !name){
                user
                  .update({password: hash}, {where: {id}})
                  .then(([affected_row, _]) => {
                    if (affected_row <= 0) return res.status(500).json({ status: 1 })
                    res.status(200).json({ status: 0 })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ status: 2 })
                  })
              }
              else if (!email){
                user
                  .update({name, password: hash}, {where: {id}})
                  .then(([affected_row, _]) => {
                    if (affected_row <= 0) return res.status(500).json({ status: 1 })
                    res.status(200).json({ status: 0 })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ status: 2 })
                  })
              }
              else if (!name){
                user
                  .update({email, password: hash}, {where: {id}})
                  .then(([affected_row, _]) => {
                    if (affected_row <= 0) return res.status(500).json({ status: 1 })
                    res.status(200).json({ status: 0 })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ status: 2 })
                  })
              }
              else 
                user
                  .update(
                    { email, name, password: hash },
                    { where: { id } }
                  )
                  .then(([affected_row, _]) => {
                    if (affected_row <= 0) return res.status(500).json({ status: 1 })
                    res.status(200).json({ status: 0 })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ status: 2 })
                  })
            });
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
    })
  }
}

