var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User            = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name']
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'facebook.id ' : profile.id}, function(err, user) {
                if(err)
                    return done(err);
                if(user) //user already authenticated return that user.
                    return done(null, user);
                else {
                    //no user found create new user
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    //save new user
                    newUser.save(function(err) {
                        if(err)
                            throw err;
                        //succesfully save user
                        return done(null, newUser);
                    });
                }

            });
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser = new User();
                
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.email    = req.body.email;

                newUser.local.password = newUser.generateHash(req.body.password);
                //newUser.local.savedArticles = null;
                newUser.local.sources = {
                    abc_news_au         : 0,
                    ars_technica        : 0,
                    associated_press    : 0,
                    bbc_news            : 0,
                    bbc_sport           : 0,
                    bild                : 0,
                    bloomberg           : 0,
                    business_insider    : 0,
                    business_insider_uk : 0,
                    buzzfeed            : 0,
                    cnbc                : 0,
                    cnn                 : 0,
                    daily_mail          : 0,
                    engadget            : 0,
                    entertainment_weekly: 0,
                    espn                : 0,
                    espn_cric_info      : 0,
                    financial_times     : 0,
                    focus               : 0,
                    football_italia     : 0,
                    fortune             : 0,
                    four_four_two       : 0,
                    fox_sports          : 0,
                    ign                 : 0,
                    independent         : 0,
                    mashable            : 0,
                    metro               : 0,
                    mirror              : 0,
                    mtv_news            : 0,
                    mtv_news_uk         : 0,
                    national_geographic : 0,
                    new_scientist       : 0,
                    newsweek            : 0,
                    new_york_magazine   : 0,
                    nfl_news            : 0,
                    polygon             : 0,
                    recode              : 0,
                    reddit_r_all        : 0,
                    reuters             : 0,
                    sky_news            : 0,
                    sky_sports_news     : 0,
                    spiegel_online      : 0,
                    t3n                 : 0,
                    talksport           : 0,
                    techcrunch          : 0,
                    techradar           : 0,
                    the_economist       : 0,
                    the_guardian_au     : 0,
                    the_guardian_uk     : 0,
                    the_hindu           : 0,
                    the_huffington_post : 0,
                    the_lad_bible       : 0,
                    the_new_york_times  : 0,
                    the_telegraph       : 0,
                    the_times_of_india  : 0,
                    the_verge           : 0,
                    the_wall_street_journal: 0,
                    the_washington_post : 0,
                    time                : 0,
                    usa_today           : 0,
                    wired_de            : 0
                };
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oh Snap! Wrong password.'));

            return done(null, user);
        });

    }));
}
