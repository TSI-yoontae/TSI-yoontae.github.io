const getProjectActiveYears = (project, currentYear) => {
    const period = project.period || '';
    const periodYears = period.match(/\b\d{4}\b/g) || [];
    const startYear = periodYears.length > 0 ? Number(periodYears[0]) : project.year;
    const endYear = /\b(present|ongoing)\b/i.test(period)
        ? currentYear
        : Number(periodYears[1] || startYear);

    if (!Number.isInteger(startYear) || !Number.isInteger(endYear) || endYear < startYear) return [];

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
};

const YearReviewMetric = ({ label, value }) => (
    <div className="border border-[#d8d0c0] bg-[#fffdf8] px-3 py-3">
        <p className="text-3xl font-extrabold tracking-tight text-[#172033]">{value}</p>
        <p className="mt-1 text-xs font-semibold text-[#746b5d]">{label}</p>
    </div>
);

window.YearInReviewTabContent = () => {
    const data = window.TSI_Data || {};
    const publications = (data.publications || []).filter(paper => {
        const kind = getPublicationKind(paper.id);
        return kind === 'Journal'
            || (kind === 'Conference' && !/\bworkshops?\b/i.test(paper.venue || ''));
    });
    const currentYear = new Date().getFullYear();
    const projects = (data.projects || []).filter(project => project.funding).map(project => ({
        ...project,
        activeYears: getProjectActiveYears(project, currentYear),
    }));
    const startYear = data.reviewStartYear || currentYear;
    const years = [...new Set([
        ...publications.map(getPublicationYear),
        ...projects.flatMap(project => project.activeYears),
    ])].filter(year => Number.isInteger(year) && year >= startYear).sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = React.useState(() => years[0] || currentYear);
    const papers = publications.filter(paper => getPublicationYear(paper) === selectedYear);
    const conferencePapers = papers.filter(paper => getPublicationKind(paper.id) === 'Conference');
    const journalPapers = papers.filter(paper => getPublicationKind(paper.id) === 'Journal');
    const fundedProjects = projects.filter(project => project.activeYears.includes(selectedYear));

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="tsi-kicker">Annual record</p>
                    <h2 className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#172033]">Year in Review</h2>
                    <p className="mt-1 text-sm leading-5 text-[#5e6676]">
                        Conference papers, journal papers, and research funding, year by year.
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
                    <YearReviewMetric label="Conference papers" value={conferencePapers.length} />
                    <YearReviewMetric label="Journal papers" value={journalPapers.length} />
                    <YearReviewMetric label="Active funded projects" value={fundedProjects.length} />
                </div>
                <p className="mt-2 text-xs leading-5 text-[#746b5d]">
                    Papers are grouped by venue year. Funding includes projects active during the selected year.
                </p>
            </section>

            <section className="tsi-section">
                <h3 className="text-lg font-extrabold tracking-tight text-[#172033]">Research funding</h3>
                <p className="mb-2 mt-1 text-sm leading-5 text-[#5e6676]">
                    Projects active during {selectedYear}. Funding amounts cover the full project period.
                </p>
                {fundedProjects.length > 0 ? (
                    <div className="tsi-panel">
                        {fundedProjects.map(project => (
                            <article key={`${project.title}-${project.period}`} className="tsi-row px-3 py-3">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                    <h4 className="text-sm font-bold text-[#172033]">{project.title}</h4>
                                    <p className="shrink-0 text-sm font-extrabold text-[#172033]">{project.funding}</p>
                                </div>
                                <p className="mt-1 text-sm leading-5 text-[#5e6676]">{project.organization}</p>
                                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#404958]">
                                    {project.role && <p><strong className="text-[#172033]">Role:</strong> {project.role}</p>}
                                    <p><strong className="text-[#172033]">Period:</strong> {project.period}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm leading-5 text-[#5e6676]">No funding amounts are listed for projects active in {selectedYear}.</p>
                )}
            </section>

            <PublicationListSection
                title="Conference papers"
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
