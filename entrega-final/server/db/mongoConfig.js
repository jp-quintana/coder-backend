const mongoose = require('mongoose');

exports.dbConnect = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
};
