const Joi = require('@hapi/joi');

const createBookSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
    'string.base': `name should be a type of 'text'`,
    'string.empty': `name cannot be an empty field`,
  }),
  price: Joi.number()
    .required()
    .messages({
      'any.required': 'price is required',
      'number.base': `price should be a type of 'number'`,
    }),
}).options({ allowUnknown: true });

module.exports = {
  createBookSchema,
};
