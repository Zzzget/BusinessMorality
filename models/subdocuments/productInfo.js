const mongoose = require('../../db/index');

const productInfoSchema = mongoose.Schema({
  name: {
    // 商品名称
    type: String,
    require: true,
  },
  price: {
    // 商品单价
    type: Number,
    require: true,
  },
  spec: {
    // 商品规格
    type: Array,
    require: true,
    default: [],
  },
  num: {
    // 商品数量
    type: Number,
    require: true,
    default: 1,
  },
  picture: {
    // 商品图片
    type: String,
    require: true,
  },
});

module.exports = productInfoSchema;
