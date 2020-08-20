/**
 * Ping for get request
 */

export default (req, res) => {
  res.status(200).send('get: pong!')
}
