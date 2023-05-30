const mongoose = require('../db/index');

const schema = mongoose.Schema(
  {
    name: {
      // 商品名称
      type: String,
      require: true,
    },
    price: {
      // 商品价格
      type: Number,
      require: true,
    },
    picture: {
      // 商品图片
      type: Array,
      require: true,
    },
    is_valid: {
      // 商品是否有效
      type: Boolean,
      require: true,
      default: true,
    },
    rawMaterial: {
      // 商品原料
      type: Array,
      require: true,
      default: [],
    },
    comment: {
      // 商品评语
      type: String,
      require: true,
    },
    spec: {
      // 商品规格
      type: Array,
      require: true,
      default: [],
    },
    sales: {
      // 商品销量
      type: Number,
      require: true,
      default: 0,
    },
    classification: {
      // 商品销量
      type: String,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createtime', // 创建时间
      updatedAt: 'updattime', // 升级时间
    },
  }
);

const commodityData = mongoose.model('commodity', schema);
module.exports = commodityData;
