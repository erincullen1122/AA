export const content = {
  // ===== TEXT YOU'LL CHANGE MOST OFTEN =====
  workshopName: 'Huggers Womens AA Meeting',
  hostLine: 'Join us!',
  scheduleLine: 'Every Tuesday & Thursday at 6:30 PM Pacific',
  startDateLine: 'Set your start date',
  commitmentLine: 'Open-ended',

  // ===== TIME SETTINGS =====
  // meetingWeekday: Sunday=0, Monday=1, Tuesday=2 ... Saturday=6
  timezone: 'America/Los_Angeles',
  meetingWeekday: [2, 4],
  meetingHour: 18,
  meetingMinute: 30,

  // ===== LINKS =====
  zoomId: '81858307289',
  zoomPasscode: '411108',
  workbookLink: 'https://www.aa.org/daily-reflections',

  // ===== CALENDAR EXPORT =====
  calendarStartUtc: '20260305T030000Z',
  calendarEndUtc: '20260305T043000Z',
  calendarRrule: 'RRULE:FREQ=WEEKLY;BYDAY=TU,TH',

  // ===== CONTACTS =====
  contact1Name: 'Contact 1',
  contact1PhoneDisplay: '(000) 000-0000',
  contact1PhoneTel: '+10000000000',
  contact2Name: 'Contact 2',
  contact2PhoneDisplay: '(000) 000-0000',
  contact2PhoneTel: '+10000000001',

  // ===== IMAGE =====
  // Put your image in /public and point to it like '/my-banner.jpg'
  heroImage: '/banner.jpg',

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
