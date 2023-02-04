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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

Product.virtual('id').get(function () {
  return this._id;
});

module.exports = mongoose.model('Product', Product);
