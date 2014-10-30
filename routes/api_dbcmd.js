/**
 * Created by TAODELL on 2014/10/27.
 */

/**
 * Created by TAODELL on 2014/10/13.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;


router.get('/cleanuser', function(req, res){
    db('mydb.$cmd').find({drop:'user'}, 1)
    res.send('Remove all users');
});

router.get('/cleanorder', function(req, res){
    db('mydb.$cmd').find({drop:'order'}, 1)
    res.send('Remove all orders');
});

module.exports = router;
