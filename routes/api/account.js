const express = require('express')
const moment = require('moment')

const AccountModel = require('../../models/AccountModel')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

const router = express.Router()
//记账本列表
router.get('/account', checkTokenMiddleware, async function (req, res, next) {
  await AccountModel
    .find()
    .sort({ time: -1 })
    .then((data) => {
      res.json({
        code: '0000',
        msg: '读取成功',
        data
      })
    })
    .catch((err) => {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: err
      })
    })
});

//添加记录
router.post('/account', checkTokenMiddleware, async (req, res) => {
  await AccountModel
    .create({
      ...req.body,
      type: Number(req.body.type),
      account: Number(req.body.account),
      time: moment(req.body.time).toDate(),
    })
    .then((data) => {
      res.json({
        code: '0000',
        msg: '创建成功',
        data
      })
    })
    .catch((err) => {
      res.json({
        code: '1002',
        msg: '创建失败',
        data: err
      })
    })
})

//删除指定账单记录
router.delete('/account/:id', checkTokenMiddleware, async (req, res) => {
  await AccountModel
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json({
        code: '0000',
        msg: '删除成功',
        data,
      })
    })
    .catch((err) => {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: err
      })
    })
})

//获取指定账单记录
router.get('/account/:id', checkTokenMiddleware, async (req, res) => {
  const { id } = req.params
  await AccountModel
    .findById(id)
    .then((data) => {
      res.json({
        code: '0000',
        msg: '获取成功',
        data
      })
    })
    .catch((err) => {
      res.json({
        code: '1005',
        msg: '获取失败',
        data: err
      })
    })
})

//更新指定账单记录
router.patch('/account/:id', checkTokenMiddleware, async (req, res) => {
  const { id } = req.params
  await AccountModel
    .updateOne({ _id: id }, req.body)
    .then(async (data) => {
      await AccountModel
        .findById(id)
        .then((newData) => {
          res.json({
            code: '0000',
            msg: '更新成功',
            data: newData
          })
        })
        .catch((err) => {
          res.json({
            code: '1006',
            msg: '更新失败',
            data: err
          })
        })
    })
    .catch((err) => {
      res.json({
        code: '1006',
        msg: '更新失败',
        data: err
      })
    })
})

module.exports = router;
