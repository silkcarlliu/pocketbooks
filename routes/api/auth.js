const express = require('express')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

const UserModel = require('../../models/UserModel')
const { secret } = require('../../config/config')

const router = express.Router()


router.post('/login', async (req, res) => {
  const { username, password } = req.body

  await UserModel
    .findOne({ username, password: md5(password) })
    .then((data) => {
      if (data) {
        const { username, _id } = data
        req.session.username = username
        req.session._id = _id
        // res.render('tip/success', { msg: '登录成功', url: '/account' })
        res.json({
          code: '0000',
          msg: '登录成功',
          data: {
            username,
            id: _id,
            token: jwt.sign({ username, id: _id }, secret, { expiresIn: 60 * 60 * 24 * 7 })
          },
        })
      } else {
        res.json({
          code: '2001',
          msg: '账户或密码错误',
          data: null,
        })
      }
    })
    .catch((err) => {
      res.json({
        code: '5000',
        msg: '服务器错误',
        data: err,
      })
    })
})

router.post('/logout', async (req, res) => {
  req.session.destroy(() => {
    // res.render('tip/success', { msg: '退出成功', url: '/login' })
    res.json({
      code: '0000',
      msg: '退出成功',
      data: null,
    })
  })
})

module.exports = router;
