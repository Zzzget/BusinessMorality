const mongoose = require('../db/index');
const productInfoSchema = require('./subdocuments/productInfo');
const customerInfoSchema = require('./subdocuments/customerInfo');

const schema = mongoose.Schema(
  {
    childrenPro: [productInfoSchema],
    childernCus: [customerInfoSchema],
    storeName: {
      // 店铺名称
      type: String,
      require: true,
    },
    totalPrice: {
      // 订单总价
      type: Number,
      require: true,
    },
    number: {
      // 订单编号
      type: String,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createtime', // 创建时间
      updatedAt: 'updattime', // 升级时间
    },
  }
);

const OrderData = mongoose.model('order', schema);

module.exports = OrderData;
