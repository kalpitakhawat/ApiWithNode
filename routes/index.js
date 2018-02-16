var routes = require('express').Router();
var RootController = require('../app/controllers/RootController')
var UserController = require('../app/controllers/UserController')

routes.get('/', RootController.index);
routes.get('/setup' , UserController.setup);
module.exports = routes ;
