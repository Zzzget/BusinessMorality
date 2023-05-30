const router = require('koa-router')();
const orderController = require('../router_controller/order');
const bouncer = require('koa-bouncer');
router.prefix('/order');

router.post('/addOrder', orderController.addOrder);
router.get('/getOrder', orderController.getOrder);
router.post('/deleteOrder', orderController.DeleteOrder);

module.exports = router;
