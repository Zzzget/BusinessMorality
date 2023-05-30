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
      throw new global.errors.Existing('账号已被注册');
    } else {
      await userData.create({ account, password: password2 });
      ctx.body = res.Json('注册成功');
    }
  }

  // 登录
  static async login(ctx, next) {
    const { account, password } = ctx.request.body;
    console.log(ctx.request.body);
    const userdata = await userData.findOne({ account });
    if (!userdata) {
      throw new global.errors.AutnFailed('用户名不存在');
    }
    const ispaw = bcrypt.compareSync(password, userdata.password);

    if (ispaw) {
      // 对用户信息进行加密，生成Token
      const nwedata = { ...userdata, password: '', user_pic: '', name: '' };
      console.log('500');
      const token = jwt.sign(nwedata, config.jwt.jwtSecretKey, { expiresIn: config.jwt.expiresIn });
      console.log(userdata);
      const { name, user_pic } = userdata;
      ctx.body = res.success({ token, name, user_pic }, '登录成功');
    } else {
      throw new global.errors.AutnFailed('密码错误，登录失败', 401);
    }
  }
}

module.exports = UserController;
