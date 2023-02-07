import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Morning event',
//     start: TODAY_STR + 'T00:00:00',
//     end: TODAY_STR + 'T02:30:00'
//   },
//   {
//     id: createEventId(),
//     title: 'Afternoon event',
//     start: TODAY_STR + 'T12:00:00',
//     end: TODAY_STR + 'T16:40:00',
//     startEditable : true,
//     backgroundColor: "#015d4b",
//     textColor : "white"
//   }
// ];

// export function createEventId() {
//   return String(eventGuid++);
// }