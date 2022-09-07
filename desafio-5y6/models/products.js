const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

class Products {
  // constructor(name) {
  //   this.name = name.toString();
  // }

  // async create() {
  //   try {
  //     await fs.promises.writeFile(p, JSON.stringify([]));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async save(product) {
  //   try {
  //     const content = await fs.promises.readFile(p);
  //     const products = JSON.parse(content);

  //     product.id = products.length + 1;
  //     products.push(product);

  //     await fs.promises.writeFile(p, JSON.stringify(products));

  //     console.log(product.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getById(id) {
  //   try {
  //     const content = await fs.promises.readFile(p);
  //     const products = JSON.parse(content);

  //     const check = products.filter((product) => product.id === id);

  //     if (check.length === 0) {
  //       console.log(null);
  //     } else {
  //       console.log(check);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async getAll() {
    try {
      const content = await fs.readFile(p);
      const products = JSON.parse(content);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  // async deleteById(id) {
  //   try {
  //     const content = await fs.promises.readFile(p);
  //     const products = JSON.parse(content);

  //     const product = products.find((product) => product.id === id);

  //     if (!product) {
  //       throw new Error(`No existe el product con el id ${id}`);
  //     }

  //     const indice = products.indexOf(product);

  //     products.splice(indice, 1);

  //     for (let i = 0; i < products.length; i++) {
  //       products[i].id = i + 1;
  //     }

  //     await fs.promises.writeFile(p, JSON.stringify(products));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteAll() {
  //   try {
  //     await fs.promises.writeFile(p, JSON.stringify([]));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = Products;
