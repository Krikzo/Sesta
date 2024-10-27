module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/users') {
      req.body.id = Date.now();
    }
    next();
  }