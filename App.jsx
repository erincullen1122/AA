import React, { useEffect, useMemo, useState } from 'react';

const TIMEZONE = 'America/Los_Angeles';
const MEETING_WEEKDAY = 3; // Wednesday (Sun=0)
const MEETING_HOUR = 19;
const MEETING_MINUTE = 0;

// ── Template values: update these for your meeting ───────────────────────
const WORKSHOP_NAME = 'Your AA Workshop Name';
const HOST_LINE = 'Hosted by Host 1 & Host 2';
const SCHEDULE_LINE = 'Every Wednesday at 7:00 PM Pacific';
const START_DATE_LINE = 'Set your start date';
const COMMITMENT_LINE = 'Open-ended';

const ZOOM_ID = '1234567890';
const ZOOM_PASSCODE = 'CHANGE_ME';
const ZOOM_LINK = `https://us02web.zoom.us/j/${ZOOM_ID}?pwd=${encodeURIComponent(ZOOM_PASSCODE)}`;
const WORKBOOK_LINK = 'https://example.com/workbook-link';

const CONTACT_1_NAME = 'Host 1';
const CONTACT_1_PHONE_DISPLAY = '(000) 000-0000';
const CONTACT_1_PHONE_TEL = '+10000000000';
const CONTACT_2_NAME = 'Host 2';
const CONTACT_2_PHONE_DISPLAY = '(000) 000-0000';
const CONTACT_2_PHONE_TEL = '+10000000000';

const CALENDAR_TITLE = WORKSHOP_NAME;
const CALENDAR_DETAILS = `${HOST_LINE}\nZoom ID: ${ZOOM_ID}\nPasscode: ${ZOOM_PASSCODE}\nJoin: ${ZOOM_LINK}`;
const CALENDAR_LOCATION = `Zoom (ID ${ZOOM_ID})`;
const CALENDAR_START_UTC = '20260305T030000Z'; // Example: Wednesday 7:00 PM Pacific
const CALENDAR_END_UTC = '20260305T043000Z'; // Example: 8:30 PM Pacific
const CALENDAR_RRULE = 'RRULE:FREQ=WEEKLY;BYDAY=WE';

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

  let daysUntil = (MEETING_WEEKDAY - laNow.weekday + 7) % 7;
  if (daysUntil === 0 && nowSecondsInDay >= meetingSecondsInDay) {
    daysUntil = 7;
  }

  let totalSeconds = daysUntil * 86400 + (meetingSecondsInDay - nowSecondsInDay);
  if (totalSeconds < 0) totalSeconds += 7 * 86400;

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

  const laNow = useMemo(() => getLosAngelesParts(now), [now]);
  const countdown = useMemo(() => getNextMeetingCountdown(laNow, now), [laNow, now]);

  const nextMeetingLabel = `${countdown.nextDate.weekdayName}, ${String(countdown.nextDate.month).padStart(2, '0')}/${String(
    countdown.nextDate.day
  ).padStart(2, '0')}/${countdown.nextDate.year} at 7:00 PM Pacific`;

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
        <img className="hero-image" src="/banner.jpg" alt="Workshop banner" />
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-glass">
              <p className="eyebrow">Weekly AA Workshop</p>
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
                  Workbook
                </a>
              </div>

              <div className="countdown" role="status" aria-live="polite">
                <p className="countdown-title">Next workshop</p>
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
      </main>
    </div>
  );
}

export default App;
