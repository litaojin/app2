/**
 * Created by TAODELL on 2014/11/6.
 */

/**
 * Created by TAODELL on 2014/10/27.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

/* GET users listing. */
router.get('/:id', function(req, res) {
    db('eWash.users').find({login: req.params.id}, {}, {}, function(reply){
        res.json(reply.documents[0]);
        console.log('APIv1/GET user [' + req.params.id + ']');
    });
});

router.post('/:id', function(req, res) {
    console.log('APIv1/UPDATE user [' + req.params.id + ']');
    db('eWash.users').update({name: req.params.id},
        {$set:{
            mobile  :req.body.mobile,
            name :req.body.name,
            addr    :req.body.addr,
            addrs   :req.body.addrs}},
        {upsert: false, multi: false});
    res.json(true);
});

router.post('/', function(req, res) {
    console.log('APIv1/CREATE user [' + req.params.id + ']');

    db('eWash.users').save( {
        login: req.body.login,
        password: req.body.password});
    res.json(true);
});

module.exports = router;


