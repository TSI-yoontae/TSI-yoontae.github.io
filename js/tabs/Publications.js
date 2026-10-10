const normalizePublicationText = value => (value || '').toString().toLowerCase().trim();

const getPublicationYear = paper => {
    if (Number.isInteger(paper.year)) return paper.year;
    const text = (paper.venue || '') + ' ' + (paper.title || '');
    const fullYear = text.match(/20\d{2}/);
    if (fullYear) return Number(fullYear[0]);
    const shortYear = text.match(/'(\d{2})/);
    return shortYear ? 2000 + Number(shortYear[1]) : null;
};

const getPublicationKind = (id = '') => {
    const prefix = id.replace(/\[|\]/g, '').charAt(0);
    return { C: 'Conference', J: 'Journal', S: 'Submitted', W: 'Work in Progress' }[prefix] || 'Paper';
};

const getPublicationMetrics = paper => {
    const metrics = window.TSI_Data.venueMetrics?.[paper.metricsKey] || {};
    const ranking = window.TSI_Data.conferenceRankings?.[metrics.conference];
    const metricYear = year => year + (year === getPublicationYear(paper) ? '' : ' reference');
    const items = [];
    if (ranking) items.push({ label: 'CORE ' + ranking.rank, href: ranking.source, title: 'CORE / ICORE conference ranking' });
    if (metrics.acceptance) {
        const { rate, year } = metrics.acceptance;
        items.push({ label: 'Acceptance rate ' + rate.toFixed(1) + '% (' + metricYear(year) + ')' });
    }
    if (paper.presentation) items.push({ label: paper.presentation, emphasis: true });
    // Oral selectivity uses all submissions from the same year as its denominator.
    // A prior year's share remains explicitly labeled as a reference.
    if (paper.presentation === 'Oral' && metrics.oral) {
        const { selected, submitted, year, source } = metrics.oral;
        items.push({
            label: 'Top ' + (100 * selected / submitted).toFixed(1) + '% of submissions (' + metricYear(year) + ')',
            href: source,
            title: selected + ' oral presentations / ' + submitted + ' submitted papers in ' + year,
        });
    }
    return items;
};

const PublicationVenue = ({ paper, className = 'publication-venue' }) => {
    const metrics = getPublicationMetrics(paper);
    return <>
        {paper.venue && <p className={className}>{paper.venue}</p>}
        {metrics.length > 0 && <ul className="publication-metrics" aria-label="Venue statistics and presentation">
            {metrics.map(item => <li key={item.label}>
                {item.href ? <a href={item.href} title={item.title} target="_blank" rel="noopener noreferrer">{item.label}</a>
                    : item.emphasis ? <strong>{item.label}</strong> : item.label}
            </li>)}
        </ul>}
    </>;
};

const AuthorList = ({ authors }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visibleAuthors = expanded ? authors : authors.slice(0, 8);
    // Number the full author list so expanding it never changes existing markers.
    const affiliations = [...new Set(authors.flatMap(author => author.affiliations || []))];
    const visibleAffiliations = new Set(visibleAuthors.flatMap(author => author.affiliations || []));
    return (
        <div className="author-block">
            <div className="author-list">
                {visibleAuthors.map((author, index) => (
                    <React.Fragment key={author.name + index}>
                        <span className="author-name">
                            {author.href ? <a href={author.href} target="_blank" rel="noopener noreferrer" className={author.isHighlight ? 'author-highlight' : ''}>{author.name}</a>
                                : <span className={author.isHighlight ? 'author-highlight' : ''}>{author.name}</span>}
                            {author.affiliations?.length > 0 && <sup className="author-affiliation-mark" title={author.affiliations.join('; ')} aria-label={'Affiliations: ' + author.affiliations.join('; ')}>
                                {author.affiliations.map(name => affiliations.indexOf(name) + 1).join(',')}
                            </sup>}
                        </span>
                        {index < visibleAuthors.length - 1 && ', '}
                    </React.Fragment>
                ))}
                {authors.length > 8 && <button className="inline-button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Show less' : '+' + (authors.length - 8) + ' more'}
                </button>}
            </div>
            {affiliations.length > 0 && <ul className="author-affiliations" aria-label="Author affiliations">
                {affiliations.map((name, index) => visibleAffiliations.has(name) && <li key={name}>
                    <sup>{index + 1}</sup><span>{name}</span>
                </li>)}
            </ul>}
        </div>
    );
};

const PublicationEntry = ({ paper }) => {
    const year = getPublicationYear(paper);
    const kind = getPublicationKind(paper.id);
    return (
        <article className="publication-entry">
            <div className="publication-index"><span className="mono">{paper.id}</span><span>{year || 'In progress'}</span><span className="kind-label">{kind}</span></div>
            <div className="publication-body">
                <h3>{paper.title}</h3>
                {(paper.authors || []).length > 0 && <AuthorList authors={paper.authors} />}
                <PublicationVenue paper={paper} />
                {paper.award && <p className="publication-award"><span aria-hidden="true">↗</span> {paper.award}</p>}
                <ResourceLinks links={paper.links} />
            </div>
        </article>
    );
};

const PublicationListSection = ({ title, description, papers }) => papers.length ? (
    <section className="content-section publication-section">
        <SectionHeading title={title} description={description}><span className="count-label">{papers.length} papers</span></SectionHeading>
        <div className="publication-list">{papers.map(paper => <PublicationEntry key={paper.id + paper.title} paper={paper} />)}</div>
    </section>
) : null;

window.PublicationsTabContent = ({ initialQuery = '' }) => {
    const publications = window.TSI_Data.publications || [];
    const workingPapers = window.TSI_Data.workingPapers || [];
    const allPapers = React.useMemo(() => [
        ...publications.map(paper => ({ ...paper, sourceType: 'publication' })),
        ...workingPapers.map(paper => ({ ...paper, sourceType: 'working' })),
    ], [publications, workingPapers]);
    const [query, setQuery] = React.useState(initialQuery);
    const [type, setType] = React.useState('all');
    const [year, setYear] = React.useState('all');
    const years = [...new Set(allPapers.map(getPublicationYear))].filter(Boolean).sort((a, b) => b - a);
    const filtered = allPapers.filter(paper => {
        const haystack = normalizePublicationText([paper.id, paper.title, paper.venue, paper.award, ...getPublicationMetrics(paper).map(item => item.label),
            ...(paper.topics || []), ...(paper.authors || []).flatMap(author => [author.name, ...(author.affiliations || [])])].join(' '));
        const matchesType = type === 'all' || type === paper.sourceType
            || (paper.sourceType === 'publication' && getPublicationKind(paper.id).toLowerCase() === type);
        return matchesType && (year === 'all' || getPublicationYear(paper) === Number(year)) && haystack.includes(normalizePublicationText(query));
    });
    const reset = () => { setQuery(''); setType('all'); setYear('all'); };
    return (
        <>
            <PageIntro title="Publications">
                <div className="intro-stats"><div><strong>{publications.length}</strong><span>Publications</span></div><div><strong>{workingPapers.length}</strong><span>Working papers</span></div></div>
            </PageIntro>
            <div className="filter-panel">
                <div className="search-row">
                    <label className="search-field">
                        <span className="sr-only">Search publications</span>
                        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
                        <input type="search" placeholder="Search title, author, institution, venue, or topic…" value={query} onChange={event => setQuery(event.target.value)} />
                    </label>
                    <label className="year-select"><span className="sr-only">Publication year</span><select value={year} onChange={event => setYear(event.target.value)}><option value="all">All years</option>{years.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
                    <button className="text-button" onClick={reset}>Reset</button>
                </div>
                <div className="filter-group" role="group" aria-label="Publication type">
                    {[['all', 'All'], ['publication', 'Publication'], ['conference', 'Conference'], ['journal', 'Journal'], ['working', 'Working Papers']].map(([value, label]) =>
                        <FilterButton key={value} active={type === value} onClick={() => setType(value)}>{label}</FilterButton>)}
                </div>
            </div>
            <div className="results-meta"><p role="status">Showing <strong>{filtered.length}</strong> of {allPapers.length} papers</p><p>* Equal contribution &nbsp; † Corresponding author</p></div>
            <PublicationListSection title="Published & accepted" papers={filtered.filter(paper => paper.sourceType === 'publication')} />
            <PublicationListSection title="Working papers" papers={filtered.filter(paper => paper.sourceType === 'working')} />
            {!filtered.length && <EmptyState><h2>No papers found.</h2><p>Try another keyword, year, or publication type.</p><button className="button button-dark" onClick={reset}>Clear filters <ArrowIcon /></button></EmptyState>}
        </>
    );
};
