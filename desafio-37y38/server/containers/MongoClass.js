const mongoose = require('mongoose');

class MongoClass {
  constructor(collection) {
    this.collection = collection;
  }

  async fetchAll() {
    return await this.collection.find();
  }

  async fetchById(id) {
    return await this.collection.findById(id);
  }

  async create(obj) {
    return await this.collection.create(obj);
  }

  async update(id, obj) {
    return await this.collection.findOneAndUpdate({ _id: id }, obj);
  }

  async delete(id) {
    return await this.collection.findByIdAndRemove(id);
  }

  // TODO: ver como pasar esto al Model de Cart
  async deleteInAllDocs(id) {
    return await this.collection.updateMany(
      {},
      { $pull: { products: { productId: mongoose.Types.ObjectId(id) } } }
    );
  }
}

module.exports = MongoClass;
