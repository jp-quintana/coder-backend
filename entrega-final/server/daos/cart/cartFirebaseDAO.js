const FirebaseClass = require('../base/FirebaseClass');

class CartFirebaseDAO extends FirebaseClass {
  constructor() {
    super('carts');
  }

  async addItemToCart({ userId, productId, product }) {
    const cartRef = this.collection.doc(userId);

    const cartDoc = await cartRef.get();

    if (cartDoc.exists) {
      const cart = { ...cartDoc.data() };

      const existingProductIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId.toString()
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { productId, quantity: 1 };
        cart.products.push(updatedProduct);
      }

      await cartRef.update(cart);
    } else {
      await cartRef.set({
        products: [{ productId, quantity: 1 }],
      });
    }
  }

  async removeItemFromCart({ userId, productId }) {
    const cartRef = this.collection.doc(userId);

    const cartSnapshot = await cartRef.get();

    const cart = { ...cartSnapshot.data() };

    const updatedProducts = cart.products.filter(
      (product) => product.productId.toString() === productId.toString()
    );

    cart.products = updatedProducts;

    await cartRef.update(cart);
  }

  async deleteProductInAllCarts(productId) {
    const cartsRef = this.collection;

    const cartsSnapshot = await cartsRef.get();

    const carts = [];

    cartsSnapshot.docs.map((doc) => {
      carts.push({ ...doc.data(), id: doc.id });
    });

    for (const cart of carts) {
      const updatedProducts = cart.products.filter(
        (product) => product.productId !== productId
      );
      cart.products = updatedProducts;

      await cartsRef.doc(cart.id).update({ products: cart.products });
    }
  }
}

module.exports = CartFirebaseDAO;
