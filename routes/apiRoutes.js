var apiRoutes = require('express').Router();
var RootController = require('../app/controllers/RootController')
var UserController = require('../app/controllers/UserController')
var AuthController = require('../app/controllers/AuthController')
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');

apiRoutes.get('/', UserController.index);
apiRoutes.post('/authentication' , AuthController.authenticate);
apiRoutes.use(function (req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jsonwebtoken.verify(token, config.supersecret,function (err,decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
       success: false,
       message: 'No token provided.'
     });
  }
});
apiRoutes.get('/test', function (req,res) {
  res.json('verified Token');
});
module.exports = apiRoutes ;
