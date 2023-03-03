const { db } = require('../../db/firebaseConfig');

const admin = require('firebase-admin');

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

    return docs;
  }

  async fetchById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    } else {
      const docData = { ...doc.data(), id: doc.id };
      return docData;
    }
  }

  async create(obj) {
    return await this.collection.add({
      ...obj,
      createdAt: admin.firestore.Timestamp.now(),
    });
  }

  async update(id, obj) {
    return await this.collection.doc(id).update(obj);
  }

  async delete(id) {
    return await this.collection.doc(id).delete();
  }
}

module.exports = FirebaseClass;
