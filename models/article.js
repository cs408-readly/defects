var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    upvote:     { type: Number, default: 0 },
    downvote:   { type: Number, default: 0 },
    title:      String,
    description:String,
    url:        String,
    source:     String
});
module.exports = mongoose.model('Article', articleSchema);
