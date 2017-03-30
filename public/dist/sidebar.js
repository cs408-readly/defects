riot.tag2('sidebar', '<p id="title"></b>News Sources</b><p> <ul id="news-list"> </ul>', 'sidebar { margin-top:20px; margin-left:200px; float:left; } sidebar #title,[data-is="sidebar"] #title{ border-bottom: 1px solid #e0e7ed; } sidebar #news-list,[data-is="sidebar"] #news-list{ margin: 0; overflow: hidden; } sidebar #news-list li,[data-is="sidebar"] #news-list li{ text-align: left; padding: 2px; margin-bottom: 4px; color: #666; } sidebar #news-list li:hover,[data-is="sidebar"] #news-list li:hover{ color: #5575a8; }', '', function(opts) {
    var x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if (x.readyState == 4 && x.status == 200) {
            console.log(x.responseText);
            renderRecommendations(JSON.parse(x.responseText));
        }
    }
    x.open( "POST", '/recommend', true );
    x.send();

    var self = this;
    var updateArticles = function(source) {
        self.opts.observable.trigger('source-select', source);
    }

    var renderRecommendations = function(sources) {

        sources.forEach(function(source) {

            var list = document.getElementById('news-list');
            var li = document.createElement('li');

            (function(value){
                li.addEventListener("click", function() {
                    updateArticles(source);
                }, false);
            })(source);
            li.appendChild(document.createTextNode(source));
            list.append(li);

        });
    }

});
