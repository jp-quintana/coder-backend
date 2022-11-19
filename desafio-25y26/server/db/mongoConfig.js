const mongoose = require('mongoose');

exports.dbConnect = async () => {
  await mongoose.connect('');
};
