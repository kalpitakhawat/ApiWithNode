var User = require('../models/User');
module.exports = {
  setup:function (req , res) {
    var jhon = new User({
      name:'Jhon',
      password:'password'
    });
    jhon.save(function (err,result) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({'message':'success' , 'result':result});
      }
    });
  },
  index:function (req,res) {
    User.find({}, function (err,result) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({'message':'success' , 'result':result});
      }
    });
  }
}
