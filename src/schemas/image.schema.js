const Joi = require("joi");

exports.imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  name: Joi.string().required(),
  path: Joi.string().allow("").required(),
  crop: Joi.object({
    x: Joi.number()
      .description("x coordinate of the left corner of the cropped area.")
      .required(),
    y: Joi.number()
      .description("y coordinate of the top corner of the cropped area.")
      .required(),
    width: Joi.number().description("width of the cropped area.").required(),
    height: Joi.number().description("height of the cropped area.").required(),
  }).optional(),
}).allow(null);
