const express = require('express')
const router = express.Router()

const moment = require('moment')

const AccountModel = require('../../models/AccountModel')
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

//添加首页路由规则
router.get('/', (req,res) => {
  res.redirect('/account')
})

//记账本列表
router.get('/account', checkLoginMiddleware, async function (req, res, next) {
  const accounts = await AccountModel.find().sort({ time: -1 })
  if (accounts?.length) {
    res.render('account/list', { accounts, moment })
  } else {
    res.render('account/list', { accounts: [], moment })
  }
});

//添加记录
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('account/create')
});

router.post('/account', checkLoginMiddleware, async (req, res) => {
  let code
  let result
  await AccountModel
    .create({
      ...req.body,
      type: Number(req.body.type),
      account: Number(req.body.account),
      time: moment(req.body.time).toDate(),
    })
    .then((data) => {
      code = 200
      result = data
    })
    .catch((err) => {
      code = 500
      result = err
    })

  switch (code) {
    case 200:
      res.render('tip/success', { msg: '添加成功', url: '/account' })
      break;

    case 500:
      res.status(code).send(result)
      break;

    default:
      res.send('未知错误')
      break;
  }
})

router.get('/account/:id', checkLoginMiddleware, async (req, res) => {
  let code
  let result
  await AccountModel
  .deleteOne({ _id: req.params.id })
  .then((data) => {
    code = 200
    result = data
  })
  .catch((err) => {
    code = 500
    result = err
  })

  switch (code) {
    case 200:
      res.render('account/success', { msg: '删除成功', url: '/account' })
      break;

    case 500:
      res.status(code).send(result)
      break;

    default:
      res.send('未知错误')
      break;
  }
})

module.exports = router;
