const FirebaseClass = require('../base/FirebaseClass');

class ProductFirebaseDAO extends FirebaseClass {
  constructor() {
    super('products');
  }
}

module.exports = ProductFirebaseDAO;
