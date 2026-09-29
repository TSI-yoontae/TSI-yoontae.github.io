const selectedHomePapers = [
        { title: "[ICML'26] Signature-informed Transformer for Asset Allocation", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2510.03129' }, { text: 'code', href: 'https://github.com/Yoontae6719/Signature-Informed-Transformer-For-Asset-Allocation' }, { text: 'seminar@KIC', href: 'ppt/KIC.pdf' }] },
        { title: "[ICML'26] Position: Evaluating LLMs in Finance Requires Explicit Bias Consideration", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2602.14233' }, { text: 'code', href: 'https://github.com/Eleanorkong/Awesome-Financial-LLM-Bias-Mitigation' }] },
        { title: "[ACL'25] Time-MQA: Time series multi-task question answering with context enhancement", links: [{ text: 'paper', href: 'https://aclanthology.org/2025.acl-long.1437/' }, { text: 'code', href: 'https://huggingface.co/Time-MQA' }] },
        { title: "[ICAIF'25] Fusing Narrative Semantics for Financial Volatility Forecasting", links: [{ text: 'paper', href: 'https://dl.acm.org/doi/abs/10.1145/3768292.3771256' }, { text: 'code', href: 'https://github.com/Yoontae6719/M2VN-Multi-Modal-Learning-Network-for-Volatility-Forecasting' }] },
        { title: "[AAAI'25] Geodesic Flow Kernels for Semi-Supervised Learning on Mixed-Variable Tabular Dataset", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2412.12864' }, { text: 'code', href: 'https://github.com/Yoontae6719/Geodesic-Flow-Kernels-for-Semi-Supervised-Learning-on-Mixed-Variable-Tabular-Dataset' }, { text: 'seminar@UNIST', href: 'ppt/GFTab_UNIST.pdf' }] },
        { title: "[KDD'24] CAFO: Feature-Centric Explanation on Time Series Classification", links: [{ text: 'paper', href: 'https://arxiv.org/pdf/2406.01833' }, { text: 'code', href: 'https://github.com/eai-lab/CAFO' }] },
        { title: "[ICAIF'23] SimStock: Representation Model for Stock Similarities", links: [{ text: 'paper', href: 'https://dl.acm.org/doi/abs/10.1145/3604237.3626888' }, { text: 'code', href: 'https://github.com/Yoontae6719/SimStock-Representation-Model-for-Stock-Similarities' }, { text: 'seminar@SKKU', href: 'ppt/SKKU.pdf' }] },
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
                <span>Browse topics, trace connections, and open papers.</span>
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
            <div id="news-list" className="news-list">{(expanded ? news : news.slice(0, 6)).map(item =>
                <article className="news-item" key={item.text}>
                    <div className="news-meta"><span className="mono">{item.date}</span><span className="news-category">{item.category}</span></div>
                    <p>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.text}<ArrowIcon diagonal /></a> : item.text}</p>
                </article>)}</div>
            {news.length > 6 && <button className="text-button news-toggle" aria-expanded={expanded} aria-controls="news-list" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Show recent updates' : 'All ' + news.length + ' updates'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
            </button>}
        </section>
    );
};

const SelectedPapersSection = () => {
    const hots = window.TSI_Data.publications.find(paper => paper.id === '[C9]');
    const papers = hots ? [{ title: "[NeurIPS'26] " + hots.title, links: hots.links }, ...selectedHomePapers] : selectedHomePapers;
    return (
        <section className="home-section">
            <SectionHeading title="Selected publications"><a className="text-link" href="#publications">Full archive <ArrowIcon /></a></SectionHeading>
            <div className="selected-list">{papers.map(paper => {
                const parts = paper.title.match(/^\[(.*?)\]\s*(.*)$/);
                return <article className="selected-row" key={paper.title}>
                    <span className="selected-venue">{parts?.[1]}</span>
                    <div><h3><a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">{parts?.[2] || paper.title}</a></h3></div>
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
                    <p>We study machine learning for financial time series, markets, and decision-making.</p>
                    <div className="masthead-links"><span>Principal Investigator: Yoontae Hwang</span><a href="mailto:yoontae.hwang@pusan.ac.kr">yoontae.hwang@pusan.ac.kr <ArrowIcon diagonal /></a></div>
                </div>
                <a className="home-year-summary" href="#year-in-review" aria-label={year + ' Year in Review'}>
                    <span className="summary-label">{year} at a glance <ArrowIcon /></span>
                    <div><span><strong>{papers.length}</strong>Papers</span><span><strong>{projects.length}</strong>Projects</span><span><strong>{organizers.length}</strong>Organizer roles</span></div>
                </a>
            </section>
            <div className="home-columns"><NewsSection /><HomeResearchTopics /></div>
            <SelectedPapersSection />
        </>
    );
};
