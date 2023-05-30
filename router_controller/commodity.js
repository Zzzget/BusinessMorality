const commodityData = require('../models/commodity');
const res = require('../method/resolve');
const commodityValidator = require('../validators/commodity');

module.exports = class CommController {
  // 添加商品
  static async addComm(ctx, next) {
    // 1.校验数据
    console.log(ctx.request.body);
    commodityValidator(ctx);
    // 2.查看名称是否重复
    const goodsData = ctx.request.body;
    console.log(goodsData.name);
    const repeat = await commodityData.findOne({ name: goodsData.name });
    console.log(repeat);
    if (repeat) {
      throw new global.errors.Existing('已有相同商品');
    }
    // 3.加入数据库
    try {
      await commodityData.create([{ ...goodsData }]);
      ctx.body = res.Json('添加商品成功');
    } catch (err) {
      ctx.cc(err);
    }
  }
  // 获取商品
  static async findComm(ctx, next) {
    try {
      const commData = await commodityData.find({ is_valid: true });
      ctx.body = res.success(commData, '获取商品数据成功');
    } catch (err) {
      throw new global.errors.NotFound('获取商品数据失败');
    }
  }
  // 修改商品
  static async modifyComm(ctx, next) {
    try {
      const { id, commData } = ctx.request.body;
      await commodityData.findOneAndRemove(id, commData);
      ctx.body = res.success('修改商品成功');
    } catch (err) {
      throw new global.errors.ParameterException('修改商品失败');
    }
  }
  // 删除商品
  static async DeleteComm(ctx, next) {
    try {
      const { id } = ctx.request.body;
      await commodityData.findByIdAndDelete(id);
      ctx.body = res.Json('删除商品成功');
    } catch (err) {
      throw new global.errors.ParameterException('删除商品失败', err);
    }
  }
};
