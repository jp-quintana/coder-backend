const path = require('path');

const fs = require('fs').promises;

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'messages.json');

const getMessagesFromFile = async (path) => {
  try {
    const content = await fs.readFile(path);
    const messages = JSON.parse(content);
    return messages;
  } catch (e) {
    return [];
  }
};

class message {
  constructor({ user, body, time, date }) {
    this.user = user;
    this.body = body;
    this.time = time;
    this.date = date;
  }

  async save() {
    try {
      const messages = await getMessagesFromFile(p);

      const message = { ...this };

      messages.push(message);

      await fs.writeFile(p, JSON.stringify(messages));
    } catch (error) {
      console.log(error);
    }
  }

  // static async getAll() {
  //   try {
  //     const messages = await getMessagesFromFile(p);
  //     return messages;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

module.exports = message;
