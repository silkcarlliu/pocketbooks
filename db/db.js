/**
 *
 *
 * @param {*} success 成功连接数据库执行的调用的方法
 * @param {*} error 无法连接数据库执行的调用的方法
 */
module.exports = function (success, error) {
  if (typeof error !== 'function') {
    error = () => {
      console.log('连接失败')
    }
  }
  //1. 安装 mongoose
  //2. 导入 mongoose
  const mongoose = require('mongoose');

  const { DBHOST, DBPORT, DBNAME } = require('../config/config')

  //设置 strictQuery 为 true
  mongoose.set('strictQuery', true);

  //3. 连接 mongodb 服务                        数据库的名称
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  //4. 设置回调
  // 设置连接成功的回调  once 一次   事件回调函数只执行一次
  mongoose.connection.once('open', () => {
    success()
  });

  // 设置连接错误的回调
  mongoose.connection.on('error', () => {
    error()
  });

  //设置连接关闭的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  });


}