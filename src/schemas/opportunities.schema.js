// opportunities.schema.js - Opportunities data schemas module

const config = require("../config/config");
const Joi = require("joi");
const { allEventSchemas, eventsDataSchema } = require("../event/event.schema");
const { allJobSchemas, jobsDataSchema } = require("../job/job.schema");
const {
  allScholarshipSchemas,
  scholarshipsDataSchema,
} = require("../scholarship/scholarship.schema");

const allOppsSchema = Joi.object({
  events: eventsDataSchema,
  jobs: jobsDataSchema,
  scholarships: scholarshipsDataSchema,
});

module.exports = {
  ...allEventSchemas,
  ...allScholarshipSchemas,
  ...allJobSchemas,
  [`${config.apiUrl}/opportunities`]: allOppsSchema,
  [`${config.devApiUrl}/opportunities`]: allOppsSchema,
};
