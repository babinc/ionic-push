#Simple Ionic Push
This is a simple to way to push notifications to the ionic API server with your node server. 
## Install Simple-Ionic-Push

```bash
$ npm install --save simple-ionic-push
```

[![NPM](https://nodei.co/npm/simple-ionic-push.png)](https://nodei.co/npm/simple-ionic-push/)

##Require the package
```javascript
var ionicPush = require('ionic-push')('Your API Token from Ionic');
```

Pushes will return a promise, and passed the success or error responses from the Ionic API.

##Sending a push
```javascript
var tokens = [];
tokens.push('yourDeviceToken');

var notification = {
  "tokens": tokens,
  "profile": "prod",
  "notification": {
    "message": "Hello World!"
  }
};
    
ionicPush.send(notification).then(function(response) {
  return res.status(201).send(response);
  }, function(error) {
  return res.status(400).send(error);
});
```
