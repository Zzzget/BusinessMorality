const bouncer = require('koa-bouncer');
function commodityValidators(ctx) {
  ctx
    .validateBody('name')
    .required('用户名不能为空')
    .isString() //确保输入的字段串或可以转成字符串
    .trim();
  ctx.validateBody('price').require('商品价格不能为空').isNumber();
  ctx.validateBody('picture').isString().trim();
  ctx.validateBody('rewMaterial').require('商品原料不能为空').isArray();
  ctx.validateBody('comment').isString().trim();
  ctx.validateBody('spec').isArray();
}

module.exports = commodityValidators;
