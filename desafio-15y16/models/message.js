const { dbSqlite } = require('../db/dbConfig');

// const path = require('path');

// const fs = require('fs').promises;

// const rootDir = require('../utils/path');

// const p = path.join(rootDir, 'data', 'messages.json');

// const getMessagesFromFile = async (path) => {
//   try {
//     const content = await fs.readFile(path);
//     const messages = JSON.parse(content);
//     return messages;
//   } catch (e) {
//     return [];
//   }
// };

// (async function () {

// })();

class Message {
  constructor({ user, body, time, date }) {
    this.user = user;
    this.body = body;
    this.time = time;
    this.date = date;
  }

  static async create() {
    try {
      const isTable = await dbSqlite.schema.hasTable('messages');

      if (!isTable) {
        await dbSqlite.schema.createTable('messages', (table) => {
          table.increments('id').primary().notNullable();
          table.string('user').notNullable();
          table.string('body').notNullable();
          table.string('time').notNullable();
          table.string('date').notNullable();
        });

        console.log('Table created successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      const messageCreated = await dbSqlite
        .from('messages')
        .insert({ ...this });
      console.log('Message created successfully!');
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll() {
    try {
      const messages = await dbSqlite.from('messages').select('*');
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  // static async getById(id) {
  //   try {
  //     const messages = await getMessagesFromFile(p);

  //     const message = messages.find((message) => message.email === email);

  //     if (!message) {
  //       console.log({ error: 'message no encontrado' });
  //     } else {
  //       return message;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // static async delete(id) {
  //   try {
  //     let messages = await getMessagesFromFile(p);

  //     const messageToDelete = messages.find((message) => message.id === id);

  //     if (!messageToDelete) {
  //       throw new Error(`{ error: 'messageo no encontrado' }`);
  //     }

  //     messages = messages.filter((message) => message !== messageToDelete);

  //     await fs.promises.writeFile(p, JSON.stringify(messages));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = Message;
