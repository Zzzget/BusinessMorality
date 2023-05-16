const mongoose = require('../db/index');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    is_valid: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createtime', // 创建时间
      updatedAt: 'updattime', // 升级时间
    },
  }
);

const categoryData = mongoose.model('category', schema);
module.exports = categoryData;
