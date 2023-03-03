const FirebaseClass = require('../base/FirebaseClass');

class OrderFirebaseDAO extends FirebaseClass {
  constructor() {
    super('orders');
  }

  async fetchOrders(userId) {
    const snapshot = await this.collection.where('userId', '==', userId).get();

    if (snapshot.empty) {
      return [];
    } else {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    }
  }
}

module.exports = OrderFirebaseDAO;
