const Joi = require("joi");
const config = require("../config/config");
const { imageSchema } = require("../schemas/image.schema");
const { idRegExp } = require("../util/id");

const jobDataSchema = Joi.object({
  title: Joi.string().required(),
  timeline: Joi.object({
    openDate: Joi.string().isoDate().allow(null),
    closeDate: Joi.string().isoDate().allow(null),
  }),
  image: imageSchema,
  link: Joi.string().allow(null),
  description: Joi.string().allow(null),
  otherLinks: Joi.object({
    flyerLink: Joi.string().allow(null),
  })
    .unknown()
    .allow(null),
  uid: Joi.string().regex(idRegExp),
});

const jobsDataSchema = Joi.object().pattern(/.*/, [jobDataSchema]);

module.exports = {
  jobDataSchema,
  jobsDataSchema,
  allJobSchemas: {
    [`${config.apiUrl}/jobs`]: jobsDataSchema,
    [`${config.apiUrl}/job`]: jobDataSchema,
    [`${config.apiUrl}/job/:id`]: jobDataSchema,
    [`${config.devApiUrl}/jobs`]: jobsDataSchema,
    [`${config.devApiUrl}/job`]: jobDataSchema,
    [`${config.devApiUrl}/job/:id`]: jobDataSchema,
  },
};
