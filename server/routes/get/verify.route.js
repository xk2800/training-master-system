/**
 * attempt to verify an access token (just for testing!)
 * request:
 *   - token: access token
 * response:
 *   - status: 0 = valid, 1 = invalid, 2 = error occurs
 */

import { secret } from '../../config.js'
import jwt from 'jsonwebtoken'

export default (res, req) => {
  const { token } = req.params;
    if (!token) {
      return res.status(200).json({ status: 1 })
    }
    jwt.verify(token, secret, (err, result) => {
      if (err)  return res.status(200).json({ status: 2 })
      return res.status(200).json({ status: result ? 0 : 1 });
    })
}