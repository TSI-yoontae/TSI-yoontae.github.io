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
- `js/tabs/Publications.js`: shared venue/metric rendering, used by Publications, Research Explorer, and Year in Review.
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

## Publication statistics

Checked on 2026-10-08. Keep venue names, paper years, and tracks in `venue`; attach a `metricsKey` for statistics and `presentation: 'Oral'` only when the paper's presentation status is confirmed. `venueMetrics` stores source years independently of paper years. The UI rounds percentages to one decimal place, links each statistic to its source, and explicitly marks statistics from another year as a reference. Reference statistics must not change paper years, ordering, annual totals, or presentation status.

Conference rankings use the consistent label `CORE A*`, with links to the CORE/ICORE database. NeurIPS, ICML, ACL, AAAI, and KDD have verified A* entries. ICAIF has no listed rank; a workshop does not inherit the parent conference's rank or acceptance rate. These conference rankings do not apply to journals.

| Venue / track | Acceptance rate | Evidence |
| --- | --- | --- |
| NeurIPS 2026 | 24.5%, **2025 reference** | [2025 program chairs' report](https://blog.neurips.cc/2025/09/30/reflections-on-the-2025-review-process-from-the-program-committee-chairs/): 5,290 / 21,575 valid submissions, reported as 24.52%. No verified 2026 rate found. |
| ICML 2026 main | 26.6% | [Official fact sheet](https://media.icml.cc/Conferences/ICML2026/ICML2026_Fact_Sheet.pdf): 6,552 / 24,661. |
| ICML 2026 position | 29.0% | [Official ICML announcement](https://www.linkedin.com/posts/icmlconf_decision-notifications-are-being-released-activity-7455685189479055361-PXq3): 215 / 742 reviewed position papers. |
| ICAIF 2025; reference for ICAIF 2026 | 32.4% | [Organizer 6Estates report](https://www.linkedin.com/posts/6estates_icaif2025-aiinfinance-financialai-activity-7402715238133125120-fZu5): 113 / 349; the [official final accepted list](https://icaif25.org/accepted-papers/) contains 113 papers. Compute from the counts rather than the report's rounded 32.3%. |
| ACL 2025 main | 20.3% | [Proceedings front matter, program chairs' preface](https://aclanthology.org/2025.acl-long.0.pdf): 1,699 main-track papers / 8,360 unique ARR submissions. The separate Findings track is excluded. |
| AAAI 2025 | 23.4% | [AAAI's infographic](https://aaai.org/wp-content/uploads/2025/06/Sponsorship-Infographic-v2.pdf): 3,029 / 12,957 reviewed papers. |
| KDD 2024 research | 20.1% | [Firsthand conference report published by the Database Society of Japan](https://dbjapan.dbsj.org/archives/list/dbjapan@dbsj.org/thread/WLM3OFAMFXYZDJZM2ZSEXMHAOUPHNAOH/): 411 / 2,046. |
| ICAIF 2023 | 39.5% | [Japan Digital Design attendee report](https://note.com/japan_d2/n/n6e06bf3a07c2): 79 / 200. The accepted count agrees with the [official list](https://ai-finance.org/icaif-23-accepted-papers/). |
| Quantitative Finance | 23.0%, **2025 reference** | [Publisher metrics](https://www.tandfonline.com/action/journalInformation?journalCode=rquf20&show=instructions): the publisher defines acceptance data as the previous full calendar year. This is a journal-level reference, not a 2023 cohort rate. |

Oral selection is measured **among accepted papers**, not among submissions. The [ICAIF 2025 program](https://icaif25.org/overview/) has 18 oral sessions with three papers each: 54 / 113 = 47.8%. The four confirmed ICAIF 2026 Oral papers show this explicitly as a **2025 reference**, not a claimed 2026 percentile. Replace the reference when verified 2026 totals are available. Do not assign Oral status to the 2025 lab paper simply because its venue has Oral statistics.

SimStock's Oral presentation is confirmed by the [2023 conference agenda](https://ai-finance.org/wp-content/uploads/2023/11/icaif-23-agenda_updated-28nov2023.pdf). Its previous `Top 5%` claim had no supporting source. The attendee report's oral count conflicts with the official agenda, so no selection percentage is displayed for this paper. Unverified journal rates and rates attached to unnamed working-paper venues were removed; no rate is inferred from journal impact rankings or review duration. Sources were not found for the other journals or the unnamed ICLR workshop.

## Interface

The site preserves hash routes, including `#publications`, `#vacant`, and `#year-in-review`. Research-direction links can prefill publication searches with `#publications?q=Portfolio`. The responsive menu, filters, disclosures, and language controls support keyboard access; animation respects reduced-motion preferences. React is bundled locally, so no runtime Babel or Tailwind CDN is required.

Research Explorer shows verified paper figures or clearly attributed author research illustrations. It omits figures and placeholders for working papers without a public manuscript link, even when a code repository is available. Students are listed by Korean name, in Korean alphabetical order within their degree program, without English names, research interests, portraits, or avatar placeholders. Page headings omit promotional subtitles.

The interface uses an ivory canvas, warm white reading panels, and charcoal navigation. News and other content lists use a uniform warm white background; date columns and other metadata panels retain their shading. Publications and projects separate metadata from reading content. On phones, these columns become stacked records. Selected publications follow the news in the primary home column. Filter selection changes without a color fade to preserve legibility during interaction.

Research Explorer provides Papers and TSI / Terminal views; switching views preserves the paper filters and selection. Its terminal adapts the Forecast, Allocate, and Order book canvas simulations from the HTML reference supplied by the site owner in September 2026. `js/terminal-engine.js` contains the simulations and drawing code; `js/ResearchTerminal.js` provides React lifecycle management, keyboard tabs, and playback controls. All chart data is synthetic and generated locally. Animation pauses outside the viewport or in a hidden tab, starts paused when reduced motion is preferred, and can be paused manually. Arrow keys inspect the chart, and Enter resamples a forecast. The terminal runs only while its view is open. No live market feed or external script is used.
