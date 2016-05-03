"use strict";

var https = require('https');
var q = require('q');

var SimpleIonicPush = function(apiKey) {
  if (!(this instanceof SimpleIonicPush)) {
    return new SimpleIonicPush(apiKey);
  }

  //Set API Key
  if (typeof apiKey === 'string') {
    this.key = apiKey;
  }
  else {
    throw new Error('Simple-Ionic-Push Key must be in string format');
  }

  var send = function(notification) {
    var deferred = q.defer();

    var options = {
      hostname: 'api.ionic.io',
      path: '/push/notifications',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.key
      }
    };

    var req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(response) {
        return deferred.resolve(response);
      });
    });

    req.on('error', function(error) {
      return deferred.reject(error);
    });

    req.write(JSON.stringify(notification));
    req.end();

    return deferred.promise;
  };

  // expose public API
  this.send = send;
  return this;
};

module.exports = SimpleIonicPush;
