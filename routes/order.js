/**
 * Created by TAODELL on 2014/10/8.
 */
var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

router.get('/mobile/:id([0-9]+)', function(req, res) {
    db('mydb.order').find({mobile: req.params.id}, {}, {sort: {order_id: 1}}, function (reply) {
        console.log('/' + req.params.id);
        res.render('orderlist.ejs', {
            orders: reply.documents
        });
    });
});
router.get('/id/:id([0-9]+)', function(req, res) {
    db('mydb.order').find({order_id: req.params.id}, {}, function (reply) {
        console.log('GET /id/' + req.params.id);
        res.render('orderinfo.ejs', {
            mobile: reply.documents[0].mobile,
            name: reply.documents[0].contact,
            pick_addr: reply.documents[0].pick_addr,
            drop_addr: reply.documents[0].drop_addr
        });
    });
});
router.post('/id/:id([0-9]+)', function(req, res) {
    db('mydb.order').update({order_id: req.params.id},
        {$set:{
            mobile:req.body.mobile,
            contact:req.body.contact,
            pick_addr:req.body.pick_addr,
            drop_addr:req.body.drop_addr}},
        {upsert: false, multi: false});

    console.log('UPDATE /id/' + req.params.id);
    res.redirect('/order/');
});

router.get('/state/:state(s[1-9])', function(req, res) {
    db('mydb.order').find({state: req.params.state}, {}, {sort: {order_id: 1}}, function (reply) {
        console.log('/' + req.params.id);
        res.render('orderlist.ejs', {
            orders: reply.documents
        });
    });
});
router.get('/', function(req, res){
    if(!req.session.loggedIn){
        res.redirect('/login');
    }
    db('mydb.order').find({name: req.session.name}, {}, {sort: {order_id: 1}}, function(reply){
        res.render('orderlist.ejs', {
            orders: reply.documents
        });
    });
});

module.exports = router;

