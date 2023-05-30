/*
 ** 错误处理类
 */

class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.errorMessage = msg;
  }
}

// 参数失败
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.errorMessage = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

// 认证失败
class AutnFailed extends HttpException {
  constructor(msg, errorCode) {
    super(msg.errorCode);
    this.code = 401;
    this.errorMessage = msg || '授权失败';
    this.errorCode = errorCode || 10004;
  }
}

// 禁止访问
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.errorMessage = msg || '禁止访问';
    this.errorCode = errorCode || 10005;
  }
}

// 已存在
class Existing extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 412;
    this.errorMessage = msg || '已存在';
    this.errorCode = errorCode || 10006;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  AutnFailed,
  NotFound,
  Existing,
};
