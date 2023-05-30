const mongoose = require('../db/index');
const bcrypt = require('bcrypt');

let schema_1 = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: '',
    },
    account: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      set(v) {
        // 为密码加密加盐
        const salt = bcrypt.genSaltSync(10);
        const psw = bcrypt.hashSync(v, salt);
        return psw;
      },
    },
    user_pic: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'createtime', // 创建时间
      updatedAt: 'updattime', // 升级时间
    },
  }
);

// 构造模型, 模型是构造mongodb文档的一个类
let userData = mongoose.model('user', schema_1);

module.exports = userData;
