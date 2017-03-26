var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

process.env.NODE_ENV = 'test';
var server = require('../app.js');

chai.use(chaiHttp);
describe('Settings input', function(){
    
    it('null firstName field authentication', function(done) {
    	
		var newUser = {
            firstName: "",
            lastName: "lastName",
            email: "email@gmail.com",
            password: "passwordTest"
        	
        };
		chai.request(server)
                .post('/settings')
                .send({ user: newUser })
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    done();
                });
         
    });

    it('null lastName field authentication', function(done) {
    	
		var newUser = {
            firstName: "firstName",
            lastName: "",
            email: "email@gmail.com",
            password: "passwordTest"
        	
        };
		chai.request(server)
                .post('/settings')
                .send({ user: newUser })
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    done();
                });
         
    });

    it('null email field authentication', function(done) {
    	
		var newUser = {
            firstName: "firstName",
            lastName: "lastName",
            email: "",
            password: "passwordTest"
        	
        };
		chai.request(server)
                .post('/settings')
                .send({ user: newUser })
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    done();
                });
         
    });

    it('null password field authentication', function(done) {
    	
		var newUser = {
            firstName: "firstName",
            lastName: "lastName",
            email: "email@gmail.com",
            password: ""
        	
        };
		chai.request(server)
                .post('/settings')
                .send({ user: newUser })
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    done();
                });
         
    });



});


			