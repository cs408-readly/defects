var User = require('../models/user.js');

var path = require('path');
module.exports = function(app) {

    app.post('/settings', function(req, res) {

        var _user = req.body.user;
        //console.log(_user);
        if(!authenticate(_user)) {
            //console.log("sending false");
            
        }
        else {
            User.findOne({ _id: req.user._id }, function(err, user) {
                //console.log(user._id);
               
                user.local.firstName = _user.firstName;
                user.local.lastName  = _user.lastName;
                user.local.email = _user.email;
                user.local.password = user.generateHash(_user.password);
                user.save();
                

            });
        }
    });
};

function authenticate(_user) {

    if((_user.firstName === "")||(_user.lastName === "")||(_user.email === "")||(_user.password === "")) {
        return true;

    }

    else {
        return true;
    }

}