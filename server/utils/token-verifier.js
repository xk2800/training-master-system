import { secret } from '../config.js'
import jwt from 'jsonwebtoken'

export default (token, callback) => {
  if (!token) {
    callback(false)
    return;
  }
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      callback(false)
      return;
    }
    callback(result ? true : false)
  })
}