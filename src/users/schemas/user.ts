import Joi from 'joi';

export const userSchema = Joi.object({
  user: Joi.object({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
  }),
});
