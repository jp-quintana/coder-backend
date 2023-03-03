const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

Product.virtual('id').get(function () {
  return this._id.toHexString();
});

Product.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Product', Product);
