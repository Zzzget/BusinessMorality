// 操作成功的回调
class Resolve {
  success(data, message, status = 0) {
    return {
      status,
      message,
      data,
    };
  }
  Json(message, status = 0) {
    return {
      status,
      message,
    };
  }
}

const res = new Resolve();
module.exports = res;
