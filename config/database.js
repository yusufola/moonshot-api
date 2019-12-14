const mongoose = require('mongoose');
const path = require('path');

const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database =  mongoose.connect(connection.development.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    break;
  case 'testing':
    database =  mongoose.connect(connection.development.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    break;
  default:
    database =  mongoose.connect(connection.development.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
}

module.exports = database;
