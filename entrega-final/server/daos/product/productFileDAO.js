const FileClass = require('../base/FileClass');

const path = require('path');

const rootDir = require('../../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

class ProductFileDAO extends FileClass {
  constructor() {
    super(p);
  }
}

module.exports = ProductFileDAO;
