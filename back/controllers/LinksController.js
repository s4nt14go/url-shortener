const Links = require('../models/Links');

function getTop5(callback) {
  Links.find({}, {}, {
    limit:5,
    sort:{
      count: -1, // First Sort DESC
      updatedAt: -1 // Second Sort DESC
    }
  }, function(error, results){
    if (error) {
      console.log(error);
      return callback(error);
    }
    console.log('top 5', results);
    callback(null, results);
  });
}

function newShort(params, callback) {
  Links.findOneAndUpdate({original: params.original}, {...params, $inc : {'count' : 1}}, {useFindAndModify: false, upsert: true, new: true}, function(error, result) {
    if (error) {
      console.log(error);
      return callback(error);
    }
    console.log('new doc count for ' + result.original + ' ' + result.count);
    getTop5(callback);
  });
}

module.exports = {
  newShort,
  getTop5
};