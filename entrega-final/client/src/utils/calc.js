export const addAllItemsPrice = (items) => {
  let price = 0;

  for (const item of items) {
    price += +item.price * item.quantity;
  }

  return price;
};
