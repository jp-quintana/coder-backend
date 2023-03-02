const MongoClass = require('../base/MongoClass');
const UserMongo = require('../../models/user/UserMongo');

class UserMongoDAO extends MongoClass {
  constructor() {
    super(UserMongo);
  }

  async fetchUserByUsername(username) {
    return await this.collection.findOne({ username });
  }
}

module.exports = UserMongoDAO;
