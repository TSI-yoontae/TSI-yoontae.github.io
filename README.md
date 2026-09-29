# Time Series Intelligence Lab

Public website for TSI Lab, Pusan National University: https://tsi-yoontae.github.io/

## Editing and publishing

1. Install Node.js, then run `npm ci`.
2. Edit the source files listed below.
3. Run `npm run build`. This creates the production bundle and updates the JavaScript and CSS cache versions in `index.html`.
4. Commit the source changes **and** the generated `site.bundle.js` and `index.html`. GitHub Pages serves these files directly; it does not run the build.

Use `npm run dev` to build and start a local preview at http://127.0.0.1:8765. After editing, run `npm run build` in another terminal and reload the preview.

## Where content lives

- `js/data.js`: news, publications, working papers, and member information.
- `js/tabs/Project.js`: funding/project records and project display.
- `js/tabs/Home.js`: research directions and selected papers, including seminar links.
- `js/tabs/Teaching.js`: courses and teaching materials.
- `js/tabs/ForStudents.js`: books and research resources.
- `js/tabs/Vacant.js`: admission policies and English/Korean profile copy.
- `js/tabs/ResearchExplorer.js`: research filters, independently scrollable paper list/details, and an accessible figure enlargement dialog.
- `js/figures.js`: representative figure metadata keyed by exact paper title. Store images in `figures/` and record their original source in `figures/README.md`.
- `js/tabs/YearInReview.js`: annual views derived from the shared records.
- `js/shared.js`, `js/main.js`, and `styles.css`: shared components, navigation, and responsive styling.

## Annual review rules

The annual record begins in 2025. Conference papers exclude workshops; journals are counted separately. A project is included whenever its period overlaps the selected year, including participating researcher roles. Funding amounts represent the full project period, not an annual total. Organizer roles use the announcement year in the news record and link to the workshop website.

## Interface

The site preserves hash routes, including `#publications`, `#vacant`, and `#year-in-review`. Research-direction links can prefill publication searches with `#publications?q=Portfolio`. The responsive menu, filters, disclosures, and language controls support keyboard access; animation respects reduced-motion preferences. React is bundled locally, so no runtime Babel or Tailwind CDN is required.

Research Explorer shows verified paper figures or clearly attributed author research illustrations. It omits figures and placeholders for working papers without a public manuscript link, even when a code repository is available. Students are displayed as text profiles without portraits or avatar placeholders. Page headings omit promotional subtitles.

The interface uses an ivory canvas, warm white reading panels, and charcoal navigation. News and other content lists use a uniform warm white background; date columns and other metadata panels retain their shading. Publications and projects separate metadata from reading content. On phones, these columns become stacked records. Selected publications follow the news in the primary home column. Filter selection changes without a color fade to preserve legibility during interaction.

Research Explorer provides Papers and TSI / Terminal views; switching views preserves the paper filters and selection. Its terminal adapts the Forecast, Allocate, and Order book canvas simulations from the HTML reference supplied by the site owner in September 2026. `js/terminal-engine.js` contains the simulations and drawing code; `js/ResearchTerminal.js` provides React lifecycle management, keyboard tabs, and playback controls. All chart data is synthetic and generated locally. Animation pauses outside the viewport or in a hidden tab, starts paused when reduced motion is preferred, and can be paused manually. Arrow keys inspect the chart, and Enter resamples a forecast. The terminal runs only while its view is open. No live market feed or external script is used.
