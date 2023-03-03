const FirebaseClass = require('../base/FirebaseClass');

class ProductFirebaseDAO extends FirebaseClass {
  constructor() {
    super('products');
  }

  async fetchProduct(id) {
    return await this.fetchById(id);
  }
}

module.exports = ProductFirebaseDAO;
