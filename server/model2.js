var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'Comments', new Schema({
      "id": Number,
      "createdAt": Date,
      "updatedAt": Date,
      "body": String,
      "author": {
        "username": String,
        "bio": String,
        "image": String,
        "following": Boolean
      }
}));

     