const userCategory = require('../models/category');
const res = require('../method/resolve');
const cateUpdateValidator = require('../validators/category');

class CateController {
  // 添加商品分类
  static async cateUpdate(ctx, next) {
    // 1.验证用户提交数据
    cateUpdateValidator(ctx);
    // 2.获取数据
    const { name } = ctx.request.body;
    // 3.判断是否已存在
    const data = await userCategory.findOne({ name });
    if (data) {
      throw new global.errors.Existing('已存在同名分类');
    } else {
      // 3.处理结果
      userCategory.create({ name });
      ctx.body = res.Json('添加分类成功');
    }
  }
  // 获取商品分类
  static async getCategory(ctx, next) {
    // 1.查找数据库返回有效分类
    const category = await userCategory.find({ is_valid: true });
    // 2.返回给客户端
    ctx.body = res.success(category, '获取分类数据成功');
  }
  // 更新商品分类
  static async modifyCate(ctx, next) {
    // 检验数据
    cateUpdateValidator(ctx);
    // 获取数据
    const { name, is_valid } = ctx.request.body;
    // 操作数据库
    const data = await userCategory.findOneAndUpdate({ name }, { is_valid });
    if (data) {
      ctx.body = res.Json(`${is_valid ? '恢复成功' : '删除成功'}`);
    }
  }
}

module.exports = CateController;
