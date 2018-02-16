var User = require('../models/User');
var jsonwebtoken = require('jsonwebtoken');
var config = require('../../config');

module.exports = {
  authenticate:function (req,res) {
    User.find({
      name:req.body.name
    },function (err,result) {
      if (err) {
        throw err;
      } else {
        if (result.length<1) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        }else if (result) {
          if (result[0].password != req.body.password) {
             res.json({ success: false, message: 'Authentication failed. Wrong password.' });
           }else {
             const payload = {
               name:result[0].name
             }
             var token = jsonwebtoken.sign(payload, config.supersecret, {
                expiresIn : 1440 // expires in 24 hours
              });

              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
           }
        }

      }
    })
  }
}
