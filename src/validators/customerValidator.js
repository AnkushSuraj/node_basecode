import Joi from 'joi';

export const addCustomerValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    country_code: Joi.string().required(),
    phoneNumber: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

export const customerDetailValidator = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};