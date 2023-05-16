const bouncer = require('koa-bouncer');
function registerValidator(ctx) {
  // 用户名
  ctx
    .validateBody('name')
    .required('用户名不能为空')
    .isString() //确保输入的字段串或可以转成字符串
    .trim();
  // 账号
  ctx
    .validateBody('account')
    .required('账号不能为空')
    .isString() //确保输入的字段串或可以转成字符串
    .trim()
    .isLength(6, 11, '账号长度必须在6-11位之间');
  // 密码
  ctx
    .validateBody('password')
    .required('密码不能为空')
    .isString() //确保输入的字段串或可以转成字符串
    .isLength(6, 16, '账号长度必须在6-16位之间')
    .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6-16位之间，包含字符、数字和_');
  // 确认密码
  ctx.validateBody('password2').required('确认密码不能为空').eq(ctx.vals.password, '两次密码不一致');
}
module.exports = registerValidator;
