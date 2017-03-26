var User = require('../models/user.js');
var Article = require('../models/article.js');
var isLoggedIn = require('./isLoggedIn.js');

var path = require('path');
module.exports = function(app) {

    app.get('/favorites', isLoggedIn, function(req, res, callback){
        User.findOne({_id: req.user._id}, function(err, user) {
            var fav_articles = user.local.savedArticles;
            var expanded_articles = [];

            var count = 0;
            fav_articles.forEach(function(fav_article) {

                console.log(fav_article);
                Article.findOne({_id: fav_article}, function(err, ar) {

                    count++;

                    if (ar){
                        console.log(ar);
                        expanded_articles.push(ar);
                    }
                    else {
                        console.log('empty');
                    }

                    if (count == fav_articles.length) {
                        res.send({articles: expanded_articles}).status(200);
                    }
                })
            });
        });
    });

    app.post('/favorites', function(req, res) {

        User.findOne({ _id: req.user._id }, function(err, user) {
            Article.findOne({ _id: req.body.article_id }, function(err, article) {
                var x = user.local.savedArticles.indexOf(article._id);
                console.log(x);
                console.log(article.title);
                if (x == -1) {
                    user.local.savedArticles.push(article) ;
                    user.save();
                }
            });
        });
    });
};
