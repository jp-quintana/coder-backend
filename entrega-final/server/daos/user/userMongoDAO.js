const MongoClass = require('../base/MongoClass');
const UserMongo = require('../../models/UserMongo');

class UserMongoDAO extends MongoClass {
  constructor() {
    super(UserMongo);
  }
}

module.exports = UserMongoDAO;
