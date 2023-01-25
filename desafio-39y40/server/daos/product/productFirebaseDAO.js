const FirebaseClass = require('../../containers/FirebaseClass');

class ProductFirebaseDAO extends FirebaseClass {
  constructor() {
    super('products');
  }
}

module.exports = ProductFirebaseDAO;
