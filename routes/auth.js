var User = require('../models/user');
var path = require('path');
module.exports = function(app, passport) {

    app.get('/', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname+'/../public/index.html'));
    });

    app.get('/login', function(req, res) {

        res.sendFile(path.join(__dirname+'/../public/login.html'));
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}



