/**
 * Created by TAODELL on 2014/10/20.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

router.get('/', function(req, res){
    if(!req.session.loggedIn){
        res.redirect('/login');
    }
    db('mydb.user').find({name: req.session.name}, {}, {}, function(reply){

        res.render('myaccount.ejs', {
            doc : reply.documents[0]
        });
    });
});

router.post('/', function(req, res){
    db('mydb.user').update({name: req.session.name},
        {$set:{
            mobile:req.body.mobile,
            contact:req.body.contact,
            addr:req.body.addr}},
        {upsert: false, multi: false});

    console.log('UPDATE account' + req.session.name);
    res.redirect('/myaccount');
});
module.exports = router;