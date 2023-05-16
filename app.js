const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const bouncer = require('koa-bouncer');
const jwt = require('koa-jwt');

const index = require('./routes/index');

// error handler
onerror(app);

// 中间件

// 跨域中间件
app.use(cors());

// 获取body中间件
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
// 表单校验中间件
app.use(bouncer.middleware());

app.use(async (ctx, next) => {
  console.log('asdfgakfhkj');
  ctx.cc = function (err, status = 1) {
    ctx.body = {
      // status为一表示失败
      status,
      // 状态描述
      message: err instanceof Error ? err.message : err,
    };
  };
  await next();
});

// 异常处理中间件;
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      console.log();
      ctx.cc(error.bouncer);
      return;
    }
    console.log(error);
  }
});

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

const config = require('./config');
app.use(jwt({ secret: config.jwt.jwtSecretKey }).unless({ path: [/^\/users/] }));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());

// 用户登录注册路由
const users = require('./routes/users');
app.use(users.routes(), users.allowedMethods());

// 商品分类路由
const category = require('./routes/category');
app.use(category.routes(), category.middleware());

// 商品路由
const comm = require('./routes/commodity');
app.use(comm.routes(), comm.middleware());

// 订单路由
const order = require('./routes/order');
app.use(order.routes(), order.middleware());

// 错误中间件
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  console.log('错误', err);
});

module.exports = app;
