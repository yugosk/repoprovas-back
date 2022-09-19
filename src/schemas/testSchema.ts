import Joi, { ObjectSchema } from "joi";

const regUrl =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const testSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  pdfUrl: Joi.string().pattern(regUrl).required(),
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  teacher: Joi.string().required(),
});
