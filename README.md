# CourseFlow Portfolio

Project owner: **[Janon7300](https://github.com/Janon7300)**

A reduced, frontend-only portfolio demonstration of a learning-progress planner.
This is not the production application.

## Included

- Responsive Thai interface with light and dark themes
- Local, interactive progress calculation with automated tests
- Twelve independently invented courses, all prefixed with `DEMO-`
- Owner credit in this README, the website footer and the About page

## Deliberately excluded

No real institution or curriculum records, student records, uploaded documents,
external forms, authentication, database, server API, analytics, credentials,
AI integrations, provider prompts or conversation records.

Course selections exist in memory only and reset on refresh.
Only the display theme is stored on the device. The app does not transmit learner data.
Hosting providers may independently retain access logs.

## Run and test

Requires Node.js 24 or later.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run audit:release
npm run build
```

## Ownership and third-party components

Copyright © 2026 Janon7300. All rights reserved for original project material.
No open-source license is granted for that material by this repository.
Third-party dependencies remain subject to their own licenses; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The GitHub account name is intentionally public attribution. This repository is
not anonymous. Scans reduce risk but cannot prove that no observer could ever
associate the design or account with other work.
