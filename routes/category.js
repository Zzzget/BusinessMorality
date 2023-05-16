const router = require('koa-router')();
const CateController = require('../router_controller/category');
const bouncer = require('koa-bouncer');
router.prefix('/category');

router.post('/updatecate', CateController.cateUpdate);
router.get('/getCategory', CateController.getCategory);
router.put('/modifyCate', CateController.modifyCate);

module.exports = router;
