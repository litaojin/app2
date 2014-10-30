/**
 * Created by TAODELL on 2014/10/11.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

/* New Order */

router.get('/', function(req, res){
    if(req.session.loggedIn){
        db('mydb.user').find({name: req.session.name}, {}, {}, function(reply){
            var doc = {
                mobile : reply.documents[0].mobile,
                contact : (typeof(reply.documents[0].contact) === 'undefined')?"":reply.documents[0].contact,
                pick_addr : (typeof(reply.documents[0].addr) === 'undefined')?"":reply.documents[0].addr,
                drop_addr : (typeof(reply.documents[0].addr) === 'undefined')?"":reply.documents[0].addr
                };
            res.render('neworder.ejs',  { doc:doc, title: '新订单' });
        });
    }else{
        res.redirect('/login');
    }
});
router.post('/', function(req, res) {
    var now = new Date();
    orderid = now.getTime().toString();

    db('mydb.order').save( {
            order_id: orderid,
            name: req.session.name,
            mobile:req.body.mobile,
            contact:req.body.contact,
            state:'s1',
            pick_addr:req.body.pick_addr,
            drop_addr:req.body.drop_addr});

    res.redirect('/order');
});

module.exports = router;
