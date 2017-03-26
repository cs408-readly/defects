var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var userSchema = new Schema({

    local            : {
        firstName    : String,
        lastName     : String,
        email        : String,
        password     : String,
        savedArticles: [{ "type": Schema.Types.ObjectId, "ref": "Article"}],
        sources      : {
            abc_news_au     : Number,
            ars_technica    : Number,
            associated_press: Number,
            bbc_news        : Number,
            bbc_sport       : Number,
            bild            : Number,
            bloomberg       : Number,
            business_insider: Number,
            business_insider_uk: Number,
            buzzfeed        : Number,
            cnbc            : Number,
            cnn             : Number,
            daily_mail      : Number,
            engadget        : Number,
            entertainment_weekly: Number,
            espn            : Number,
            espn_cric_info  : Number,
            financial_times : Number,
            focus           : Number,
            football_italia : Number,
            fortune         : Number,
            four_four_two   : Number,
            fox_sports      : Number,
            ign             : Number,
            independent     : Number,
            mashable        : Number,
            metro           : Number,
            mirror          : Number,
            mtv_news        : Number,
            mtv_news_uk     : Number,
            national_geographic: Number,
            new_scientist   : Number,
            newsweek        : Number,
            new_york_magazine: Number,
            nfl_news        : Number,
            polygon         : Number,
            recode          : Number,
            reddit_r_all    : Number,
            reuters         : Number,
            sky_news        : Number,
            sky_sports_news : Number,
            spiegel_online  : Number,
            t3n             : Number,
            talksport       : Number,
            techcrunch      : Number,
            techradar       : Number,
            the_economist   : Number,
            the_guardian_au : Number,
            the_guardian_uk : Number,
            the_hindu       : Number,
            the_huffington_post: Number,
            the_lad_bible   : Number,
            the_new_york_times: Number,
            the_telegraph   : Number,
            the_times_of_india: Number,
            the_verge       : Number,
            the_wall_street_journal: Number,
            the_washington_post: Number,
            time            : Number,
            usa_today       : Number,
            wired_de        : Number
        }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);
