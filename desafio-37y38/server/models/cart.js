const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'carts.json');

const getCartsFromFile = async (path) => {
  try {
    const content = await fs.readFile(path);
    const products = JSON.parse(content);
    return products;
  } catch (e) {
    return [];
  }
};

class Cart {
  constructor({ id = null, timestamp = null, products = [] }) {
    this.id = id;
    this.timestamp = timestamp;
    this.products = products;
  }

  async save() {
    try {
      const carts = await getCartsFromFile(p);

      const cart = {
        ...this,
        id: (Math.floor(Math.random() * (100000 - 1 + 1)) + 1).toString(),
        timestamp: Date.now(),
      };

      carts.push(cart);
      console.log(cart.id);

      await fs.writeFile(p, JSON.stringify(carts));

      return cart.id;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchProducts(cartId) {
    try {
      const carts = await getCartsFromFile(p);

      const cart = carts.find(
        (cart) => cartId.toString() === cart.id.toString()
      );

      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  static async addProduct(cartId, prodId) {
    try {
      const carts = await getCartsFromFile(p);
      const cartIndex = carts.findIndex(
        (cart) => cartId.toString() === cart.id.toString()
      );

      if (cartIndex < 0) {
        console.log({ error: 'carrito no encontrado' });
      } else {
        const existingProductIndex = carts[cartIndex].products.findIndex(
          (product) => prodId.toString() === product.id.toString()
        );

        const existingProduct = carts[cartIndex].products[existingProductIndex];

        let updatedProduct;

        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.quantity += 1;
          carts[cartIndex].products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: prodId, quantity: 1 };
          carts[cartIndex].products.push(updatedProduct);
        }

        await fs.writeFile(p, JSON.stringify(carts));
        //TODO: CHECK 1
        return updatedProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(cartId) {
    try {
      let carts = await getCartsFromFile(p);

      const cartToDelete = carts.find(
        (cart) => cartId.toString() === cart.id.toString()
      );

      if (!cartToDelete) {
        throw new Error(`{ error: 'carrito no encontrado' }`);
      }

      carts = carts.filter((cart) => cartId.toString() !== cart.id.toString());

      await fs.writeFile(p, JSON.stringify(carts));
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(cartId, prodId) {
    try {
      let carts = await getCartsFromFile(p);

      const cartIndex = carts.findIndex(
        (cart) => cartId.toString() === cart.id.toString()
      );

      if (cartIndex < 0) {
        throw new Error(`{ error: 'producto no encontrado' }`);
      }

      const updatedProducts = carts[cartIndex].products.filter(
        (product) => prodId.toString() !== product.id.toString()
      );

      carts[cartIndex].products = updatedProducts;

      await fs.writeFile(p, JSON.stringify(carts));
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProductInAllCarts(prodId) {
    try {
      let carts = await getCartsFromFile(p);

      for (const cart of carts) {
        const updatedProducts = cart.products.filter(
          (product) => prodId !== product.id
        );
        cart.products = updatedProducts;
      }

      await fs.writeFile(p, JSON.stringify(carts));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Cart;
