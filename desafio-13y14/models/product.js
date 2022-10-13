const { dbMysql } = require('../db/dbconfig');

class Product {
  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = parseInt(price);
    this.thumbnail = thumbnail;
  }

  static async create() {
    try {
      const isTable = await dbMysql.schema.hasTable('products');

      if (!isTable) {
        await dbMysql.schema.createTable('products', (table) => {
          table.increments('id').primary().notNullable();
          table.string('title').notNullable();
          table.integer('price').notNullable();
          table.string('thumbnail').notNullable();
        });

        console.log('Table created successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      const createdProduct = await dbMysql.from('products').insert({ ...this });
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async edit(id) {
    try {
      const updatedProduct = await dbMysql
        .from('products')
        .where('id', id)
        .update({ ...this });

      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id) {
    try {
      const product = await dbMysql
        .from('products')
        .where('id', id)
        .select('*');

      if (product.length < 1) {
        return { error: 'Producto no encontrado' };
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll() {
    try {
      const products = await dbMysql.from('products').select('*');
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const deletedProduct = await dbMysql
        .from('products')
        .where('id', id)
        .del();
      return { mensaje: 'Producto eliminado con exito!' };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
