const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    _id: { type: String },
    products: [
      {
        productId: { type: Object },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

Cart.methods.addProduct = function (product) {
  const cartProductIndex = this.products.findIndex(
    (p) => p.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  let updatedCartItems = [...this.products];

  if (cartProductIndex >= 0) {
    newQuantity = this.products[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  this.products = [...updatedCartItems];

  return this.save();
};

Cart.methods.deleteProduct = function (productId) {
  let updatedCartItems = this.products.filter(
    (p) => p.productId.toString() !== productId.toString()
  );
  this.products = updatedCartItems;

  return this.save();
};

module.exports = mongoose.model('Cart', Cart);
