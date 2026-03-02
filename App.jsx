import React, { useEffect, useMemo, useState } from 'react';
import { content } from './content';



const defaults = {
  workshopName: 'Huggers Womens AA Meeting',
  hostLine: 'Join us!',
  scheduleLine: 'Every Tuesday & Thursday at 6:30 PM Pacific',
  startDateLine: 'Set your start date',
  commitmentLine: 'Open-ended',
  timezone: 'America/Los_Angeles',
  meetingWeekday: 2,
  meetingHour: 18,
  meetingMinute: 30,
  zoomId: '81858307289',
  zoomPasscode: '411108',
  workbookLink: 'https://www.aa.org/daily-reflections',
  dailyReflectionsUrl: 'https://www.aa.org/daily-reflections',
  calendarStartUtc: '20260305T030000Z',
  calendarEndUtc: '20260305T043000Z',
  calendarRrule: 'RRULE:FREQ=WEEKLY;BYDAY=WE',
  contact1Name: 'Contact 1',
  contact1PhoneDisplay: '(000) 000-0000',
  contact1PhoneTel: '+10000000000',
  contact2Name: 'Contact 2',
  contact2PhoneDisplay: '(000) 000-0000',
  contact2PhoneTel: '+10000000001',
  heroImage: '/banner.jpg',
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

const safeContent = {
  ...defaults,
  ...(content ?? {}),
  theme: {
    ...defaults.theme,
    ...((content ?? {}).theme ?? {}),
  },
};

const WORKSHOP_NAME = safeContent.workshopName;
const HOST_LINE = safeContent.hostLine;
const SCHEDULE_LINE = safeContent.scheduleLine;
const START_DATE_LINE = safeContent.startDateLine;
const COMMITMENT_LINE = safeContent.commitmentLine;

const TIMEZONE = safeContent.timezone;
const MEETING_WEEKDAYS = (() => {
  const raw = safeContent.meetingWeekday;
  const values = Array.isArray(raw) ? raw : [raw];

  return values
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value >= 0 && value <= 6);
})();
const MEETING_HOUR = Number(safeContent.meetingHour);
const MEETING_MINUTE = Number(safeContent.meetingMinute);

const CONTACT_1_NAME = safeContent.contact1Name;
const CONTACT_1_PHONE_DISPLAY = safeContent.contact1PhoneDisplay;
const CONTACT_1_PHONE_TEL = safeContent.contact1PhoneTel;
const CONTACT_2_NAME = safeContent.contact2Name;
const CONTACT_2_PHONE_DISPLAY = safeContent.contact2PhoneDisplay;
const CONTACT_2_PHONE_TEL = safeContent.contact2PhoneTel;
const HERO_IMAGE = safeContent.heroImage;
const HERO_IMAGE_VERSION = import.meta.env.VITE_BUILD_TS ?? safeContent.heroImageVersion ?? '1';
const HERO_IMAGE_URL = `${HERO_IMAGE}${String(HERO_IMAGE).includes('?') ? '&' : '?'}v=${encodeURIComponent(String(HERO_IMAGE_VERSION))}`;

const ZOOM_ID = safeContent.zoomId;
const ZOOM_PASSCODE = safeContent.zoomPasscode;
const ZOOM_LINK = `https://us02web.zoom.us/j/${ZOOM_ID}?pwd=${encodeURIComponent(ZOOM_PASSCODE)}`;
const WORKBOOK_LINK = safeContent.workbookLink;
const DAILY_REFLECTIONS_URL = safeContent.dailyReflectionsUrl;
const DAILY_REFLECTIONS_EMBED_HTML = (safeContent.dailyReflectionsEmbedHtml ?? '').trim();

function formatMeetingTime(hour24, minute) {
  const safeHour = Number.isFinite(hour24) ? Math.max(0, Math.min(23, hour24)) : 18;
  const safeMinute = Number.isFinite(minute) ? Math.max(0, Math.min(59, minute)) : 30;
  const suffix = safeHour >= 12 ? 'PM' : 'AM';
  const hour12 = safeHour % 12 === 0 ? 12 : safeHour % 12;
  return `${hour12}:${String(safeMinute).padStart(2, '0')} ${suffix}`;
}

const DISPLAY_TIME = formatMeetingTime(MEETING_HOUR, MEETING_MINUTE);



const CALENDAR_TITLE = WORKSHOP_NAME;
const CALENDAR_DETAILS = `${HOST_LINE}\nZoom ID: ${ZOOM_ID}\nPasscode: ${ZOOM_PASSCODE}\nJoin: ${ZOOM_LINK}`;
const CALENDAR_LOCATION = `Zoom (ID ${ZOOM_ID})`;
const CALENDAR_START_UTC = safeContent.calendarStartUtc;
const CALENDAR_END_UTC = safeContent.calendarEndUtc;
const CALENDAR_RRULE = safeContent.calendarRrule;

const GOOGLE_CAL_LINK =
  `https://calendar.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(CALENDAR_TITLE)}` +
  `&dates=${CALENDAR_START_UTC}/${CALENDAR_END_UTC}` +
  `&recur=${encodeURIComponent(CALENDAR_RRULE)}` +
  `&details=${encodeURIComponent(CALENDAR_DETAILS)}` +
  `&location=${encodeURIComponent(CALENDAR_LOCATION)}` +
  `&ctz=${encodeURIComponent(TIMEZONE)}`;

const WEEKDAY_INDEX = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getLosAngelesParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const lookup = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));

  return {
    weekdayName: lookup.weekday,
    weekday: WEEKDAY_INDEX[lookup.weekday],
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    hour: Number(lookup.hour),
    minute: Number(lookup.minute),
    second: Number(lookup.second),
  };}

function getNextMeetingCountdown(laNow, nowDate) {
  const nowSecondsInDay = laNow.hour * 3600 + laNow.minute * 60 + laNow.second;
  const meetingSecondsInDay = MEETING_HOUR * 3600 + MEETING_MINUTE * 60;

  const weekdays = MEETING_WEEKDAYS.length ? MEETING_WEEKDAYS : [2];
  let minTotalSeconds = Number.POSITIVE_INFINITY;

  for (const meetingWeekday of weekdays) {
    let daysUntil = (meetingWeekday - laNow.weekday + 7) % 7;
    if (daysUntil === 0 && nowSecondsInDay >= meetingSecondsInDay) {
      daysUntil = 7;
    }

    let totalSeconds = daysUntil * 86400 + (meetingSecondsInDay - nowSecondsInDay);
    if (totalSeconds < 0) totalSeconds += 7 * 86400;

    if (totalSeconds < minTotalSeconds) {
      minTotalSeconds = totalSeconds;
    }
  }

  const totalSeconds = minTotalSeconds;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const nextDate = getLosAngelesParts(new Date(nowDate.getTime() + totalSeconds * 1000));

  return { days, hours, minutes, nextDate };
}

function App() {
  const [now, setNow] = useState(() => new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = safeContent.theme;
    root.style.setProperty('--hero-image-url', `url('${HERO_IMAGE_URL}')`);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--paper', theme.paper);
    root.style.setProperty('--card', theme.card);
    root.style.setProperty('--card-2', theme.card2);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-2', theme.accent2);
    root.style.setProperty('--border', theme.border);
  }, []);

  const laNow = useMemo(() => getLosAngelesParts(now), [now]);
  const countdown = useMemo(() => getNextMeetingCountdown(laNow, now), [laNow, now]);

  const nextMeetingLabel = `${countdown.nextDate.weekdayName}, ${String(countdown.nextDate.month).padStart(2, '0')}/${String(
    countdown.nextDate.day
  ).padStart(2, '0')}/${countdown.nextDate.year} at ${DISPLAY_TIME} Pacific`;

  function copyZoomInfo() {
    const text = `${WORKSHOP_NAME}\n${SCHEDULE_LINE}\nZoom ID: ${ZOOM_ID}\nPasscode: ${ZOOM_PASSCODE}\nJoin: ${ZOOM_LINK}`;

    if (!navigator?.clipboard?.writeText) {
      window.prompt('Copy this workshop info:', text);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {
        window.prompt('Copy this workshop info:', text);
      });
  }

  return (
    <div className="page">
      <header className="hero" role="banner">
        <img className="hero-image" src={HERO_IMAGE_URL} alt="Workshop banner" />
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-glass">
              <p className="eyebrow">Tuesday & Thursday</p>
              <h1>{WORKSHOP_NAME}</h1>
              <p className="subtitle">{HOST_LINE} · {SCHEDULE_LINE}</p>

              <div className="actions">
                <a className="btn btn-primary" href={ZOOM_LINK} target="_blank" rel="noreferrer">
                  Join Zoom
                </a>
                <button type="button" className="btn btn-ghost" onClick={copyZoomInfo}>
                  <svg className="btn-inline-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      fill="currentColor"
                      d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1Zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9v14Z"
                    />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Zoom Info'}
                </button>
                <details className="calendar-dropdown">
                  <summary className="btn btn-ghost calendar-trigger">
                    Add to Calendar <span className="caret" aria-hidden="true">▾</span>
                  </summary>
                  <div className="calendar-menu">
                    <a href={GOOGLE_CAL_LINK} target="_blank" rel="noreferrer">
                      Google Calendar
                    </a>
                    <a href="/workshop.ics" target="_blank" rel="noreferrer">
                      Apple / Other
                    </a>
                  </div>
                </details>
                <a className="btn btn-ghost" href={WORKBOOK_LINK} target="_blank" rel="noreferrer">
                  Daily Reflections
                </a>
              </div>

              <div className="countdown" role="status" aria-live="polite">
                <p className="countdown-title">next Meeting</p>
                <p className="countdown-time">
                  {countdown.days}d {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m
                </p>
                <p className="countdown-label">{nextMeetingLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="card details">
          <h2>Meeting Details</h2>

          <div className="detail-grid">
            <article className="detail-item">
              <p className="detail-label">Schedule</p>
              <p className="detail-value">{SCHEDULE_LINE.replace(' at', ' ·')}</p>
            </article>
            <article className="detail-item">
              <p className="detail-label">Start Date</p>
              <p className="detail-value">{START_DATE_LINE}</p>
            </article>
            <article className="detail-item">
              <p className="detail-label">Commitment</p>
              <p className="detail-value">{COMMITMENT_LINE}</p>
            </article>
            <article className="detail-item">
              <p className="detail-label">Zoom</p>
              <p className="detail-value">ID {ZOOM_ID} · Passcode {ZOOM_PASSCODE}</p>
            </article>
          </div>

          <div className="detail-section">
            <h3>Questions or Concerns</h3>
            <div className="contact-lines">
              <a href={`tel:${CONTACT_1_PHONE_TEL}`}>{CONTACT_1_NAME} · {CONTACT_1_PHONE_DISPLAY}</a>
              <a href={`tel:${CONTACT_2_PHONE_TEL}`}>{CONTACT_2_NAME} · {CONTACT_2_PHONE_DISPLAY}</a>
            </div>
          </div>

          <div className="detail-section">
            <h3>Workbook</h3>
            <a href={WORKBOOK_LINK} target="_blank" rel="noreferrer">
              Download workbook
            </a>
          </div>
        </section>

        <section className="card week-update">
          <h2>Weekly Update</h2>
          <p>
            Share what your group covered this week and what members should do before the next meeting.
          </p>

          <h3>Before Next Week (Template)</h3>
          <ul>
            <li>Reading assignment #1</li>
            <li>Writing/reflection assignment #1</li>
            <li>Optional prompt or journaling exercise</li>
          </ul>
        </section>

        <section className="card week-update">
          <h2>Daily Reflection</h2>
          {DAILY_REFLECTIONS_EMBED_HTML ? (
            <div dangerouslySetInnerHTML={{ __html: DAILY_REFLECTIONS_EMBED_HTML }} />
          ) : (
            <>
              <p>
                Paste embed code into <strong>dailyReflectionsEmbedHtml</strong> in content.js,
                or open today&apos;s reflection directly:
              </p>
              <p style={{ marginTop: '0.65rem' }}>
                <a href={DAILY_REFLECTIONS_URL} target="_blank" rel="noreferrer">
                  Open AA Daily Reflections
                </a>
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
