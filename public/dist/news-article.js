riot.tag2('news-article', '<div id="article"> <div id="post"> <h5 onclick="{goToNews}"><b>{opts.message}</b></h5> <p onclick="{goToNews}">{opts.content}</p> <button id="upvote" type="button" onclick="{upvote}">{opts.upvotes}</button> <button id="downvote" type="button" onclick="{downvote}">{opts.downvotes}</button> <button id="comment" type="button" onclick="{comment}">Comment</button> <button id="favorite" type="button" riot-value="{this.opts.id}" onclick="{favorite}">Favorite</button> <button id="share" type="button" onclick="{share}">Share</button> </div> </div> </div>', 'news-article a,[data-is="news-article"] a{ background: #4CAF50; border: none; color: white; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article a.down,[data-is="news-article"] a.down{ background: white; border: none; color: #4CAF50; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article h5,[data-is="news-article"] h5,news-article p,[data-is="news-article"] p{ text-align: left; } news-article h5:hover,[data-is="news-article"] h5:hover{ text-decoration: underline; } news-article #post,[data-is="news-article"] #post{ text-align: center; font-size: 15px; padding-left: 30px; padding-right: 30px; padding-top: 2px; padding-bottom: 10px; border-bottom: 1px solid #e0e7ed; } news-article #post:hover,[data-is="news-article"] #post:hover{ background-color: #f0f7fb; } news-article #upvote,[data-is="news-article"] #upvote{ background-color: #4CAF50; border: none; color: white; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article #upvoted,[data-is="news-article"] #upvoted{ background-color: white; border: none; color: #4CAF50; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article #downvote,[data-is="news-article"] #downvote{ background-color: #f44336; border: none; color: white; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article #downvoted,[data-is="news-article"] #downvoted{ background-color: white; border: none; color: #f44336; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article #comment,[data-is="news-article"] #comment{ background-color: #e7e7e7; color: black; border: none; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; } news-article #favorite,[data-is="news-article"] #favorite{ background-color: #e7e7e7; color: black; border: none; padding: 8px 16px; text-align: center; text-decoration: none; display: inline-block; font: 16px; border-radius: 10px; }', '', function(opts) {

    this.share = function() {
        FB.ui({
          method: 'share',
          href: this.opts.link,
        }, function(response){});
    }.bind(this)

    this.goToNews = function() {
        window.open(this.opts.link);
    }.bind(this)

    function CommentStore() {
        riot.observable(this)
    }
    riot.commentStore = new CommentStore();

    this.comment = function() {

        console.log('Commented on  article with id:' + this.opts.id);
        var str = '/comment.html#' + this.opts.id;
        window.open(str);
    }.bind(this)

    var article = this.opts;

    var upvoteStatus = false;
    var upvoteFunc = function(e) {

        upvoteStatus = !upvoteStatus;

        var send_data = {
            article_id: article.id,
            source: article.source,
            upvoteStatus: upvoteStatus
        };

        var x = new XMLHttpRequest();
        x.open('POST', '/upvote', true);
        x.setRequestHeader("Content-Type", "application/json");
        x.send(JSON.stringify(send_data));

        if (upvoteStatus == true) {
            article.upvotes += 1;
            if (downvoteStatus == true) {

            }
        } else {
            article.upvotes -= 1;
        }
    }

    this.upvote = function() {
        return upvoteFunc();
    }.bind(this)

    var downvoteFunc = function(e) {
        downvoteStatus = !downvoteStatus;
        var send_data = {
            article_id: article.id,
            source: article.source,
            downvoteStatus: downvoteStatus
        };

        var x = new XMLHttpRequest();
        x.open('POST', '/downvote', true);
        x.setRequestHeader("Content-Type", "application/json");
        x.send(JSON.stringify(send_data));

        if (downvoteStatus == true) {
            article.downvotes += 1;
            if (upvoteStatus == true) {

            }
        } else {
            article.downvotes -= 1;
        }
    }

    var downvoteStatus = false;

    this.downvote = function() {
        return downvoteFunc();
    }.bind(this)

    this.favorite = function() {
        window.open('/favorites.html');
        var req = new XMLHttpRequest();
        req.open('POST', '/favorites', true);
        req.setRequestHeader("Content-Type", "application/json");
        var send_data = { article_id: this.opts.id };
        console.log(send_data);
        req.send(JSON.stringify(send_data));
        console.log('Saved article with id:' + this.opts.id);
    }.bind(this)

    this.save = function(){
        console.log('article link to be saved for later: ' + this.opts.link);
    }.bind(this)

});
