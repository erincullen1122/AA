# AA Workshop Landing Page Template

A reusable Vite + React landing page template for AA workshop/meeting announcements.

## Quick start

```bash
npm install
npm run dev
```

## Customize

For text-only edits, update values in `content.js`.

Key fields:
- `workshopName`
- `hostLine`
- `scheduleLine`
- `startDateLine`
- `commitmentLine`
- `zoomId`, `zoomPasscode`
- `workbookLink`
- `dailyReflectionsEmbedHtml` (paste iframe/embed code here)
- contact names + phone numbers
- `heroImage` (banner image path)
- `theme` (site color values)

Also update:
- `public/workshop.ics` for recurring calendar rules and meeting metadata
- `index.html` metadata (title/description)
- files in `public/` when you want different images

## Safe editing workflow

1. Edit only `content.js` for wording changes.
2. Save and verify the page refreshes.
3. If something breaks, undo the last change in `content.js`.

Avoid editing `App.jsx` unless you are changing layout/logic.

## Common changes

- Change tab title: edit `<title>` in `index.html`
- Change hero image: put image in `public/` and set `heroImage` in `content.js`
- Change colors: edit the `theme` object in `content.js`

Banner updates are cache-busted automatically on every `build`/`deploy`, so you usually do not need to change `heroImageVersion` manually.

## Deploy (Vercel)

```bash
npm run deploy:prod
```

`deploy:prod` now runs an automatic Git checkpoint first, then a build check, then deploys.

## Auto-checkpoint safety (recommended)

Create a manual checkpoint anytime:

```bash
npm run checkpoint
```

Run automatic checkpoints every 10 minutes while you edit:

```bash
npm run checkpoint:watch:10
```

This makes a commit and pushes only when there are real changes.

## Notes

- This is a front-end template only.
- Safe to copy into another GitHub account and deploy independently.
