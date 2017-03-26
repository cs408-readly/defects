var request = require('request');
var Article = require('../models/article.js');

function randomize( myArray ) {

    var i = myArray.length;
    if ( i == 0 ) return false;

    while ( --i ) {

        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}

function saveArticles(my_articles, callback, res) {

    db_articles = [];

    var count = 0;
    var length = my_articles.length;

    my_articles.forEach(function(article) {

        Article.findOne({ 'title': article.title, 'source': article.source }).then(function(db_article) {

            count++;

            if (db_article) {
                db_articles.push(db_article)
            } else {
                new_article = new Article(article);
                new_article.save();
                db_articles.push(new_article);
            }

            if (count == length) {
                callback(res, db_articles);
            }
        });
    });
}

function sendArticles(res, db_articles) {
    res.send({articles: db_articles}).status(200);
}

module.exports = function(app, passport) {

    app.post('/trending', function(req, res) {

        var source = req.body.source;

        if (source) {

            source = source.replace(/_/g, "-");
            Article.find({source: source}, function(err, articles) {

                res.send({articles: articles});
            });
        } else {

            var newsSources = [ 'associated-press', 'bbc-news', 'bbc-sport',
                'daily-mail', 'engadget', 'entertainment-weekly', 'espn', 'financial-times',
                'mashable', 'national-geographic', 'new-scientist',
                'techcrunch', 'techradar', 'the-economist',
                'the-telegraph', 'the-verge', 'the-wall-street-journal', 'the-washington-post',
                'time', 'usa-today'];
            var my_articles = [];

            newsSources.forEach(function(newsSource) {

                var url = 'https://newsapi.org/v1/articles?source='+newsSource+'&sortBy=top&apiKey=e30f46dbdaa645558d009af5b0ede4ca';
                request.get(url, function(err, response, body) {

                    try {
                        JSON.parse(body).articles.forEach(function(article) {

                            article['source'] = newsSource;
                            my_articles.push(article);
                        });
                    } catch (e) {
                    }

                    if (newsSource === newsSources[newsSources.length - 1]) {

                        randomize(my_articles);
                        saveArticles(my_articles, sendArticles, res);
                    }
                });
            });
        }
    });
};
