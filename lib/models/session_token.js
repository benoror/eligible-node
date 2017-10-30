var request = require('../http/client');
var Resource = require('./resource');
var util = require('util');

module.exports = function(config) {

  function SessionToken(attributes) {
    Resource.call(this, attributes);
  }
  util.inherits(SessionToken, Resource);

  SessionToken.revoke = function(params) {
    return request('post', 'session_tokens/revoke', params, config)
      .then(function(json) {
        return json;
      });
  };


  SessionToken.create = function(params) {
    return request('post', 'session_tokens/create', params, config)
      .then(function(json) {
        return json;
      });
  };

  return SessionToken;
};
