const _ = require("lodash");
const {
  calendarRequest,
  gCalId,
  gCalEvent,
  calendars,
} = require("../../config/gcp/gcp-calendar");
const { isEmpty } = require("../../util/util");

const CALENDAR_MAPPING = {
  confirmed: calendars.HACS,
  potential: calendars.Potential,
};

const DEFAULT_STATES = { confirmed: false, potential: false };

// For HTTPS requests, refer to https://github.com/googleapis/gaxios for request options

// Format body with event api https://developers.google.com/calendar/api/v3/reference/events

// SAFEST function to use when adding to calendar
async function safeUpdateEvent(event, firebaseAdmin, options) {
  event.gCal = event.gCal ?? DEFAULT_STATES;
  const currStates = event.gCal;

  // Must run async prior to updating DB with newer GCal states
  const prevStates = await firebaseAdmin.adminDB
    .ref(`events/${event.uid}/gCal`)
    .once("value")
    .then((snapshot) =>
      isEmpty(snapshot.val()) ? DEFAULT_STATES : snapshot.val()
    )
    .catch(() => DEFAULT_STATES);

  Object.keys(currStates).forEach((state) => {
    currState = currStates[state];
    if (currState === prevStates[state]) {
      // Same state, updating calendar event
      return currState ? updateEvent(event, assignCalendar(state)) : null;
    } else if (currState) {
      // Adding to calendar
      return addEvent(event, assignCalendar(state));
    } else {
      // Removing from calendar
      return removeEvent(event, assignCalendar(state));
    }
  });
}

async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

async function getEvent(event, calendar) {
  const requestOptions = {
    method: "GET",
    id: gCalId(event.uid),
    calendar: calendars.Test,
  };
  return calendarRequest(requestOptions);
}

async function addEvent(event, calendar) {
  const requestOptions = {
    method: "POST",
    data: gCalEvent(event),
    calendar,
  };
  return calendarRequest(requestOptions).then((code) => {
    if (code == 409) {
      return updateEvent(event, calendar);
    }
  });
}

async function removeEvent(event, calendar) {
  const requestOptions = {
    method: "DELETE",
    id: gCalId(event.uid),
    calendar,
  };
  return calendarRequest(requestOptions);
}

async function updateEvent(event, calendar) {
  const requestOptions = {
    method: "PUT",
    id: gCalId(event.uid),
    data: gCalEvent(event),
    calendar,
  };
  return calendarRequest(requestOptions);
}

function assignCalendar(state) {
  return CALENDAR_MAPPING[state] ?? null;
}

module.exports = {
  getAllEvents,
  getEvent,
  safeUpdateEvent,
  addEvent,
  removeEvent,
  updateEvent,
};
