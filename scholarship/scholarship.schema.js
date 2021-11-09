const Joi = require("joi");
const config = require("../config/config");
const { imageSchema } = require("../schemas/image.schema");

const scholarshipDataSchema = Joi.object({
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
  uid: Joi.string().regex(/[a-z]+_[a-z | 0-9]+/),
});

const scholarshipsDataSchema = Joi.object().pattern(/.*/, [
  scholarshipDataSchema,
]);

module.exports = {
  scholarshipDataSchema,
  scholarshipsDataSchema,
  allScholarshipSchemas: {
    [`${config.apiUrl}/scholarships`]: scholarshipsDataSchema,
    [`${config.apiUrl}/scholarship`]: scholarshipDataSchema,
    [`${config.apiUrl}/scholarship/:id`]: scholarshipDataSchema,
    [`${config.devApiUrl}/scholarships`]: scholarshipsDataSchema,
    [`${config.devApiUrl}/scholarship`]: scholarshipDataSchema,
    [`${config.devApiUrl}/scholarship/:id`]: scholarshipDataSchema,
  },
};
