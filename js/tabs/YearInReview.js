const getProjectActiveYears = (project, currentYear) => {
    const period = project.period || '';
    const periodYears = period.match(/\b\d{4}\b/g) || [];
    const startYear = periodYears.length ? Number(periodYears[0]) : project.year;
    const endYear = /\b(present|ongoing)\b/i.test(period) ? currentYear : Number(periodYears[1] || startYear);
    if (!Number.isInteger(startYear) || !Number.isInteger(endYear) || endYear < startYear) return [];
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
};

const YearReviewMetric = ({ label, value }) => <div className="review-metric"><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>;

window.YearInReviewTabContent = () => {
    const data = window.TSI_Data || {};
    const publications = (data.publications || []).filter(paper => getPublicationKind(paper.id) === 'Journal'
        || (getPublicationKind(paper.id) === 'Conference' && !/\bworkshops?\b/i.test(paper.venue || '')));
    const currentYear = new Date().getFullYear();
    const projects = (data.projects || []).map(project => ({ ...project, activeYears: getProjectActiveYears(project, currentYear) }));
    const organizingActivities = (data.news || []).filter(item => item.organizing).map(item => ({
        ...item.organizing, year: Number((item.date || '').match(/\b\d{4}\b/)?.[0]), link: item.link,
    }));
    const years = [...new Set([...publications.map(getPublicationYear), ...projects.flatMap(project => project.activeYears), ...organizingActivities.map(activity => activity.year)])]
        .filter(year => Number.isInteger(year) && year >= (data.reviewStartYear || currentYear)).sort((a, b) => b - a);
    const [selectedYear, setSelectedYear] = React.useState(() => years[0] || currentYear);
    const papers = publications.filter(paper => getPublicationYear(paper) === selectedYear);
    const conferencePapers = papers.filter(paper => getPublicationKind(paper.id) === 'Conference');
    const journalPapers = papers.filter(paper => getPublicationKind(paper.id) === 'Journal');
    const fundedProjects = projects.filter(project => project.activeYears.includes(selectedYear));
    const organizingRoles = organizingActivities.filter(activity => activity.year === selectedYear);
    return (
        <>
            <PageIntro title="Year in Review">
                <div className="filter-group year-switcher" role="group" aria-label="Review year">{years.map(year =>
                    <FilterButton key={year} active={selectedYear === year} onClick={() => setSelectedYear(year)} aria-controls="annual-record">{year}</FilterButton>)}</div>
            </PageIntro>
            <div id="annual-record">
                <section className="review-overview" aria-label={selectedYear + ' overview'}>
                    <div className="review-year"><h2>{selectedYear}</h2><span className="eyebrow">{selectedYear === currentYear ? 'Year to date' : 'A year in perspective'}</span></div>
                    <div className="review-metrics">
                        <YearReviewMetric label="Accepted / published papers" value={papers.length} />
                        <YearReviewMetric label="Conference papers" value={conferencePapers.length} />
                        <YearReviewMetric label="Journal papers" value={journalPapers.length} />
                        <YearReviewMetric label="Active funded projects" value={fundedProjects.length} />
                        <YearReviewMetric label="Organizer roles" value={organizingRoles.length} />
                    </div>
                </section>
                <p className="fine-print">Papers are grouped by venue year. Funding includes projects active during the selected year. Organizer roles are grouped by announcement year.</p>
                <section className="content-section">
                    <SectionHeading title="Research funding" description="Funding amounts cover the full project period; all researcher roles are included." />
                    {fundedProjects.length ? <div className="project-list">{fundedProjects.map(project => <ProjectEntry key={project.title} project={project} />)}</div>
                        : <EmptyState>No active funded projects are listed for {selectedYear}.</EmptyState>}
                </section>
                <section className="content-section">
                    <SectionHeading title="Workshop organizing" />
                    {organizingRoles.length ? <div className="organizing-grid">{organizingRoles.map(activity =>
                        <article className="organizing-card" key={activity.title}>
                            <div className="organizing-meta"><span className="venue-chip">{activity.venue}</span><span>{activity.role}</span></div>
                            <h3>{activity.title}</h3>{activity.link && <a className="text-link" href={activity.link} target="_blank" rel="noopener noreferrer">Workshop website <ArrowIcon diagonal /></a>}
                        </article>
                    )}</div> : <EmptyState>No workshop organizing roles are listed for {selectedYear}.</EmptyState>}
                </section>
                <PublicationListSection title="Conference papers" papers={conferencePapers} />
                <PublicationListSection title="Journal papers" papers={journalPapers} />
                {!papers.length && <EmptyState>No accepted or published papers are listed for this year.</EmptyState>}
            </div>
        </>
    );
};
