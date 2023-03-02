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

  async create() {
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
}

module.exports = Product;
