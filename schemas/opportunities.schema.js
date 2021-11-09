// opportunities.schema.js - Opportunities data schemas module

const config = require("../config/config");
const Joi = require("joi");
const { imageSchema } = require("./image.schema");
const { allEventSchemas, eventsDataSchema } = require("../event/event.schema");
const {
  allScholarshipSchemas,
  scholarshipsDataSchema,
} = require("../scholarship/scholarship.schema");

const jobListingDataSchema = Joi.object().pattern(/.*/, [
  Joi.object({
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
  }),
]);

module.exports = {
  ...allEventSchemas,
  ...allScholarshipSchemas,
  [`${config.apiUrl}/opportunities/jobs`]: jobListingDataSchema,
  [`${config.apiUrl}/opportunities`]: Joi.object({
    events: eventsDataSchema,
    jobs: jobListingDataSchema,
    scholarships: scholarshipsDataSchema,
  }),
  [`${config.devApiUrl}/opportunities/jobs`]: jobListingDataSchema,
  [`${config.devApiUrl}/opportunities`]: Joi.object({
    events: eventsDataSchema,
    jobs: jobListingDataSchema,
    scholarships: scholarshipsDataSchema,
  }),
};
