/**
 * Created by TAODELL on 2014/11/6.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

router.get('/mobile/:id([0-9]+)', function(req, res) {
    db('eWash.orders').find({mobile: req.params.id}, {}, {sort: {order_id: 1}}, function (reply) {
        console.log('/' + req.params.id);
        res.json(reply.documents);
    });
});
router.get('/id/:id([0-9]+)', function(req, res) {
    db('eWash.orders').find({order_id: req.params.id}, {}, function (reply) {
        console.log('GET /id/' + req.params.id);
        res.json(reply.documents[0]);
    });
});
router.post('/id/:id([0-9]+)', function(req, res) {
    db('eWash.orders').update({order_id: req.params.id},
        {$set:{
            mobile:req.body.mobile,
            contact:req.body.contact,
            pick_addr:req.body.pick_addr,
            drop_addr:req.body.drop_addr}},
        {upsert: false, multi: false});

    console.log('UPDATE /id/' + req.params.id);
    res.json(true);
});

router.get('/state/:state(s[1-9])', function(req, res) {
    db('eWash.orders').find({state: req.params.state}, {}, {sort: {order_id: 1}}, function (reply) {
        console.log('/' + req.params.id);
        res.json( reply.documents);
    });
});
router.get('/', function(req, res){
   db('eWash.orders').find({name: req.session.name}, {}, {sort: {order_id: 1}}, function(reply){
        res.json( reply.documents);
    });
});
router.post('/', function(req, res) {
    var now = new Date();
    orderid = now.getTime().toString();

    db('eWash.orders').save( {
        order_id: orderid,
        login: req.body.login,
        mobile:req.body.mobile,
        name:req.body.name,
        state:'s1',
        pick_addr:req.body.pick_addr,
        drop_addr:req.body.drop_addr});
    res.json(true);
});

module.exports = router;


