// opportunities.schema.js - Opportunities data schemas module

const Joi = require("joi");

const eventDataSchema = Joi.object().pattern(/.*/, [
  Joi.object({
    title: Joi.string().required(),
    startTime: Joi.string().isoDate().allow(null),
    endTime: Joi.string().isoDate().allow(null),
    img: Joi.string().allow(null),
    meetingLink: Joi.string().allow(null),
    rsvpLink: Joi.string().allow(null),
    location: Joi.string().allow(null),
    description: Joi.string().allow(null),
    otherLinks: Joi.object({
      flyerLink: Joi.string().allow(null),
      jobListing: Joi.string().allow(null),
    }).unknown(),
    uid: Joi.string().required(),
  }),
]);

const jobListingDataSchema = Joi.object().pattern(/.*/, [
  Joi.object({
    title: Joi.string().required(),
    timeline: Joi.object({
      openDate: Joi.string().isoDate().allow(null),
      closeDate: Joi.string().isoDate().allow(null),
    }),
    img: Joi.string().allow(null),
    link: Joi.string().allow(null),
    description: Joi.string().allow(null),
    otherLinks: Joi.object({
      flyerLink: Joi.string().allow(null),
    }).unknown(),
    uid: Joi.string().required(),
  }),
]);

const scholarshipDataSchema = Joi.object().pattern(/.*/, [
  Joi.object({
    title: Joi.string().required(),
    timeline: Joi.object({
      openDate: Joi.string().isoDate().allow(null),
      closeDate: Joi.string().isoDate().allow(null),
    }),
    img: Joi.string().allow(null),
    link: Joi.string().allow(null),
    description: Joi.string().allow(null),
    otherLinks: Joi.object().unknown(),
    uid: Joi.string().required(),
  }),
]);

module.exports = {
  "/opportunities/events": eventDataSchema,
  "/opportunities/jobs": jobListingDataSchema,
  "/opportunities/scholarships": scholarshipDataSchema,
  "/opportunities": Joi.object({
    events: eventDataSchema,
    jobs: jobListingDataSchema,
    scholarships: scholarshipDataSchema,
  }),
};
