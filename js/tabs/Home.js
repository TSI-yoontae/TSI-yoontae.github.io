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

const ConceptHero = () => <section className="concept-hero">
    <div className="concept-hero-inner">
        <div className="concept-hero-copy">
            <p className="concept-eyebrow">Pusan National University</p>
            <h1 id="page-title" tabIndex="-1">Time Series<br />Intelligence Lab<span>.</span></h1>
            <p className="concept-hero-description">Machine learning for financial markets.<br />Time-series models for decisions under uncertainty.</p>
            <a href="#research-explorer" className="hero-research-link">Explore our research <ArrowIcon /></a>
        </div>
        <HeroField />
        <div className="hero-bottom-line"><span>Graduate School of Data Science</span><a href="#members">Led by Yoontae Hwang <ArrowIcon diagonal /></a></div>
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
        <h2 id="record-title" className="record-label"><span>{record.year}</span><span>Research record</span></h2>
        <div className="record-metric record-papers">
            <a className="record-total" href="#year-in-review"><span>Publications</span><strong>{record.papers.length}<ArrowIcon diagonal /></strong></a>
            <p className="record-breakdown">{record.venues.map(venue => <span key={venue.name} title={venue.fullName || venue.name}>{venue.name} × {venue.count}</span>)}</p>
        </div>
        <div className="record-metric record-funding">
            <a className="record-total" href="#project"><span>Total funding{record.maximum && ' (maximum)'}</span><strong>₩{record.funding / 1_000_000}M<ArrowIcon diagonal /></strong></a>
            <p className="record-breakdown">{record.projects.length} disclosed project budgets · Full project periods</p>
        </div>
    </section>;
};

const NewsSection = () => {
    const [expanded, setExpanded] = React.useState(false);
    const news = window.TSI_Data.news.map((item, index) => ({ ...item, ...homeNewsPresentation[index], index }));
    const featured = news.filter(item => item.index === 1 || item.index === 3);
    const regular = (expanded ? news : news.slice(0, 8)).filter(item => item.index !== 1 && item.index !== 3);
    return <section className="concept-news">
        <ConceptSectionHeading title="Latest updates"><a href="#year-in-review">Year in Review <ArrowIcon diagonal /></a></ConceptSectionHeading>
        <div className="news-editorial" id="news-list">
            <div className="news-features">{featured.map(item => <article className="news-feature" key={item.index}>
                <div className="news-meta"><span className="news-stamp">{item.date}</span><span>{item.index === 1 ? 'ICAIF 2026' : 'NeurIPS 2026'}</span></div>
                <h3>{item.title}</h3>
                {item.detail && <p>{item.detail}</p>}
                <a href={item.index === 1 ? '#publications?q=ICAIF%202026' : '#publications?q=HoTS'}>View research <ArrowIcon /></a>
            </article>)}</div>
            <div className="news-briefs">{regular.map(item => <article className="news-brief" key={item.index}>
                <div className="news-meta"><span className="news-stamp">{item.date}</span><span className="news-kind">{item.category}</span></div>
                <h3>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}<ArrowIcon diagonal /></a> : item.title}</h3>
                {item.detail && <p lang={/[가-힣]/.test(item.detail) ? 'ko' : undefined}>{item.detail}</p>}
            </article>)}</div>
        </div>
        <button type="button" className="news-archive-toggle" aria-expanded={expanded} aria-controls="news-list" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show recent updates' : 'All ' + news.length + ' updates'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
    </section>;
};

const HomeResearchTopics = () => <section className="concept-research">
    <ConceptSectionHeading title="Research areas"><a href="#research-explorer">Explore the work <ArrowIcon diagonal /></a></ConceptSectionHeading>
    <div className="research-lines">{researchDirections.map(topic => <article className="research-line" key={topic.id}>
        <h3>{topic.label}</h3><div className="research-line-description"><p>{topic.description}</p></div>
        <ul>{topic.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a className="research-topic-link" href={'#publications?q=' + encodeURIComponent(topic.query)}>Related papers <ArrowIcon /></a>
    </article>)}</div>
</section>;

const SelectedPapersSection = () => {
    const papers = selectedHomePapers.map(selection => {
        const paper = window.TSI_Data.publications.find(paper => paper.id === selection.id);
        return paper && { ...paper, selectedVenue: selection.venue, links: [...paper.links, ...(selection.extraLinks || [])] };
    }).filter(Boolean);
    return <section className="concept-publications">
        <ConceptSectionHeading title="Selected publications"><a href="#publications">Full archive <ArrowIcon diagonal /></a></ConceptSectionHeading>
        <div className="selected-research-list">{papers.map(paper => <article key={paper.id} className="selected-research">
            <span>{paper.selectedVenue}</span>
            <h3><a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3>
            <ResourceLinks links={paper.links} />
        </article>)}</div>
    </section>;
};

const ConceptCollaboration = () => <section className="concept-collaboration">
    <ConceptSectionHeading title="Research projects"><a href="#project">All projects <ArrowIcon diagonal /></a></ConceptSectionHeading>
    <div className="collaboration-layout">
        <div className="collaboration-note">
            <p className="concept-eyebrow">Research collaboration</p>
            <h3>Work with<br />TSI Lab.</h3>
            <p>Discuss research in financial time-series modeling, portfolio decisions, and language-model evaluation.</p>
            <a href="mailto:yoontae.hwang@pusan.ac.kr?subject=Research%20collaboration%20with%20TSI%20Lab">Contact the lab <ArrowIcon diagonal /></a>
        </div>
        <div className="collaboration-projects">
            <article><span>NRF · Glocal R&D</span><h3 lang="ko">Limit Order Book (LOB)을 위한 파운데이션모델 개발 <span lang="en">(with University of Oxford)</span></h3><p>Principal Investigator · Up to KRW 600M over 3 years</p><time>2026.09—Present</time></article>
            <article><span lang="ko">한국금융학회</span><h3 lang="ko">기업 공시자료의 한계가치에 관한 연구</h3><p lang="ko">연구책임자 · 기업 공시자료가 제공하는 정보의 가치 연구</p><time>2026.09—Present</time></article>
            <article><span>NRF · National University of Singapore</span><h3 lang="ko">글로벌데이터리더양성사업</h3><p lang="ko">참여연구원(세부책임)</p><time>2026.09—Present</time></article>
        </div>
    </div>
</section>;

window.HomeTabContent = () => <div className="home-page concept-home">
    <ConceptHero /><ConceptEvidence /><NewsSection /><HomeResearchTopics /><SelectedPapersSection /><ConceptCollaboration />
    <aside className="concept-students"><div><h2>Prospective students</h2><p>Regular recruitment is currently closed. Please review the lab guidelines before contacting the advisor.</p></div><a href="#vacant">Lab guidelines <ArrowIcon /></a></aside>
</div>;
