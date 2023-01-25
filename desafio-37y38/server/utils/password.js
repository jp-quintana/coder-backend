const bcrypt = require('bcrypt');

exports.generatePassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};

exports.validatePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};
