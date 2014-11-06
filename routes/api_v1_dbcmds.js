/**
 * Created by TAODELL on 2014/11/6.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;


router.get('/cleanuser', function(req, res){
    db('eWash.$cmd').find({drop:'users'}, 1)
    res.send('Remove all users');
});

router.get('/cleanorder', function(req, res){
    db('eWash.$cmd').find({drop:'orders'}, 1)
    res.send('Remove all orders');
});

module.exports = router;

