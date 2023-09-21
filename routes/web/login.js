var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')

const UserModel = require('../../models/UserModel')
const md5 = require('md5')

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  await UserModel
    .findOne({ username, password: md5(password) })
    .then((data) => {
      if (data) {
        const { username, _id } = data
        req.session.username = username
        req.session._id = _id
        res.render('tip/success', { msg: '登录成功', url: '/account' })
      } else {
        res.send('账号或密码错误')
      }
    })
    .catch((err) => {
      res.render('tip/error')
    })
})

router.post('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.render('tip/success', { msg: '退出成功', url: '/login' })
  })
})

module.exports = router;
