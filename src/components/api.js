import { mockEvents } from "./mock-data";


/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const getEvents = async () => {
  return mockEvents;
}

export const extractLocations = (events) => {
  let extractLocations = events.map((event) => event.location);
  let locations = [...new Set(extractLocations)];
  return locations;
}

// export const extractDetails = (events) => {
//   let extractDetails = events.map((event) => event.description);
//   let details = [...new Set(extractDetails)];
//   return details;
// }

// export const extractStartTime = (events) => {
//   let extractStartTime = events.map((event) => (event.start.dateTime + ' ' + event.start.timeZone));
//   let startTime = [...new Set(extractStartTime)];
//   return startTime;
// }

// export const extractTitle = (events) => {
//   let extractTitle = events.map((event) => event.summary);
//   let title = [...new Set(extractTitle)];
//   return title;
// }

// export const extractGoogleLink = (events) => {
//   let extractGoogleLink = events.map((event) => event.summary);
//   let googleLink = [...new Set(extractGoogleLink)];
//   return googleLink;
// }