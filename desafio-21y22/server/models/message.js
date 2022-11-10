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

class Message {
  constructor({ author, content }) {
    this.author = author;
    this.content = content;
    this.time = new Date().toLocaleTimeString();
    this.date = new Date().toLocaleDateString();
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

  static async fetchAll() {
    try {
      const messages = await getMessagesFromFile(p);

      return messages;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Message;
