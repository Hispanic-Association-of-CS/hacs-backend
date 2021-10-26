const { calendarRequest, calendars } = require("../config/gcp-calendar");

// For HTTPS requests, refer to https://github.com/googleapis/gaxios for request options

// Format body with event api https://developers.google.com/calendar/api/v3/reference/events

async function addEvent(requestBody) {
  sampleRequestBody = {
    summary: "HACS Fall Kickoff",
    start: {
      dateTime: "2021-09-01T00:00:00.000Z",
    },
    end: {
      dateTime: "2021-09-01T01:30:00.000Z",
    },
    attachments: [],
    description:
      "You don't have to be a CS major or Hispanic to be part of HACS! Anyone that has an interest in diversity and tech is welcome.\n\nThis event will take place at the Gates Dell Complex (CS building) in room GDC 1.304",
    location: "GDC 1.3044",
    organizer: {
      email: "personal-gmail@gmail.com",
      displayName: "John Doe",
      self: true,
    },
  };

  const addEventRequestOptions = {
    method: "POST",
    data: { ...requestBody },
  };

  return calendarRequest(calendars.Test, addEventRequestOptions);
}

async function removeEvent(event) {
  removeEventRequestOptions = {};
  calendarRequest(calendars.Test, requestOptions);
}

async function updateEvent(event) {
  updateEventRequestOptions = {};
  calendarRequest(calendars.Test, requestOptions);
}

async function getAllEvents() {
  events = await calendarRequest(calendars.Test);
  console.log(events);
}

module.exports = {
  addEvent,
  removeEvent,
  updateEvent,
  getAllEvents,
};
