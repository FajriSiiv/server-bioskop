import Joi from "joi";

export const ticketValidationSchema = Joi.object({
  seatNumber: Joi.array().items(Joi.number().integer().min(1)).required(),
  movieId: Joi.string().required(),
  // userId: Joi.string().required(),
});
