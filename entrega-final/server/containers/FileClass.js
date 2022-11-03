const path = require('path');

const fs = require('fs').promises;

const getDocsFromFile = async (path) => {
  try {
    const content = await fs.readFile(path);
    const docs = JSON.parse(content);
    return docs;
  } catch (e) {
    return [];
  }
};

class FileClass {
  constructor(path) {
    this.path = path;
  }

  async fetchAll() {
    try {
      const docs = await getDocsFromFile(this.path);

      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchById(id) {
    try {
      const docs = await getDocsFromFile(this.path);
      console.log(docs);

      const doc = docs.find((doc) => doc.id.toString() === id.toString());

      if (!doc) {
        console.log({ error: 'documento no encontrado' });
      } else {
        return doc;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const docs = await getDocsFromFile(this.path);

      const id = (Math.floor(Math.random() * (100000 - 1 + 1)) + 1).toString();

      let doc;

      if (obj.hasOwnProperty('title')) {
        doc = {
          ...obj,
          id,
          timestamp: Date.now(),
        };
      } else {
        doc = {
          id,
          timestamp: Date.now(),
          products: [],
        };
      }

      docs.push(doc);

      await fs.writeFile(this.path, JSON.stringify(docs));

      return doc;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    const docs = await getDocsFromFile(this.path);

    const { timestamp } = docs.find((doc) => doc.id === id);

    const existingDocIndex = docs.findIndex((doc) => doc.id === id);

    docs[existingDocIndex] = { id, timestamp, ...obj };

    await fs.writeFile(this.path, JSON.stringify(docs));
  }

  async delete(id) {
    try {
      let docs = await getDocsFromFile(this.path);

      const docToDelete = docs.find(
        (doc) => doc.id.toString() === id.toString()
      );

      if (!docToDelete) {
        throw new Error({ error: 'documento no encontrado' });
      }

      docs = docs.filter((doc) => doc.id.toString() !== id.toString());

      await fs.writeFile(this.path, JSON.stringify(docs));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FileClass;
