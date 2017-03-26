var mongoose = require('mongoose');
var articleSchema = mongoose.schema ({
	Upvote: 	Number,
	Downvote: 	Number,
	Save: 		Boolean,
	Favorite: 	Boolean
});

module.exports = mongoose.model('Articles', articleSchema);
