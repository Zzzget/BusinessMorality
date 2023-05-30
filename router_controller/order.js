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
      throw new global.errors.AutnFailed('创建订单失败', 401);
    }
  }
  static async getOrder(ctx, next) {
    try {
      console.log('asdfasf');
      const data = await orderData.find();
      ctx.body = res.success(data, '获取订单数据成功');
    } catch (err) {
      throw new global.errors.NotFound('获取订单数据失败');
    }
  }

  static async DeleteOrder(ctx, next) {
    try {
      const { _id } = ctx.request.body;
      console.log(ctx.request.body);
      await orderData.findByIdAndDelete(_id);
      ctx.body = res.Json('删除商品成功');
    } catch (err) {
      throw new global.errors.NotFound('删除商品失败');
    }
  }
};
