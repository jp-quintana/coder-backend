const FileClass = require('../../containers/FileClass');

const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../../utils/path');

const p = path.join(rootDir, 'data', 'carts.json');

const getDocsFromFile = async (path) => {
  try {
    const content = await fs.readFile(path);
    const docs = JSON.parse(content);
    return docs;
  } catch (e) {
    return [];
  }
};

class CartFileDAO extends FileClass {
  constructor() {
    super(p);
  }

  async addProduct(cartId, prodId) {
    const carts = await getDocsFromFile(p);
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
      console.log(carts[cartIndex]);
      return carts[cartIndex];
    }
  }

  async deleteProduct(cartId, prodId) {
    try {
      let carts = await getDocsFromFile(p);

      const cartIndex = carts.findIndex(
        (cart) => cartId.toString() === cart.id.toString()
      );

      if (cartIndex < 0) {
        throw new Error(`{ error: 'carrito no encontrado' }`);
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

  async deleteInAllDocs(prodId) {
    try {
      let carts = await getDocsFromFile(p);

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

module.exports = CartFileDAO;
