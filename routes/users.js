var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
  res.send('Get a user list...'+ req.params.id);
});

module.exports = router;
