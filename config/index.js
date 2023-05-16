/*
 ** 配置文件
 */
module.exports = {
  db: {
    // 数据库端口
    port: 27017,
    // 数据库地址
    host: '127.0.0.1',
    // 数据库名称
    dbName: 'db_1',
  },
  jwt: {
    // 加密解密Token的秘钥
    jwtSecretKey: 'one piece yyds ^_^ !!!',
    expiresIn: '10h',
  },
};
