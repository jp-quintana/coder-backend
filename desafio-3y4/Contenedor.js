const fs = require('fs');

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre.toString();
  }

  async create() {
    try {
      await fs.promises.writeFile(`${this.nombre}`, JSON.stringify([]))
    } catch (error) {
      console.log(error);
    }
  }

  async save(producto) {
    try {
      const contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
      const productos = JSON.parse(contenido)

      producto.id = productos.length + 1;
      productos.push(producto)

      await fs.promises.writeFile(`${this.nombre}`, JSON.stringify(productos))

      console.log(producto.id);

    } catch (error) {
      console.log(error);
    }

  }

  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
      const productos = JSON.parse(contenido)

      const check = productos.filter(producto => producto.id === id)

      if (check.length === 0) {
        console.log(null);
      } else {
        console.log(check);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
      const productos = JSON.parse(contenido)
      console.log(productos);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
      const productos = JSON.parse(contenido)

      const producto = productos.find(producto => producto.id === id)

      if (!producto) {
        throw new Error(`No existe el producto con el id ${id}`)
      }
      
      const indice = productos.indexOf(producto)

      productos.splice(indice, 1)

      for (let i = 0; i < productos.length; i++) {
        productos[i].id = i + 1;
      }

      await fs.promises.writeFile(`${this.nombre}`, JSON.stringify(productos))

    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`${this.nombre}`, JSON.stringify([]))
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
