const FirebaseClass = require('../base/FirebaseClass');

class UserFirebaseDAO extends FirebaseClass {
  constructor() {
    super('users');
  }

  async fetchUserByUsername(username) {
    const snapshot = await this.collection
      .where('username', '==', username)
      .get();

    if (snapshot.empty) {
      return null;
    } else {
      let user;
      snapshot.forEach((doc) => {
        user = { id: doc.id, ...doc.data() };
      });

      return user;
    }
  }
}

module.exports = UserFirebaseDAO;
