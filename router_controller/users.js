// const mongoose = require('mongoose');
const userData = require('../models/users');
const bcrypt = require('bcrypt');
const registerValidator = require('../validators/users');
const jwt = require('jsonwebtoken');
const config = require('../config');
const res = require('../method/resolve');

class UserController {
  // 注册
  static async regUser(ctx, next) {
    // 1.数据校验
    registerValidator(ctx);
    /* try {
      registerValidator(ctx);
    } catch (err) {
      return;
    } */

    // 2.拿到用户信息
    // console.log(ctx.request.body);
    const { account, password2 } = ctx.request.body;
    // 查询数据库
    const isData = await userData.findOne({ account });
    console.log(isData);
    if (isData) {
      ctx.cc('账号已被注册');
    } else {
      await userData.create({ account, password: password2 });
      ctx.body = res.Json('注册成功');
    }
  }

  // 登录
  static async login(ctx, next) {
    const { account, password } = ctx.request.body;
    const userdata = await userData.findOne({ account });
    if (!userdata) {
      ctx.cc('账号错误');
      return;
    }
    const ispaw = bcrypt.compareSync(password, userdata.password);
    console.log(ispaw);
    if (ispaw) {
      // 对用户信息进行加密，生成Token
      const nwedata = { ...userdata, password: '', user_pic: '' };
      console.log('500');
      const token = jwt.sign(nwedata, config.jwt.jwtSecretKey, { expiresIn: config.jwt.expiresIn });
      ctx.body = res.success({ token }, '登录成功');
    } else {
      ctx.cc('密码错误，登录失败', 401);
    }
  }
}

module.exports = UserController;
