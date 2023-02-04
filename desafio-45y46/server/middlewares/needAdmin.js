module.exports = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.json('Se necesita ser administrador para realizar esta función');
  }
  next();
};
