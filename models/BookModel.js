const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  is_hot: Boolean
});

//6. 创建模型对象  对文档操作的封装对象
const BookModel = mongoose.model('novel', BookSchema);

module.exports = BookModel