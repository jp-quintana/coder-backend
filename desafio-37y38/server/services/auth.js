const UserMongoDAO = require('../daos/user/UserMongoDAO');
const userDb = new UserMongoDAO();

exports.fetchUser = async ({ email }) => {
  return await userDb.collection.findOne({ username: email });
};
