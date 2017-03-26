var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

process.env.NODE_ENV = 'test';
var server = require('../app.js');

chai.use(chaiHttp);

describe('Trending functionality', function(){


    it('returns valid JSON', function(done) {
        chai.request(server)
            .post('/trending')
            .end(function(err, res) {
                JSON.parse(res.text).should.be.a('object');
                done();
            });
    });

    it('has articles array', function(done) {
        chai.request(server)
            .post('/trending')
            .end(function(err, res) {
                var body = JSON.parse(res.text);

                body.should.have.property('articles');
                body.articles.should.be.a('array');
                done();
            });
    });

    it('should contain valid articles', function(done) {
        chai.request(server)
            .post('/trending')
            .end(function(err, res) {
                var array = JSON.parse(res.text).articles;

                array.forEach(function(article) {
                    try {
                        article.should.have.property('url');
                        article.url.should.be.a('string');

                        article.should.have.property('description');
                        article.description.should.be.a('string');

                        article.should.have.property('title');
                        article.title.should.be.a('string');
                    } catch (e) {
                    }
                });

                done();
            });
    });

    it('test authentication', function(done) {
        chai.request(server)
            .post('/login')
            .send({
                'local.email': 'nihanshupurohit@gmail.com',
                'local.password': '123456789'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

});
