const MongoClass = require('../base/MongoClass');
const OrderMongo = require('../../models/order/OrderMongo');

class OrderMongoDAO extends MongoClass {
  constructor() {
    super(OrderMongo);
  }

  async fetchOrders(userId) {
    return await this.collection.find({ userId }).sort('-createdAt');
  }
}

module.exports = OrderMongoDAO;
