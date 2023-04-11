async function paramsToBody(req, res, next, params) {
    try {
      params.forEach(param => {
        req.body[param.body_field] = req.params[param.param];
      });
      next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

module.exports = {
    paramsToBody: paramsToBody
};