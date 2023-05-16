const orderData = require('../models/order');
const res = require('../method/resolve');
// const commodityValidator = require('../validators/commodity');

module.exports = class orderController {
  static async addOrder(ctx, next) {
    // 获取客户端数据
    const { pro, cus, storeName } = ctx.request.body;
    // 添加订单
    try {
      // 计算订单总价
      let totalPrice = 0;
      pro.forEach(item => (totalPrice += item.price * item.num));
      await orderData.create({ childrenPro: [...pro], childernCus: [...cus], storeName, totalPrice });
      ctx.body = res.Json('创建订单成功');
    } catch (err) {
      res.cc(err);
    }
  }
};
