const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const model = new Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', model);

module.exports = User