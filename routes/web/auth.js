var express = require('express')
var router = express.Router()

const UserModel = require('../../models/UserModel')
const md5 = require('md5')

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', async (req, res) => {
  await UserModel
    .create({ ...req.body, password: md5(req.body.password) })
    .then((data) => {
      res.render('tip/success', { msg: '注册成功', url: '/login' })
    })
    .catch((err) => {
      res.render('tip/error')
    })
})

module.exports = router;
