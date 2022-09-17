import Joi, { ObjectSchema } from "joi";

const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const signUpSchema: ObjectSchema = Joi.object({
  email: Joi.string().pattern(regEmail).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const signInSchema: ObjectSchema = Joi.object({
  email: Joi.string().pattern(regEmail).required(),
  password: Joi.string().required(),
});
