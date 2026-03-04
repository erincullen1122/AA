export const content = {
  // ===== TEXT YOU'LL CHANGE MOST OFTEN =====
  workshopName: "Huggers Women's AA Meeting",
  siteTitle: "AA Huggers Women's Meeting",
  siteDescription: 'Reusable template for weekly AA workshop landing pages with Zoom info, countdown, and assignments.',

  eyebrowLine: 'Tuesdays & Thursdays',
  scheduleLine: 'Tuesdays & Thursdays 6:30PM - 7:30PM PT',
  startDateLine: 'Ongoing Weekly',
  commitmentLine: 'Women share their experience, strength, and hope. ',
  // ===== TIME SETTINGS =====
  // meetingWeekday: Sunday=0, Monday=1, Tuesday=2 ... Saturday=6
  timezone: 'America/Los_Angeles',
  meetingWeekday: [2, 4],
  meetingHour: 18,
  meetingMinute: 30,

  // ===== LINKS =====
  zoomId: '81858307289',
  zoomPasscode: '411108',
  dailyReflectionsUrl: 'https://www.aa.org/daily-reflections',
  joinZoomLabel: 'Join Zoom',
  copyZoomLabel: 'Copy Zoom Info',
  copiedZoomLabel: 'Copied!',
  addToCalendarLabel: 'Add to Calendar',
  dailyReflectionsLabel: 'Daily Reflections',
  heroImageAlt: 'Workshop banner',
  // Paste iframe/embed HTML here when available.
  // Example: '<iframe src="https://example.com" height="600" loading="lazy"></iframe>'
  dailyReflectionsEmbedHtml: '',

  // ===== CALENDAR EXPORT =====
  calendarStartUtc: '20260305T030000Z',
  calendarEndUtc: '20260305T043000Z',
  calendarRrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,TH',
  calendarSummary: 'Huggers Women's AA Meeting',
  calendarDescription: '\nZoom ID: 81858307289\nPasscode: 411108',
  calendarLocation: 'Zoom (ID 81858307289)',

  // ===== CONTACTS =====


  // ===== IMAGE =====
  // Put your image in /public and point to it like '/newbanner.jpg'
  heroImage: '/newbannerV2.jpg',
  // Optional manual override. Usually not needed because deploy now auto-busts cache.
  heroImageVersion: '2026-03-02-4',

  // ===== COLORS (OPTIONAL) =====
  // Any value left blank will use existing defaults.
  theme: {
    bg: '#20293a',
    paper: '#efe5d2',
    card: 'rgba(38, 53, 80, 0.78)',
    card2: 'rgba(31, 45, 69, 0.72)',
    text: '#f7f2e8',
    muted: '#dfd2bc',
    accent: '#74b6ff',
    accent2: '#3f8ee2',
    border: 'rgba(233, 219, 193, 0.26)',
  },
};

export const npmcontent = content;
export default content;
