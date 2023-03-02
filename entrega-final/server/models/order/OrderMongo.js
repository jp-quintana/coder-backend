const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        thumbnail: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number },
      },
    ],
    state: {
      type: String,
      default: 'generated',
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

Order.virtual('id').get(function () {
  return this._id.toHexString();
});

Order.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Order', Order);
