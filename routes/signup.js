/**
 * Created by xiaohuzida on 2014/11/8.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;
var moment = require('moment');


router.post('/', function (req, res) {
    // TODO validate req.body.username and req.body.password

    db('eWash.users').find({login: req.body.login}, {}, {}, function(reply){

        if( reply.documents.length == 0 ){
            console.log('SIGNUP/CREATE user [' + req.body.login + ']');
            db('eWash.users').save( {
                login: req.body.login,
                password: req.body.password,
                signupTimeStamp:moment().toDate()});
            res.json(true);
        }else{
            console.log('SIGNUP/CREATE Failed user [' +  req.body.login + '] existed');
            res.status(400).send('User existed');
        }
    });
});

module.exports = router;