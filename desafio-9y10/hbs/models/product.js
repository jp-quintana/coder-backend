const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

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
  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  async save() {
    try {
      const products = await getProductsFromFile(p);

      const product = { ...this, id: `${products.length + 1}` };

      products.push(product);

      await fs.writeFile(p, JSON.stringify(products));

      console.log(product.id);
    } catch (error) {
      console.log(error);
    }
  }

  static async edit(id, product) {
    try {
      const products = await getProductsFromFile(p);
      const productToEditIndex = products.findIndex(
        (product) => product.id === id
      );

      if (productToEditIndex < 0) {
        throw new Error(`{ error: 'producto no encontrado' }`);
      }

      products[productToEditIndex] = { ...product, id };
      await fs.writeFile(p, JSON.stringify(products));
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id) {
    try {
      const products = await getProductsFromFile(p);

      const product = products.find((product) => product.id === id);

      if (!product) {
        console.log({ error: 'producto no encontrado' });
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll() {
    try {
      const products = await getProductsFromFile(p);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      let products = await getProductsFromFile(p);

      const productToDelete = products.find((product) => product.id === id);

      if (!productToDelete) {
        throw new Error(`{ error: 'producto no encontrado' }`);
      }

      products = products.filter((product) => product !== productToDelete);

      for (let i = 0; i < products.length; i++) {
        products[i].id = `${i + 1}`;
      }

      await fs.promises.writeFile(p, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  // async deleteAll() {
  //   try {
  //     await fs.promises.writeFile(p, JSON.stringify([]));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = Product;
