const calculateRandom = (number) => {
  const result = {};

  for (let i = 1; i <= number; i++) {
    const randomNumber = Math.floor(Math.random() * (number - 1 + 1) + 1);
    if (result[randomNumber]) {
      result[randomNumber] = result[randomNumber] + 1;
    } else {
      result[randomNumber] = 1;
    }
  }

  return result;
};

process.on('message', (number) => {
  console.log(number);
  console.log('in process');
  const result = calculateRandom(number);
  process.send(result);
  process.exit();
});
