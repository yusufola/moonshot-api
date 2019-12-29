const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const model = new Schema({
  mobile_number: String,
  name: String,
  username: String,
  password: String
});

const User = mongoose.model('User', model);

module.exports = User