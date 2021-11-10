const {
  calendarRequest,
  gCalId,
  gCalEvent,
  calendars,
} = require("../config/gcp-calendar");

// For HTTPS requests, refer to https://github.com/googleapis/gaxios for request options

// Format body with event api https://developers.google.com/calendar/api/v3/reference/events

async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

async function getEvent(id) {
  const requestOptions = {
    method: "GET",
    id: gCalId(id),
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

async function addEvent(event) {
  const requestOptions = {
    method: "POST",
    data: gCalEvent(event),
    calendar: calendars.Test,
  };

  return calendarRequest(requestOptions);
}

async function removeEvent(id) {
  const requestOptions = {
    method: "DELETE",
    id: gCalId(id),
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

async function updateEvent(id, event) {
  const requestOptions = {
    method: "PUT",
    id: gCalId(id),
    data: gCalEvent(event),
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

module.exports = {
  getAllEvents,
  getEvent,
  addEvent,
  removeEvent,
  updateEvent,
};
