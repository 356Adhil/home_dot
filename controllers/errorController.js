exports.handle404 = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};

exports.handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};
