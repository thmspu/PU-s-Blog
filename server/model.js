var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'Articles', new Schema({
      title: String,
      slug: String,
      body: String,
      createdAt:Date,
      updatedAt: Date,
      tagList: [
       String
      ],
      description:String,
      author: {
              username:String,
              bio: String,
              image: String,
              following: Boolean
            },
      favorited: String,
      favoritesCount: Number
}));