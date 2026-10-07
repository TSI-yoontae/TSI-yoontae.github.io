const selectedHomePapers = [
    { id: '[C17]', venue: "NeurIPS'26" },
    { id: '[C15]', venue: "ICML'26", extraLinks: [{ text: 'seminar@KIC', href: 'ppt/KIC.pdf' }] },
    { id: '[C3]', venue: "AAAI'25" },
    { id: '[J8]', venue: "ESWA'26" },
];

const researchDirections = [
    { id: 'finance', label: 'AI in Finance', query: 'Portfolio', description: 'Machine learning for portfolio construction, financial modeling, and investment decisions.', items: ['Portfolio Optimization', 'Financial Modeling', 'Goal-based Wealth Management', 'Time-series for Finance'] },
    { id: 'market', label: 'AI in Market', query: 'Market', description: 'Prediction and decision-making in financial markets, prediction markets, and sports.', items: ['Optimal Betting (Mainly Polymarket)', 'Dark Pool', 'Limit Order Book', 'Sport Science'] },
    { id: 'foundation', label: 'Foundation Models', query: 'Time', description: 'General representations and foundation models for financial time series.', items: ['Foundation Models for Financial Time Series'] },
];

const HomeResearchTopics = () => {
    const [active, setActive] = React.useState('finance');
    return (
        <section className="home-research">
            <SectionHeading title="Research areas" />
            <div className="home-topics">{researchDirections.map((topic, index) =>
                <div className="home-topic" key={topic.id}>
                    <button aria-expanded={active === topic.id} aria-controls={'topic-' + topic.id} onClick={() => setActive(active === topic.id ? '' : topic.id)}>
                        <span className="mono">0{index + 1}</span><strong>{topic.label}</strong><span aria-hidden="true">{active === topic.id ? '−' : '+'}</span>
                    </button>
                    <div id={'topic-' + topic.id} hidden={active !== topic.id}>
                        <p>{topic.description}</p><ul>{topic.items.map(item => <li key={item}>{item}</li>)}</ul>
                        <a className="text-link" href={'#publications?q=' + encodeURIComponent(topic.query)}>Related papers <ArrowIcon /></a>
                    </div>
                </div>
            )}</div>
            <a className="explorer-launch" href="#research-explorer">
                <span className="explorer-launch-label"><span className="terminal-dot" /> Interactive archive</span>
                <strong>Research Explorer <ArrowIcon /></strong>
            </a>
            <div className="home-admissions"><h3>Prospective students</h3><p>Regular recruitment is currently closed. Please read the lab guidelines before contacting the advisor.</p><a className="text-link" href="#vacant">Recruitment & lab guidelines <ArrowIcon /></a></div>
        </section>
    );
};

const NewsSection = () => {
    const news = window.TSI_Data.news || [];
    const [expanded, setExpanded] = React.useState(false);
    return (
        <section className="news-section">
            <SectionHeading title="Latest updates"><a className="text-link" href="#year-in-review">Year in Review <ArrowIcon /></a></SectionHeading>
            <div className="news-columns" aria-hidden="true"><span>Date</span><span>Category</span><span>Update</span></div>
            <div id="news-list" className="news-list">{(expanded ? news : news.slice(0, 6)).map(item =>
                <article className="news-item" key={item.text}>
                    <span className="news-date mono">{item.date}</span>
                    <span className="news-category">{item.category}</span>
                    <p>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer"><span>{item.text}</span><ArrowIcon diagonal /></a> : item.text}</p>
                </article>)}</div>
            {news.length > 6 && <button className="text-button news-toggle" aria-expanded={expanded} aria-controls="news-list" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Show recent updates' : 'All ' + news.length + ' updates'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
            </button>}
        </section>
    );
};

const SelectedPapersSection = () => {
    const papers = selectedHomePapers.map(selection => {
        const paper = window.TSI_Data.publications.find(paper => paper.id === selection.id);
        return paper && { ...paper, selectedVenue: selection.venue, links: [...paper.links, ...(selection.extraLinks || [])] };
    }).filter(Boolean);
    return (
        <section className="home-section">
            <SectionHeading title="Selected publications"><a className="text-link" href="#publications">Full archive <ArrowIcon /></a></SectionHeading>
            <div className="selected-list">{papers.map(paper => {
                return <article className="selected-row" key={paper.id}>
                    <span className="selected-venue" title={paper.venue}>{paper.selectedVenue}</span>
                    <div><h3><a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3></div>
                    <ResourceLinks links={paper.links} />
                </article>;
            })}</div>
        </section>
    );
};

window.HomeTabContent = () => {
    const data = window.TSI_Data;
    const year = new Date().getFullYear();
    const papers = data.publications.filter(paper => getPublicationYear(paper) === year
        && (getPublicationKind(paper.id) === 'Journal' || !/workshop/i.test(paper.venue || '')));
    const projects = (data.projects || []).filter(project => getProjectActiveYears(project, year).includes(year));
    const organizers = data.news.filter(item => item.organizing && item.date.includes(String(year)));
    return (
        <>
            <section className="home-masthead">
                <div><p className="eyebrow">Pusan National University · Graduate School of Data Science</p><h1 id="page-title" tabIndex="-1">Time Series Intelligence Lab</h1>
                    <div className="masthead-links"><span>Principal Investigator: Yoontae Hwang</span><a href="mailto:yoontae.hwang@pusan.ac.kr">yoontae.hwang@pusan.ac.kr <ArrowIcon diagonal /></a></div>
                </div>
                <a className="home-year-summary" href="#year-in-review" aria-label={year + ' Year in Review'}>
                    <span className="summary-label">{year} at a glance <ArrowIcon /></span>
                    <div><span><strong>{papers.length}</strong>Papers</span><span><strong>{projects.length}</strong>Projects</span><span><strong>{organizers.length}</strong>Organizer roles</span></div>
                </a>
            </section>
            <div className="home-columns">
                <div className="home-primary"><NewsSection /><SelectedPapersSection /></div>
                <HomeResearchTopics />
            </div>
        </>
    );
};
