const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//6. 创建模型对象  对文档操作的封装对象
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel