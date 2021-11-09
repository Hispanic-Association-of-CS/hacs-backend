const Joi = require("joi");
const config = require("../config/config");
const { imageSchema } = require("../schemas/image.schema");

const eventDataSchema = Joi.object({
  title: Joi.string().required(),
  startTime: Joi.string().isoDate().allow(null),
  endTime: Joi.string().isoDate().allow(null),
  image: imageSchema,
  meetingLink: Joi.string().allow(null),
  rsvpLink: Joi.string().allow(null),
  location: Joi.string().allow(null),
  description: Joi.string().allow(null),
  otherLinks: Joi.object({
    flyerLink: Joi.string().allow(null),
    jobListing: Joi.string().allow(null),
  })
    .unknown()
    .allow(null),
  uid: Joi.string().regex(/[a-z]+_[a-z | 0-9]+/),
});

const eventsDataSchema = Joi.object().pattern(/.*/, [eventDataSchema]);

module.exports = {
  eventDataSchema,
  eventsDataSchema,
  allEventSchemas: {
    [`${config.apiUrl}/events`]: eventsDataSchema,
    [`${config.apiUrl}/event`]: eventDataSchema,
    [`${config.apiUrl}/event/:id`]: eventDataSchema,
    [`${config.devApiUrl}/events`]: eventsDataSchema,
    [`${config.devApiUrl}/event`]: eventDataSchema,
    [`${config.devApiUrl}/event/:id`]: eventDataSchema,
  },
};
