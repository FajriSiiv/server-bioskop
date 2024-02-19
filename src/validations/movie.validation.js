import Joi from "joi";

export const movieValidationSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  seat: Joi.number().required(),
});
