const router = require('koa-router')();
const UserController = require('../router_controller/users');
const bouncer = require('koa-bouncer');
router.prefix('/users');

router.post('/reguser', UserController.regUser);
router.post('/login', UserController.login);

module.exports = router;
