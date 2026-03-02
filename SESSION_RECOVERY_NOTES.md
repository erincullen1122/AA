# Session Recovery Notes (Mar 2, 2026)

## What happened

- Local edits were deployed to Vercel from Codespace using `npm run deploy:prod`.
- Those edits were not committed/pushed to GitHub first.
- Codespace was closed, so uncommitted local state became hard to recover.

## Why GitHub and Vercel diverged

- `vercel --prod` deploys your local working directory.
- It does **not** automatically commit or push to GitHub.
- Result: Vercel had newer deployed output than GitHub `main`.

## Recovery actions completed

1. Restored live domain to recovered production deployment.
2. Created backup branch and pushed it.
3. Fast-forwarded `main` to recovery commit and pushed.
4. Enabled automatic checkpoint workflow.

## Current safety setup

- Manual checkpoint command:

```bash
npm run checkpoint
```

- Auto checkpoint every 10 minutes:

```bash
npm run checkpoint:watch:10
```

- Deploy command now checkpoints before deploy:

```bash
npm run deploy:prod
```

## Working routine (recommended)

1. Start watcher once per Codespace session:

```bash
npm run checkpoint:watch:10
```

2. Do your edits as normal.
3. Deploy when ready:

```bash
npm run deploy:prod
```

4. If Codespace restarts, start watcher again.

## Useful verification commands

```bash
git status -sb
git log --oneline -n 5
git rev-parse --short HEAD
git rev-parse --short origin/main
```

If `HEAD` and `origin/main` are the same commit hash, GitHub is synced.
