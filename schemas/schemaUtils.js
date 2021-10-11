const Joi = require("joi");
const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  name: Joi.string().required(),
  path: Joi.string().allow("").required(),
}).allow(null);

module.exports = {
  imageSchema,
};
