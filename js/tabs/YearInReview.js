const getNewsYear = (item) => {
    const year = (item.date || '').match(/20\d{2}/);
    return year ? Number(year[0]) : null;
};

const YearReviewMetric = ({ label, value }) => (
    <div className="border border-[#d8d0c0] bg-[#fffdf8] px-3 py-3">
        <p className="text-3xl font-extrabold tracking-tight text-[#172033]">{value}</p>
        <p className="mt-1 text-xs font-semibold text-[#746b5d]">{label}</p>
    </div>
);

window.YearInReviewTabContent = () => {
    const data = window.TSI_Data || {};
    const publications = data.publications || [];
    const news = data.news || [];
    const currentYear = new Date().getFullYear();
    const startYear = data.reviewStartYear || currentYear;
    const years = [...new Set([
        ...publications.map(getPublicationYear),
        ...news.map(getNewsYear),
    ])].filter(year => Number.isInteger(year) && year >= startYear).sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = React.useState(() => years[0] || currentYear);
    const papers = publications.filter(paper => getPublicationYear(paper) === selectedYear);
    const conferencePapers = papers.filter(paper => getPublicationKind(paper.id) === 'Conference');
    const journalPapers = papers.filter(paper => getPublicationKind(paper.id) === 'Journal');
    const highlights = news.filter(item => getNewsYear(item) === selectedYear && item.category !== 'Publication');

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="tsi-kicker">Annual record</p>
                    <h2 className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#172033]">Year in Review</h2>
                    <p className="mt-1 text-sm leading-5 text-[#5e6676]">
                        Research output, recognition, and lab milestones, year by year.
                    </p>
                </div>

                {years.length > 0 && (
                    <div role="group" aria-label="Review year" className="flex flex-wrap gap-1.5">
                        {years.map(year => (
                            <FilterButton key={year} active={selectedYear === year} onClick={() => setSelectedYear(year)}>
                                {year}
                            </FilterButton>
                        ))}
                    </div>
                )}
            </div>

            <section className="tsi-section" aria-label={`${selectedYear} overview`}>
                <div className="mb-2 flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-extrabold tracking-tight text-[#172033]">{selectedYear} at a glance</h3>
                    {selectedYear === currentYear && <p className="text-xs font-semibold text-[#746b5d]">Year to date</p>}
                </div>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                    <YearReviewMetric label="Accepted / published papers" value={papers.length} />
                    <YearReviewMetric label="Conference & workshop papers" value={conferencePapers.length} />
                    <YearReviewMetric label="Journal papers" value={journalPapers.length} />
                    <YearReviewMetric label="Milestones" value={highlights.length} />
                </div>
                <p className="mt-2 text-xs leading-5 text-[#746b5d]">
                    Papers are grouped by venue year. Milestones use the date of the announcement.
                </p>
            </section>

            <section className="tsi-section">
                <h3 className="mb-2 text-lg font-extrabold tracking-tight text-[#172033]">Highlights & milestones</h3>
                {highlights.length > 0 ? (
                    <div className="tsi-panel">
                        {highlights.map((item, index) => (
                            <article key={`${item.date}-${index}`} className="tsi-row grid gap-2 px-3 py-3 sm:grid-cols-[105px_1fr] sm:gap-4">
                                <p className="text-[13px] font-bold text-[#746b5d]">{item.date}</p>
                                <div>
                                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[#8a6f3d]">{item.category || 'News'}</p>
                                    <p className="text-sm leading-5 text-[#404958]">
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="tsi-link">{item.text}</a>
                                        ) : item.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm leading-5 text-[#5e6676]">No milestones have been announced for this year.</p>
                )}
            </section>

            <PublicationListSection
                title="Conference & workshop papers"
                description={`Accepted or published papers for ${selectedYear}.`}
                papers={conferencePapers}
            />
            <PublicationListSection
                title="Journal papers"
                description={`Accepted or published papers for ${selectedYear}.`}
                papers={journalPapers}
            />
            {papers.length === 0 && (
                <p className="border border-dashed border-[#c8bead] bg-[#fffdf8] p-4 text-sm text-[#5e6676]">
                    No accepted or published papers are listed for this year.
                </p>
            )}
        </section>
    );
};
