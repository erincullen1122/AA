# AA Workshop Landing Page Template

A reusable Vite + React landing page template for AA workshop/meeting announcements.

## Quick start

```bash
npm install
npm run dev
```

## Customize

Update values in `src/App.jsx` under:

```js
// ── Template values: update these for your meeting ──
```

Key fields:
- `WORKSHOP_NAME`
- `HOST_LINE`
- `SCHEDULE_LINE`
- `START_DATE_LINE`
- `COMMITMENT_LINE`
- `ZOOM_ID`, `ZOOM_PASSCODE`
- `WORKBOOK_LINK`
- contact names + phone numbers

Also update:
- `public/workshop.ics` for recurring calendar rules and meeting metadata
- `index.html` metadata (title/description/OG tags)
- `public/banner.jpg` to your own image

## Deploy (Vercel)

```bash
npx vercel
npx vercel --prod
```

## Notes

- This is a front-end template only.
- Safe to copy into another GitHub account and deploy independently.
