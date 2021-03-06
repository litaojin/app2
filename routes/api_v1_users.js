/**
 * Created by TAODELL on 2014/11/6.
 */

/**
 * Created by TAODELL on 2014/10/27.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;
var moment = require('moment');

/* GET users listing. */
router.get('/:id', function(req, res) {
    db('eWash.users').find({login: req.params.id}, {}, {}, function(reply){
        res.json(reply.documents[0]);
        console.log('APIv1/GET user [' + req.params.id + ']');
    });
});

router.post('/:id', function(req, res) {

    db('eWash.users').find({login: req.params.id}, {}, {}, function(reply){

        if( reply.documents.length == 0 ){
            console.log('APIv1/CREATE user [' + req.params.id + ']');
            db('eWash.users').save( {
                login: req.body.login,
                password: req.body.password,
                signupTimeStamp:moment().toDate()});
            res.json(true);
        }else{
            console.log('APIv1/UPDATE user [' + req.params.id + ']');
            db('eWash.users').update({login: req.params.id},
                {$set:{
                    name :req.body.name,
                    mobile  :req.body.mobile,
                    addr    :req.body.addr,
                    addrs   :req.body.addrs}},
                {upsert: false, multi: false});
            res.json(true);
        }
    });
});

router.post('/', function(req, res) {
    console.log('2. APIv1/CREATE user [' + req.body.login + ']');

    db('eWash.users').save( {
        login: req.body.login,
        password: req.body.password,
        signupTimeStamp:moment().toDate()});
    res.json(true);
});

module.exports = router;


