<news-article>

<div id="article">
    <div id="post">

        <h5 onclick={goToNews}><b>{opts.message}</b></h5>
        <p onclick={goToNews}>{opts.content}</p>
        <button id="upvote" type="button" onclick={upvote}>{opts.upvotes}</button>
        <button id="downvote" type="button" onclick={downvote}>{opts.downvotes}</button>
        <button id="comment" type="button" onclick={comment}>Comment</button>
        <button id="favorite" type="button" value={this.opts.id} onclick={favorite}>Favorite</button>
        <!-- <input type="checkbox" onclick={save}>Save</input> */ -->
        <button id="share" type="button"onClick={share}>Share</button>
    </div>
    </div>
</div>
    <script>

    share() {
        FB.ui({
          method: 'share',
          href: 'google.com',
        }, function(response){});
    }

    goToNews() {
        window.open(this.opts.link);
    }

    function CommentStore() {
        riot.observable(this) // Riot provides our event emitter.
    }
    riot.commentStore = new CommentStore();

    comment() {

        console.log('Commented on  article with id:' + this.opts.id);
        var str = '/comment.html#' + this.opts.id;
        window.open(str);
    }


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
                /* downvoteFunc(); */
            }
        } else {
            article.upvotes -= 1;
        }
    }

    upvote() {
        return upvoteFunc();
    }

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
                /* upvoteFunc(); */
            }
        } else {
            article.downvotes -= 1;
        }
    }

    var downvoteStatus = false;

    downvote() {
        return downvoteFunc();
    }

    favorite() {
        window.open('/favorites.html');
        var req = new XMLHttpRequest();
        req.open('POST', '/favorites', true);
        req.setRequestHeader("Content-Type", "application/json");
        var send_data = { article_id: this.opts.id };
        console.log(send_data);
        req.send(JSON.stringify(send_data));
        console.log('Saved article with id:' + this.opts.id);
    }

    save(){
        console.log('article link to be saved for later: ' + this.opts.link);
    }

    </script>

    <style type="text/css">

        a {
            background: #4CAF50;
            border: none;
            color: white;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }

        a.down {
            background: white;
            border: none;
            color: #4CAF50;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }

        h5,p {
            text-align: left;
        }

        h5:hover {
            text-decoration: underline;
        }

        #post {
            text-align: center;
            font-size: 15px;
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 2px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e7ed;
        }

        #post:hover {
            background-color: #f0f7fb;
        }

        #upvote {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }

        #upvoted {
            background-color: white;
            border: none;
            color: #4CAF50;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }

        #downvote {
            background-color: #f44336;
            border: none;
            color: white;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;

        }

        #downvoted {
            background-color: white;
            border: none;
            color: #f44336;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;

        }

        #comment {
            background-color: #e7e7e7;
            color: black;
            border: none;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }
        #favorite {
            background-color: #e7e7e7;
            color: black;
            border: none;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font: 16px;
            border-radius: 10px;
        }

    </style>
</news-article>
