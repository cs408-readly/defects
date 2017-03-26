var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

process.env.NODE_ENV = 'test';
var server = require('../app.js');

chai.use(chaiHttp);

describe('signup functionality', function(){

    it('test authentication', function(done) {
            chai.request(server)
                .post('/signup')
                .send({
                    'local.email': 'nihanshupurohit@gmail.com',
                    'local.password': '123456789'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

    it('null email field authentication', function(done) {
            chai.request(server)
                .post('/signup')
                .send({
                    'local.email': '',
                    'local.password': '123456789'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

    it('null password field authentication', function(done) {
            chai.request(server)
                .post('/signup')
                .send({
                    'local.email': 'nihanshupurohit@gmail.com',
                    'local.password': ''
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

    it('password length authentication', function(done) {
            chai.request(server)
                .post('/signup')
                .send({
                    'local.email': 'nihanshupurohit@gmail.com',
                    'local.password': '1234567891011'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

});
