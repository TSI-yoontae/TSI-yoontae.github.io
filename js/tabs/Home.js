const SectionTitle = ({ eyebrow, title, description }) => (
    <div className="mb-2.5">
        {eyebrow && <p className="tsi-kicker">{eyebrow}</p>}
        <h2 className="tsi-heading mt-0.5 text-xl">{title}</h2>
        {description && <p className="mt-1 max-w-4xl text-sm leading-5 text-[#5e6676]">{description}</p>}
    </div>
);

const ResearchTopicsSection = () => {
    const researchTopicsData = [
        {
            id: 'finance',
            title: 'AI in Finance',
            items: ['Portfolio Optimization', 'Financial Modeling', 'Goal-based Wealth Management','Time-series for Finance'],
        },
        {
            id: 'market',
            title: 'AI in Market',
            items: ['Betting Modeling (Mainly Polymarket)', "Dark Pool" ,'Sport Science'],
        },
        {
            id: 'foundation',
            title: 'Foundation Model',
            items: ['Foundation Models for Financial Time Series'],
        },
    ];

    return (
        <section className="tsi-section">
            <SectionTitle
                eyebrow="Research Topics"
                title="Core directions"
            />
            <div className="tsi-panel">
                {researchTopicsData.map((topic, index) => (
                    <article key={topic.id} className="tsi-row grid gap-1.5 px-3 py-2.5 md:grid-cols-[170px_1fr] md:gap-4">
                        <div className="flex items-baseline gap-2">
                            <p className="text-[11px] font-extrabold text-[#8a6f3d]">0{index + 1}</p>
                            <h3 className="text-base font-extrabold text-[#172033]">{topic.title}</h3>
                        </div>
                        <div className="tsi-keyword-chain flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm leading-5 md:border-l md:border-[#e9e2d5] md:pl-4">
                            {topic.items.map((item, itemIndex) => (
                                <React.Fragment key={item}>
                                    <span className="tsi-keyword-term">{item}</span>
                                    {itemIndex < topic.items.length - 1 && <span className="tsi-keyword-divider">/</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

const NewsSection = () => {
    const news = [
        { date: 'May 2026', text: "Yoontae Hwang recognized as a Gold Reviewer / Top Reviewer for ICML'26." },
        { date: 'May 2026', text: "Two Financial AI papers accepted to ICML'26." },
        { date: 'Dec 2025', text: 'TSI Lab will host the Workshop on Rethinking Financial Time-Series at ICAIF-25.', link: 'https://icaif-25-rtfs.github.io/' },
        { date: 'Dec 2025', text: 'Selected for the Rising Scholar Award by the Korean Academic Society of Business Administration.' },
        { date: 'Sep 2025', text: 'Time Series Intelligence Lab launches at Pusan National University.' },
    ];

    return (
        <section className="tsi-section">
            <SectionTitle eyebrow="News" title="Latest updates" />
            <div className="tsi-panel">
                {news.map((item, index) => (
                    <div key={index} className="tsi-row grid gap-1 px-3 py-2.5 sm:grid-cols-[105px_1fr] sm:gap-4">
                        <p className="text-[13px] font-bold text-[#746b5d]">{item.date}</p>
                        <p className="text-sm leading-5 text-[#404958]">
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="tsi-link">
                                    {item.text}
                                </a>
                            ) : item.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SelectedPapersSection = () => {
    const selectedPapers = [
        { title: "[ICML'26] Signature-informed Transformer for Asset Allocation", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2510.03129' }, { text: 'code', href: 'https://github.com/Yoontae6719/Signature-Informed-Transformer-For-Asset-Allocation' }] },
        { title: "[ICML'26] Position: Evaluating LLMs in Finance Requires Explicit Bias Consideration", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2602.14233' }, { text: 'code', href: 'https://github.com/Eleanorkong/Awesome-Financial-LLM-Bias-Mitigation' }] },
        { title: "[ACL'25] Time-MQA: Time series multi-task question answering with context enhancement", links: [{ text: 'paper', href: 'https://aclanthology.org/2025.acl-long.1437/' }, { text: 'code', href: 'https://huggingface.co/Time-MQA' }] },
        { title: "[ICAIF'25] Fusing Narrative Semantics for Financial Volatility Forecasting", links: [{ text: 'paper', href: 'https://dl.acm.org/doi/abs/10.1145/3768292.3771256' }, { text: 'code', href: 'https://github.com/Yoontae6719/M2VN-Multi-Modal-Learning-Network-for-Volatility-Forecasting' }] },
        { title: "[AAAI'25] Geodesic Flow Kernels for Semi-Supervised Learning on Mixed-Variable Tabular Dataset", links: [{ text: 'paper', href: 'https://arxiv.org/abs/2412.12864' }, { text: 'code', href: 'https://github.com/Yoontae6719/Geodesic-Flow-Kernels-for-Semi-Supervised-Learning-on-Mixed-Variable-Tabular-Dataset' }, { text: 'seminar@UNIST', href: 'ppt/GFTab_UNIST.pdf' }] },
        { title: "[KDD'24] CAFO: Feature-Centric Explanation on Time Series Classification", links: [{ text: 'paper', href: 'https://arxiv.org/pdf/2406.01833' }, { text: 'code', href: 'https://github.com/eai-lab/CAFO' }] },
        { title: "[ICAIF'23] SimStock: Representation Model for Stock Similarities", links: [{ text: 'paper', href: 'https://dl.acm.org/doi/abs/10.1145/3604237.3626888' }, { text: 'code', href: 'https://github.com/Yoontae6719/SimStock-Representation-Model-for-Stock-Similarities' }] },
    ];

    return (
        <section className="tsi-section">
            <SectionTitle
                eyebrow="Selected Papers"
                title="Representative AI conference papers"
            />
            <ol className="tsi-panel">
                {selectedPapers.map((paper, index) => (
                    <li key={index} className="tsi-row grid gap-2 px-3 py-2.5 sm:grid-cols-[32px_1fr]">
                        <span className="text-[13px] font-bold text-[#8a6f3d]">{index + 1}.</span>
                        <div className="flex min-w-0 items-start justify-between gap-3">
                            <h3 className="min-w-0 flex-1 pr-2 text-sm font-bold leading-5 text-[#172033]">{paper.title}</h3>
                            <div className="flex shrink-0 flex-wrap justify-end gap-x-2 gap-y-1 pt-0.5">
                                {paper.links.map(link => (
                                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="tsi-mini-link whitespace-nowrap">
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
};

const ContactSection = () => (
    <section className="tsi-section">
        <SectionTitle eyebrow="Contact" title="Get in touch" />
        <div className="tsi-panel-muted px-3 py-2.5 text-sm leading-5 text-[#404958]">
            <p><span className="font-semibold text-[#172033]">Email:</span> <a href="mailto:yoontae.hwang@pusan.ac.kr" className="tsi-link">yoontae.hwang@pusan.ac.kr</a></p>
            <p><span className="font-semibold text-[#172033]">Address:</span> Pusan National University, Busan, South Korea</p>
        </div>
    </section>
);

window.HomeTabContent = () => (
    <div className="space-y-5">
        <NewsSection />
        <ResearchTopicsSection />
        <SelectedPapersSection />
        <ContactSection />
    </div>
);
