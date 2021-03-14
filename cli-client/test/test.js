var exec = require('child_process').exec;
var chai = require('chai');
var expect = chai.expect;

describe('cli tests', function() {

  // Healthcheck
  it(' healthcheck ', (done) => {
    exec('ev_group88 healthcheck', function(error, stdout, stderr) {
      var lines = stdout.split('\n')
      expect(lines[1]).equal('{"status":"OK"}')
      done();
    })
  })

  //  Admin login
  it(' Admin Login ', (done) => {
    exec('ev_group88 login --username admin --passw petrol4ever', function(error, stdout, stderr) {
      var lines = stdout.split('\n')
      var first = lines[1].split('{')
      var second = first[1].split(':')
      expect(second[0]).equal("\"token\"")
      done();
    })
  })

   //  Admin creates a user
  it(' Admin creates a new user ', (done) => {
    exec('ev_group88 Admin --usermod --username manos --passw goustarwtl', function(error, stdout, stderr) {
      var lines = stdout.split('\n')
      var temp = lines[1].slice(34,111);
      expect(temp).equal('"username":"manos","password":"goustarwtl","isAdmin":false,"isConnected":"no"')
      done();
    })
  })

     //  Admin checks user stats
     it(' Admin checks user stats ', (done) => {
      exec('ev_group88 Admin --users --username manos ', function(error, stdout, stderr) {
        var lines = stdout.split('\n')
        var temp = lines[1].slice(35,119);
        expect(temp).equal('username":"manos","password":"goustarwtl","isAdmin":false,"isConnected":"no","__v":0')
        done();
      })
    })

    //  resetsessions 
    it(' resetsessions ', (done) => {
    exec('ev_group88 resetsessions', function(error, stdout, stderr) {
      var lines = stdout.split('\n')
      expect(lines[1]).equal('{"status":"OK"}')
      done();
      })
    })
    
    
  //  Admin login again
  it(' Admin Login again', (done) => {
    exec('ev_group88 login --username admin --passw petrol4ever', function(error, stdout, stderr) {
      var lines = stdout.split('\n')
      var first = lines[1].split('{')
      var second = first[1].split(':')
      expect(second[0]).equal("\"token\"")
      done();
    })
  })
    
    //  Admin logout
    it(' Admin Logout and byeeeeeeeeeee', (done) => {
      exec('ev_group88 logout', function(error, stdout, stderr) {
        var lines = stdout.split('\n')
        expect(lines[1]).equal('You are logged out')
        done();
      })
    })
    
});