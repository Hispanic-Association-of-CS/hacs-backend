const { GoogleAuth } = require("google-auth-library");

const serviceAccountCredentials = require("../.secrets/hacs-gcp-service-account-credentials.json");
const client = new GoogleAuth().fromJSON(serviceAccountCredentials);
client.scopes = ["https://www.googleapis.com/auth/calendar"];

const calendars = {
  HACS: "texashacs@gmail.com",
  Test: "8fcdqv67fu39spbejs2kdf7qjg@group.calendar.google.com",
};

const calendarRequest = async (options) => {
  method = options["method"] ? options["method"] : "GET";
  id = options["id"] ? options["id"] : null;
  data = options["data"] ? options["data"] : null;
  calendar = options["calendar"] ? options["calendar"] : calendars.HACS;

  const url = calendarApiEndpoint(calendar, id);
  const requestOptions = { url, method, data };
  return client
    .request(requestOptions)
    .then((res) => res.data.id)
    .catch((e) => console.log("Had trouble with calendar connection."));
};

const calendarApiEndpoint = (calendar, id) => {
  return (
    "https://www.googleapis.com/calendar/v3/calendars/" +
    calendar +
    "/events" +
    `${id ? "/" + id : ""}`
  );
};

const gCalId = (id) => {
  return id.split("_").join("");
};

const gCalEvent = (event) => {
  const description =
    `<p>${event.description}</p>` +
    `${event.rsvpLink ? `<a href="${event.rsvpLink}">RSVP HERE</a>` : ""}`;
  return {
    id: gCalId(event.uid),
    summary: event.title,
    start: {
      dateTime: event.startTime,
    },
    end: {
      dateTime: event.endTime,
    },
    description,
    location: event.meetingLink ?? event.location,
    attachments: [],
    source: {
      title: "Texas HACS",
      url: "https://texashacs.org/opportunities",
    },
  };
};

module.exports = { calendarRequest, gCalId, gCalEvent, calendars };
