/**
 * Created by Dell Tao on 2014/11/8.
 */

var express = require('express');
var router = express.Router();
var db = require('mongous').Mongous;

var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is Taos secret secret';

router.post('/', function (req, res) {
    // TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    console.log('User / Password');
    db('eWash.users').find({login: req.body.login}, {}, {}, function(reply){

        if(reply.documents.length == 0){
            res.status(401).send('No user');
            return;
        }
        if(!(reply.documents[0].password ===  req.body.password)){
            res.status(401).send('Wrong password');
            return;
        }
        var profile = {
            login: reply.documents[0].login,
            mobile: reply.documents[0].mobile
        };
        // We are sending the profile inside the token
        var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
        res.json({ token: token });
    });
});

module.exports = router;