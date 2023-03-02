const FirebaseClass = require('../base/FirebaseClass');

// const { db } = require('../../db/firebaseConfig');

class CartFirebaseDAO extends FirebaseClass {
  constructor() {
    super('carts');
  }

  async addProduct(cartId, prodId) {
    const cartRef = this.collection.doc(cartId);

    const cartSnapshot = await cartRef.get();

    const cart = { ...cartSnapshot.data() };

    if (!cart.products) {
      cart.products = [];
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => prodId.toString() === product.id.toString()
    );

    const existingProduct = cart.products[existingProductIndex];

    let updatedProduct;

    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.quantity += 1;
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: prodId, quantity: 1 };
      cart.products.push(updatedProduct);
    }

    await cartRef.update(cart);

    return cart;
  }

  async deleteProduct(cartId, prodId) {
    const cartRef = this.collection.doc(cartId);

    const cartSnapshot = await cartRef.get();

    const cart = { ...cartSnapshot.data() };

    const updatedProducts = cart.products.filter(
      (product) => prodId.toString() !== product.id.toString()
    );

    cart.products = updatedProducts;

    await cartRef.update(cart);
  }

  async deleteInAllCarts(prodId) {
    const cartsRef = this.collection;

    const cartsSnapshot = await cartsRef.get();

    const carts = [];

    cartsSnapshot.docs.map((doc) => {
      carts.push({ ...doc.data(), id: doc.id });
    });

    for (const cart of carts) {
      const updatedProducts = cart.products.filter(
        (product) => prodId !== product.id
      );
      cart.products = updatedProducts;
      await cartsRef.doc(cart.id).update({ products: cart.products });
    }
  }
}

module.exports = CartFirebaseDAO;
