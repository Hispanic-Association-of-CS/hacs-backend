const { GoogleAuth } = require("google-auth-library");
const GCPConfig = require("../config").GCP;
const { private_key, client_email } = GCPConfig;
const client = new GoogleAuth({ credentials: { client_email, private_key } });

client.scopes = ["https://www.googleapis.com/auth/calendar"];

const calendars = {
  HACS: "texashacs@gmail.com",
  Potential: "iui9mjasg30rdihuot7um6fad8@group.calendar.google.com",
  Test: "8fcdqv67fu39spbejs2kdf7qjg@group.calendar.google.com",
};

const calendarRequest = async (options) => {
  const method = options["method"] ? options["method"] : "GET";
  const id = options["id"] ? options["id"] : null;
  const data = options["data"] ? options["data"] : null;
  const calendar = options["calendar"] ? options["calendar"] : calendars.HACS;

  const url = calendarApiEndpoint(calendar, id);
  const requestOptions = { url, method, data };
  return client
    .request(requestOptions)
    .then((res) => res.data.id)
    .catch((e) => {
      if (e.code === 409) {
        return e.code;
      }
    });
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
    `<p>${event.description ?? "TBD"}</p>` +
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
