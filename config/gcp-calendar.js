const { GoogleAuth } = require("google-auth-library");

const serviceAccountCredentials = require("../.secrets/hacs-gcp-service-account-credentials.json");
const client = new GoogleAuth().fromJSON(serviceAccountCredentials);
client.scopes = ["https://www.googleapis.com/auth/calendar"];

const calendars = {
  HACS: "texashacs@gmail.com",
  Test: "8fcdqv67fu39spbejs2kdf7qjg@group.calendar.google.com",
};

async function getAllEventsRequest(calendar) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`;
  const res = await client.request({ url });
  console.log(res.data);
}

async function calendarRequest(calendar, requestOptions) {
  requestOptions.url = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`;
  const res = await client.request(requestOptions);
  return res.data.id;
}

module.exports = { getAllEventsRequest, calendarRequest, calendars };
