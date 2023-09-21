const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

const checkTokenMiddleware = (req, res, next) => {
  const token = req.get('token')

  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token 缺失',
      data: null
    })
  }

  jwt.verify(token, secret, async (err, data) => {
    if (err || !data) {
      return res.json({
        code: '2004',
        msg: 'token mismatch',
        data: null
      })
    }

    req.user = data
    next()
  })
}

module.exports = checkTokenMiddleware
