const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

const getProductsFromFile = async (path) => {
  try {
    const content = await fs.readFile(path);
    const products = JSON.parse(content);
    return products;
  } catch (e) {
    return [];
  }
};

class Product {
  constructor({
    id = null,
    timestamp = null,
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.title = title;
    this.description = description;
    this.sku = sku;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
  }

  async save() {
    try {
      const products = await getProductsFromFile(p);

      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );

        products[existingProductIndex] = this;
      } else {
        const product = {
          ...this,
          id: (Math.floor(Math.random() * (100000 - 1 + 1)) + 1).toString(),
          timestamp: Date.now(),
        };

        products.push(product);
        console.log(product.id);
      }

      await fs.writeFile(p, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    try {
      const products = await getProductsFromFile(p);

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchById(prodId) {
    try {
      const products = await getProductsFromFile(p);

      const product = products.find(
        (product) => prodId.toString() === product.id.toString()
      );

      if (!product) {
        console.log({ error: 'producto no encontrado' });
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(prodId) {
    try {
      let products = await getProductsFromFile(p);

      await Cart.deleteProductInAllCarts(prodId);

      const productToDelete = products.find(
        (product) => prodId.toString() === product.id.toString()
      );

      if (!productToDelete) {
        throw new Error(`{ error: 'producto no encontrado' }`);
      }

      products = products.filter(
        (product) => prodId.toString() !== product.id.toString()
      );

      await fs.writeFile(p, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
