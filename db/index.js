const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);
const db = mongoose.connection;
db.once('open', () => {
  console.log('链接成功');
});
db.once('error', () => {
  console.log('链接失败');
});

module.exports = mongoose;
