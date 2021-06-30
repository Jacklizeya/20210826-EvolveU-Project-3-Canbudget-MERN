const express = require('express');
const passport = require('passport');
//const userDB = require('../models/user');

let router = express.Router();

router.post('/login',   
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user)
    }
);

router.get('/loggedInUser', (req, res) => {
    console.log('Returning logged in user as', req.user)
    res.json(req.user)
})

router.get('/logout', function(req, res){
    console.log('Logout ', req.user)
    req.logout();
    res.redirect('/');
    //res.sendStatus(200);
});
  
module.exports = router;
