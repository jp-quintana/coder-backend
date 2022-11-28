require('dotenv').config();

const mongoose = require('mongoose');

exports.connection = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
};
