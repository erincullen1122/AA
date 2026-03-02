const AA_ENDPOINT_BASE = 'https://www.aa.org/api/reflections';
const TIMEZONE = 'America/Los_Angeles';

function getLosAngelesMonthDay() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    month: '2-digit',
    day: '2-digit',
  });

  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]));
  return { month: parts.month, day: parts.day };
}

function decodeEntities(value = '') {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function htmlToText(html = '') {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractReflection(html = '') {
  const titleMatch = html.match(/field--name-title[\s\S]*?>([^<]+)<\/span>/i);
  const dateMatch = html.match(/<div>\s*([A-Za-z]+\s+\d{2})\s*<\/div>/i);
  const bodyMatch = html.match(/field--name-body[\s\S]*?field__item\">([\s\S]*?)<\/div>\s*<div class=\"field field--name-field-copyright/i);

  const rawBody = bodyMatch?.[1] ?? html;

  const paragraphMatches = [...rawBody.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => htmlToText(match[1])).filter(Boolean);

  const fullText = paragraphMatches.length ? paragraphMatches.join('\n\n') : htmlToText(rawBody);

  return {
    title: titleMatch ? htmlToText(titleMatch[1]) : 'Daily Reflection',
    dateLabel: dateMatch ? htmlToText(dateMatch[1]) : '',
    fullText,
  };
}

export default async function handler(req, res) {
  try {
    const { month, day } = getLosAngelesMonthDay();
    const upstreamUrl = `${AA_ENDPOINT_BASE}/${month}/${day}`;

    const upstream = await fetch(upstreamUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'AA-Workshop-Site/1.0',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return res.status(502).json({
        error: 'Unable to fetch reflection from upstream source.',
      });
    }

    const payload = await upstream.json();
    const reflection = extractReflection(payload?.data ?? '');

    return res.status(200).json({
      ...reflection,
      sourceUrl: 'https://www.aa.org/daily-reflections',
      month,
      day,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to load daily reflection.',
    });
  }
}