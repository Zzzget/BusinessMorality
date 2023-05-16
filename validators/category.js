const bouncer = require('koa-bouncer');
function cateUpdateValidator(ctx) {
  // 分类名称
  ctx
    .validateBody('name')
    .required('分类名称不能为空')
    .isString() //确保输入的字段串或可以转成字符串
    .trim();
}
module.exports = cateUpdateValidator;
