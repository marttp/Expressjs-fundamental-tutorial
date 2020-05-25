const property = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params',
};

const validationMiddleware = (schema, prop = property.BODY) => {
  return (req, res, next) => {
    // const { error } = schema.validate(req[prop], { abortEarly: false });
    const { error } = schema.validate(req[prop]);
    if (error) {
      return res.status(400).send({
        // detail: error.details,
        message: error.message,
      });
    }
    next();
  };
};

module.exports = {
  validationMiddleware,
  property,
};
