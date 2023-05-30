// 错误处理中间件

const { HttpException } = require('../method/httpException');
const bouncer = require('koa-bouncer');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    if (error instanceof bouncer.ValidationError) {
      ctx.body = {
        name: error.name,
        message: error.message,
      };
      return;
    }
    if (error.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error_code: error.status,
        errorMessage: '请先登录',
        msg: error.originalE ? error.originalError.message : error.message,
      };
      return;
    }
    if (error instanceof HttpException) {
      ctx.status = error.code;
      ctx.body = {
        error_code: error.status,
        errorMessage: error.errorMessage,
        msg: error.originalE ? error.originalError.message : error.message,
      };
    } else {
      // 未知错误
      ctx.response.status = 500;
      ctx.body = {
        msg: '未知错误',
        error_code: 9999,
      };
    }
  }
};

module.exports = catchError;
