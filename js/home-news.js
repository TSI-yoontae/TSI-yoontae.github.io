window.TSI_Data.news = [
    {
        date: '2026-11',
        category: 'Funding',
        title: 'Korea Exchange research grant awarded',
        detail: '주식시장의 순환적 가격반응과 정보효율성',
        link: '#project',
    },
    {
        date: '2026-10',
        category: 'Publications',
        title: 'Eight papers accepted at ICAIF 2026',
        detail: 'Four lab papers were selected for oral presentation. The conference selected 52 of 1,019 submissions for oral presentation (5.1%).',
        link: '#publications?q=ICAIF%202026',
        source: 'https://icaif2026.org/accepted-papers/',
    },
    { date: '2026-10', category: 'Recognition', title: 'Yoontae Hwang named NeurIPS 2026 Top Reviewer' },
    {
        date: '2026-09',
        category: 'Publications',
        title: 'HoTS accepted at NeurIPS 2026',
        detail: 'Homophily-aware temperature scaling for graph neural network calibration.',
        link: '#publications?q=HoTS',
    },
    {
        date: '2026-09',
        category: 'Academic service',
        title: 'FinFM workshop at AAAI 2027',
        detail: 'Yoontae Hwang will serve as an organizer of FinFM, Foundation Models and Generative AI for Finance.',
        link: 'https://finfm.finhorizons.org/',
        organizing: { title: 'FinFM: Foundation Models and Generative AI for Finance', venue: "AAAI'27", role: 'Organizer' },
    },
    {
        date: '2026-09',
        category: 'Publications',
        title: 'Paper accepted in Expert Systems with Applications',
        detail: 'Decision-informed neural networks integrate LLMs for portfolio optimization.',
        link: '#publications?q=Decision-informed',
    },
    {
        date: '2026-08',
        category: 'Funding',
        title: 'Foundation models for limit order books with Oxford',
        detail: 'NRF Glocal R&D · Principal Investigator: Yoontae Hwang · Up to KRW 600M over 3 years.',
        link: '#project',
    },
    {
        date: '2026-06',
        category: 'Publications',
        title: 'Paper accepted in Journal of Applied Physics',
        detail: 'Portable single-beam atomic magnetometry for stand-off magnetic sensing.',
        link: '#publications?q=Portable%20Single-Beam',
    },
    { date: '2026-05', category: 'Recognition', title: 'Yoontae Hwang named ICML 2026 Gold Reviewer' },
    {
        date: '2026-05',
        category: 'Publications',
        title: 'Two papers accepted at ICML 2026',
        detail: 'One Main Track paper and one Position Track paper.',
        link: '#publications?q=ICML%202026',
    },
    {
        date: '2025-12',
        category: 'Academic service',
        title: 'Rethinking Financial Time-Series workshop at ICAIF 2025',
        link: 'https://icaif-25-rtfs.github.io/',
        organizing: { title: 'Workshop on Rethinking Financial Time-Series (RTFS)', venue: "ICAIF'25", role: 'Organizer' },
    },
    {
        date: '2025-12',
        category: 'Recognition',
        title: 'Yoontae Hwang receives the Rising Scholar Award',
        detail: 'Korean Academic Society of Business Administration.',
    },
    { date: '2025-09', category: 'Lab milestone', title: 'TSI Lab launches at Pusan National University' },
];

window.TSI_Data.press = [
    {
        date: '2026-11-04',
        outlet: '문화일보',
        title: '“세계 금융AI 학회 논문 8편 채택, 구두발표도 최다”…부산대 황윤태 교수, 글로벌 연구자 제치고 ‘최다 기록’',
        href: 'https://www.munhwa.com/article/11628786',
        research: { label: 'ICAIF 2026 papers', href: '#publications?q=ICAIF%202026' },
    },
    {
        date: '2026-07-30',
        outlet: '랑펀미디어',
        title: "주가 예측만으론 부족…부산대, '투자 결정' 잘하는 AI 개발",
        href: 'https://www.langfunmedia.com/articles/148885',
        note: 'AI 생성 보도기사',
        research: { label: 'ICML 2026 papers', href: '#publications?q=ICML%202026' },
    },
];

const NewsDate = ({ date }) => (
    <time dateTime={date}>{new Date(date).toLocaleDateString('en-GB', {
        timeZone: 'UTC', month: 'short', year: 'numeric', ...(date.length > 7 && { day: 'numeric' }),
    })}</time>
);

window.NewsTabContent = () => (
    <>
        <PageIntro title="News coverage" />
        <ul className="press-list">
            {window.TSI_Data.press.map(article => (
                <li key={article.href}>
                    <article className="press-entry">
                        <div className="press-meta">
                            <NewsDate date={article.date} />
                            <span lang="ko">{article.outlet}</span>
                        </div>
                        <div>
                            <h2 lang="ko"><a href={article.href} target="_blank" rel="noopener noreferrer">{article.title}</a></h2>
                            {article.note && <p className="press-note" lang="ko">{article.note}</p>}
                            <a className="press-research-link" href={article.research.href}>{article.research.label}</a>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    </>
);
