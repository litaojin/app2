/**
 * Created by TAODELL on 2014/10/27.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

/* GET users listing. */
router.get('/:id', function(req, res) {
    db('mydb.user').find({name: req.params.id}, {}, {}, function(reply){
        res.json(reply.documents[0]);
        console.log('API/GET user [' + req.params.id + ']');
    });
});

router.post('/:id', function(req, res) {
    console.log('API/UPDATE user [' + req.params.id + ']');
    db('mydb.user').update({name: req.params.id},
        {$set:{
            mobile  :req.body.mobile,
            contact :req.body.contact,
            addr    :req.body.addr,
            addrs   :req.body.addrs}},
        {upsert: false, multi: false});
    res.json(true);
});

module.exports = router;

