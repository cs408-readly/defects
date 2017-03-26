var User = require('../models/user.js');
var Article = require('../models/article.js');
var isLoggedIn = require('./isLoggedIn.js');

module.exports = function(app) {

    app.post('/upvote', isLoggedIn, function(req, res) {

        var upvoteStatus = req.body.upvoteStatus;
        User.findOne({ _id: req.user._id }, function(err, user) {

            if (upvoteStatus == true) {
                user.local.sources[req.body.source] += 1;
            } else {
                user.local.sources[req.body.source] -= 1;
            }

            user.save();
        });

        Article.findOne({ _id: req.body.article_id }, function(err, article) {

            if (upvoteStatus == true) {
                article.upvote += 1;
            } else {
                article.upvote -= 1;
            }

            article.save();
        });

        res.status(200).send();
    });

    app.post('/downvote', isLoggedIn, function(req, res) {

        var downvoteStatus = req.body.downvoteStatus;
        User.findOne({ _id: req.user._id }, function(err, user) {

            if (downvoteStatus == true) {
                user.local.sources[req.body.source] += 1;
            } else {
                user.local.sources[req.body.source] -= 1;
            }

            user.save();
        });

        Article.findOne({ _id: req.body.article_id }, function(err, article) {

            if (downvoteStatus == true) {
                article.downvote += 1;
            } else {
                article.downvote -= 1;
            }

            article.save();
        });

        res.status(200).send();
    });
};
