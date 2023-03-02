// const { db } = require('../db/firebaseConfig');

class FirebaseClass {
  constructor(name) {
    this.collection = db.collection(name);
  }

  async fetchAll() {
    const querySnapshot = await this.collection.get();

    const docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    // for (const doc of docsSnapshot) {
    //   products.push(doc.data());
    // }
    return docs;
  }

  async fetchById(id) {
    const querySnapshot = await this.collection.doc(id).get();

    const doc = { ...querySnapshot.data(), id: querySnapshot.id };
    return doc;
  }

  async create(obj) {
    return await this.collection.add(obj);
  }

  async update(id, obj) {
    return await this.collection.doc(id).update(obj);
  }

  async delete(id) {
    return await this.collection.doc(id).delete();
  }

  // TODO: ver como pasar esto al Model de Cart
  // async deleteInAllCarts(id) {
  //   return await this.collection.updateMany(
  //     {},
  //     { $pull: { products: { productId: mongoose.Types.ObjectId(id) } } }
  //   );
  // }
}

module.exports = FirebaseClass;
