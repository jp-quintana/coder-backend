const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    products: [
      {
        productId: { type: Object },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

//TODO: FIX VIRTUAL
// cartSchema
//   // .path('products')
//   // .schema.virtual('id')
//   .virtual('products.id')
//   .get(function () {
//     return this._id;
//   });

cartSchema.methods.addProduct = function (product) {
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

cartSchema.methods.deleteProduct = function (productId) {
  let updatedCartItems = this.products.filter(
    (p) => p.productId.toString() !== productId.toString()
  );
  console.log('in method', updatedCartItems);
  this.products = updatedCartItems;

  return this.save();
};

cartSchema.statics.deleteProductInAllCarts = function (productId) {
  return 'hola';
};

module.exports = mongoose.model('Cart', cartSchema);
