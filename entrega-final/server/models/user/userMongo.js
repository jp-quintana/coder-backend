const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model('User', User);
