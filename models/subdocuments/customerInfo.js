const mongoose = require('../../db/index');

const customerInfoSchema = mongoose.Schema({
  name: {
    // 顾客名称
    type: String,
    require: true,
  },
  phoneNumber: {
    // 客户手机号
    type: String,
    require: true,
  },
  address: {
    // 客户地址
    type: String,
    require: true,
  },
});

module.exports = customerInfoSchema;
