const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: Date,
  type: {
    type: Number,
    default: -1,
  },
  account: {
    type: Number,
    required: true,
  },
  remarks: String,
});

//6. 创建模型对象  对文档操作的封装对象
const AccountModel = mongoose.model('pocketbook', AccountSchema);

module.exports = AccountModel