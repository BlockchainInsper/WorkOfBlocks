var express = require('express');
var router = express.Router();
var blocks = require('../resources/blocks_db')

/* GET users listing. */
router.get('/', function (req, res, next) {
  blocks.getAllBlocks().then((resp) => res.send(resp)).catch((err) => console.log(err))
});


router.get('/mine', function (req, res, next) {
  res.render("pushPage")


});


router.post('/mine', function (req, res, next) {
  data = req.body.block;
  blocks.checkBlock(data).then((resp) => res.send(resp)).catch((err) => console.log(err))
});



router.get('/difficulty', function (req, res, next) {
  blocks.getDifficulty().then((resp) => res.send(resp)).catch((err) => console.log(err))
});


module.exports = router;
