const Joi = require('@hapi/joi');

const getFileSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
    'string.base': `name should be a type of 'text'`,
    'string.empty': `name cannot be an empty field`,
  }),
});

module.exports = {
  getFileSchema,
};
