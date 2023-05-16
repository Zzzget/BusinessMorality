const commodityData = require('../models/commodity');
const res = require('../method/resolve');
const commodityValidator = require('../validators/commodity');

module.exports = class CommController {
  // 添加商品
  static async addComm(ctx, next) {
    // 1.校验数据
    commodityValidator(ctx);
    // 2.查看名称是否重复
    const goodsData = ctx.request.body;
    const repeat = commodityData.findOne({ name: goodsData.name });
    if (repeat) {
      ctx.cc('已有相同商品');
      return;
    }
    // 3.加入数据库
    try {
      await commodityData.create([{ ...goodsData }]);
      res.Json('添加商品成功');
    } catch (err) {
      ctx.cc(err);
    }
  }
  // 获取商品
  static async findComm(ctx, next) {
    try {
      const commData = await commodityData.find({ is_valid: true });
      res.success(commData, '获取商品数据成功');
    } catch (err) {
      ctx.cc('获取商品数据失败');
    }
  }
  // 修改商品
  static async modifyComm(ctx, next) {
    try {
      const { id, commData } = ctx.request.body;
      await commodityData.findOneAndRemove(id, commData);
      res.success('修改商品成功');
    } catch (err) {
      ctx.cc('修改商品失败');
    }
  }
  // 删除商品
  static async DeleteComm(ctx, next) {
    try {
      const { id } = ctx.request.body;
      await commodityData.findByIdAndDelete(id);
      res.Json('删除商品成功');
    } catch (err) {
      ctx.cc('删除商品失败', err);
    }
  }
};
