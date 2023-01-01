module.exports = (req, res, next) => {
  if (!req.user) {
    return res.json('Se necesita ser usuario para realizar esta función');
  }
  next();
};
