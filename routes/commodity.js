const router = require('koa-router')();
const CommController = require('../router_controller/commodity');
const bouncer = require('koa-bouncer');
router.prefix('/comm');

router.post('/addComm', CommController.addComm);
router.get('/findComm', CommController.findComm);
router.post('/modifyComm', CommController.modifyComm);
router.post('/DeleteComm', CommController.DeleteComm);

module.exports = router;
