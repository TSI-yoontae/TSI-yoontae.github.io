# Time Series Intelligence Lab

Public website for TSI Lab, Pusan National University: https://tsi-yoontae.github.io/

The site is one static page, `index.html`, with no build step. GitHub Pages serves it directly from `main`.

## Editing content

All content lives in the `window.TSI` block of `index.html` (search for `CONTENT — edit this block`):

- `news`: lab news. `tag` and `short` feed the scrolling ticker; entries with `organizing` count as workshop organizer roles.
- `publications`, `workingPapers`: the paper archive. The first letter of `id` sets the type (C conference, J journal, S submitted, W work in progress).
- `selected`, `pillars`: selected papers and research lines on the home page.
- `members`, `projects`, `courses`, `reading`, `vacancy` (English/Korean), `principles`, `targetVenues`.

Commit the edited `index.html`; the change is live once GitHub Pages redeploys.

## Local preview

```
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765.

## Annual review rules

The annual record begins at `reviewStartYear` (2025). Conference papers exclude workshops; journals are counted separately. A project counts in every year its period overlaps, including participating researcher roles. Funding amounts represent the full project period. Organizer roles use the announcement year in the news record.

## Interface

- Routes: `#/publications`, `#/people`, `#/teaching`, `#/funding`, `#/review`, `#/join`. Old links (`#members`, `#publications`, `#vacant`, `#project`, `#for-students`, `#year-in-review`) redirect to the new routes, and `#/publications?q=Portfolio` pre-fills the paper search.
- `Ctrl K` / `⌘K` (or `/`) opens site-wide search.
- The hero terminal (Forecast, Allocate, Order book) draws simulated data generated in the browser and is labeled as such.
- Animations respect reduced-motion preferences.
- Images, `ppt/`, `js/tabs/convex/` and `figures/` stay where they are.
