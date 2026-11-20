const selectedHomePapers = [
    { id: '[C17]', venue: "NeurIPS 2026" },
    { id: '[C15]', venue: "ICML 2026", extraLinks: [{ text: 'seminar@KIC', href: 'ppt/KIC.pdf' }] },
    { id: '[C3]', venue: "AAAI 2025" },
    { id: '[J8]', venue: "ESWA 2026" },
];

const researchDirections = [
    { id: 'finance', label: 'AI in Finance', query: 'Portfolio', description: 'Connecting financial forecasts with investment decisions through machine learning.', items: ['Portfolio optimization', 'Financial modeling', 'Goal-based wealth management', 'Time series for finance'] },
    { id: 'market', label: 'Market Intelligence', query: 'Market', description: 'Studying how information, market structure, and participant behavior shape decisions.', items: ['Prediction markets & optimal betting', 'Dark pools & limit order books', 'Sports science'] },
    { id: 'agents', label: 'AI Agents', query: 'LLM', description: 'Autonomous systems for scientific discovery, collaborative reasoning, and verifiable results.', items: ['Scientific Discovery Agents', 'Multi-agent Coordination', 'Agent Evaluation & Reliability'] },
];

const ConceptSectionHeading = ({ title, children }) => <div className="concept-section-heading"><h2>{title}</h2>{children}</div>;

const HomeIntro = () => <section className="lab-intro" aria-labelledby="page-title">
    <p className="lab-affiliation">Pusan National University · Graduate School of Data Science</p>
    <h1 id="page-title" tabIndex="-1">Time Series Intelligence Lab</h1>
    <p className="lab-description">We develop machine learning methods for financial time series and study how they inform decisions in markets.</p>
    <div className="lab-intro-links">
        <span>Led by <a href="#members">Yoontae Hwang</a></span>
        <a href="#publications">Publications</a>
    </div>
</section>;

const getHomeResearchRecord = (year) => {
    const papers = window.TSI_Data.publications.filter(paper => getPublicationYear(paper) === year
        && (getPublicationKind(paper.id) === 'Journal'
            || (getPublicationKind(paper.id) === 'Conference' && !/\bworkshops?\b/i.test(paper.venue || ''))));
    const venues = [
        { name: 'NeurIPS', pattern: /NeurIPS/i }, { name: 'ICML', pattern: /ICML/i },
        { name: 'ICAIF', pattern: /ICAIF/i }, { name: 'ESWA', pattern: /Expert systems with applications/i },
        { name: 'JAP', fullName: 'Journal of Applied Physics', pattern: /Journal of Applied Physics/i },
    ].map(venue => ({ ...venue, count: papers.filter(paper => venue.pattern.test(paper.venue)).length })).filter(venue => venue.count);
    const projects = (window.TSI_Data.projects || []).filter(project => getProjectActiveYears(project, year).includes(year) && project.funding);
    return { year, papers, venues, projects, maximum: projects.some(project => project.fundingMaximum),
        funding: projects.reduce((total, project) => total + Number(project.funding.replace(/[^\d.]/g, '')), 0) };
};

const ConceptEvidence = () => {
    const record = getHomeResearchRecord(2026);
    return <section className="research-record" aria-labelledby="record-title">
        <h2 id="record-title" className="record-label">{record.year} Research record</h2>
        <div className="record-metric record-papers">
            <a className="record-total" href="#year-in-review"><strong>{record.papers.length}</strong> publications</a>
            <p className="record-breakdown">{record.venues.map(venue => <span key={venue.name} title={venue.fullName || venue.name}>{venue.name} × {venue.count}</span>)}</p>
        </div>
        <div className="record-metric record-funding">
            <a className="record-total" href="#project"><strong>₩{record.funding / 1_000_000}M</strong> total funding{record.maximum && ' (maximum)'}</a>
            <p className="record-breakdown">{record.projects.length} disclosed project budgets · Full project periods</p>
        </div>
    </section>;
};

const NewsSection = () => {
    const [expanded, setExpanded] = React.useState(false);
    const news = window.TSI_Data.news;
    const visibleNews = expanded ? news : news.slice(0, 5);
    return <section className="concept-news">
        <ConceptSectionHeading title="Latest updates"><a href="#news">News coverage</a></ConceptSectionHeading>
        <ul className="update-list" id="lab-updates">
            {visibleNews.map(item => <li className="update-entry" key={item.title}>
                <div className="update-meta"><NewsDate date={item.date} /><span>{item.category}</span></div>
                <div>
                    <h3>{item.link ? <a href={item.link}>{item.title}</a> : item.title}</h3>
                    {item.detail && <p className="update-detail" lang={/^[가-힣]/.test(item.detail) ? 'ko' : undefined}>{item.detail}</p>}
                    {item.source && <a className="update-source" href={item.source}>Conference results</a>}
                </div>
            </li>)}
        </ul>
        <button type="button" className="news-archive-toggle" aria-expanded={expanded} aria-controls="lab-updates" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show fewer updates' : 'Show all updates'}<span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
    </section>;
};

const HomeResearchTopics = () => <section className="concept-research">
    <ConceptSectionHeading title="Research areas" />
    <div className="research-lines">{researchDirections.map(topic => <article className="research-line" key={topic.id}>
        <h3>{topic.label}</h3><div className="research-line-description"><p>{topic.description}</p></div>
        <ul>{topic.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a className="research-topic-link" href={'#publications?q=' + encodeURIComponent(topic.query)}>Related papers</a>
    </article>)}</div>
</section>;

const SelectedPapersSection = () => {
    const papers = selectedHomePapers.map(selection => {
        const paper = window.TSI_Data.publications.find(paper => paper.id === selection.id);
        return paper && { ...paper, selectedVenue: selection.venue, links: [...paper.links, ...(selection.extraLinks || [])] };
    }).filter(Boolean);
    return <section className="concept-publications">
        <ConceptSectionHeading title="Selected publications"><a href="#publications">All publications</a></ConceptSectionHeading>
        <div className="selected-research-list">{papers.map(paper => <article key={paper.id} className="selected-research">
            <span>{paper.selectedVenue}</span>
            <div>
                <h3><a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3>
                <p>{paper.authors.map(author => author.name).join(', ')}</p>
                {paper.links.length > 1 && <ResourceLinks links={paper.links.slice(1)} />}
            </div>
        </article>)}</div>
    </section>;
};

const HomeProjects = () => <section className="concept-collaboration">
    <ConceptSectionHeading title="Research projects"><a href="#project">All projects</a></ConceptSectionHeading>
    <div className="project-list">
        {window.TSI_Data.projects.slice(0, 3).map(project => <ProjectEntry key={project.title} project={project} />)}
    </div>
</section>;

window.HomeTabContent = () => <div className="home-page concept-home">
    <HomeIntro /><NewsSection /><SelectedPapersSection /><HomeResearchTopics /><HomeProjects /><ConceptEvidence />
    <aside className="concept-students"><div><h2>Prospective students</h2><p>Regular recruitment is currently closed. Please review the lab guidelines before contacting the advisor.</p></div><a href="#for-students?section=admissions">Lab guidelines</a></aside>
</div>;
