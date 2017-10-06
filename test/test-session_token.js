var errors = require('../lib/errors'),
    expect = require('chai').expect,
    playback = require('./record'),
    sessionToken = require('../lib/models/session_token'),
    Config = require('../lib/http/config');

var config, SessionToken;

describe('SessionToken', function() {

  before(function() {
    config = new Config({
      apiKey: process.env.ELIGIBLE_API_KEY,
      isTest: true,
    });
    SessionToken = sessionToken(config);
    process.env.NODE_ENV = 'testing';
  });

  describe('#revoke', function() {

    playback('session_tokens/revoke');

    it('exists as public method on SessionToken', function() {
      expect(SessionToken).to.have.property('revoke');
    });

    it('should revoke a session token', function(done) {
      SessionToken.create({
        endpoints: 'coverage',
        ttl_seconds: 60,
        max_calls: 10,
      })
      .then(function(sessionTokenJson) {
        SessionToken.revoke({
          session_token: sessionTokenJson['session_token'],
        })
        .then(function(revokeJson) {
          expect(revokeJson).to.have.property('eligible_id');
          done();
        })
        .catch(done);
      })
      .catch(done);
    });
  });

  describe('#create', function() {

    playback('session_tokens/create');

    it('should create session token', function(done) {
      SessionToken.create({
        endpoints: 'coverage',
        ttl_seconds: 60,
        max_calls: 10,
      })
      .then(function(sessionTokenJson) {
        expect(sessionTokenJson).to.have.property('session_token');
        done();
      })
      .catch(done);
    });
  });

});
