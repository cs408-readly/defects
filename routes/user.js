module.exports = function(app) {

    app.get('/user', function(req, res) {

        res.send(req.user).status(200);
    });
};
