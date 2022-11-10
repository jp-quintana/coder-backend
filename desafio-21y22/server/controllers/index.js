const { faker } = require('@faker-js/faker');

exports.getProducts = (req, res, next) => {
  const products = [];

  for (let i = 0; i < 5; i++) {
    const randomName = faker.commerce.productName();
    const randomPrice = faker.commerce.price(800, 3000);
    const randomImage = faker.image.food(200, 200, true);

    products.push({
      name: randomName,
      price: randomPrice,
      image: randomImage,
    });
  }

  res.json(products);
};
