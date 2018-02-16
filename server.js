var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/User');
var routes = require('./routes/index');
var apiRoutes = require('./routes/apiRoutes');

var port = 8080;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('superSecret' , config.supersecret)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/', routes);
app.use('/api', apiRoutes);

app.listen(port , ()=>{
  console.log('Server Listning on ' + port);
})
