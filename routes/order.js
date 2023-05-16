const router = require('koa-router')();
const orderController = require('../router_controller/order');
const bouncer = require('koa-bouncer');
router.prefix('/order');

router.post('/addOrder', orderController.addOrder);

module.exports = router;
