const SectionTitle = ({ eyebrow, title, description }) => (
    <div className="mb-3">
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{eyebrow}</p>}
        <h2 className="mt-0.5 text-xl font-extrabold tracking-tight text-slate-950">{title}</h2>
        {description && <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-600">{description}</p>}
    </div>
);

const ResearchTopicsSection = () => {
    const researchTopicsData = [
        {
            id: 'finance',
            title: 'AI in Finance',
            description: 'Decision-oriented AI methods for asset management, financial modeling, and real-world financial time series.',
            items: ['Portfolio Optimization', 'Financial Modeling', 'Time-series for Finance'],
        },
        {
            id: 'market',
            title: 'AI in Market',
            description: 'Market-facing intelligence that models information, beliefs, odds, and behavior in dynamic environments.',
            items: ['Betting Modeling (Mainly Polymarket)', 'Sport Science'],
        },
        {
            id: 'foundation',
            title: 'Foundation Model',
            description: 'Domain-specific foundation models that learn reusable representations from financial time-series data.',
            items: ['Foundation Models for Financial Time Series'],
        },
    ];

    return (
        <section className="tsi-section">
            <SectionTitle
                eyebrow="Research Topics"
                title="Core directions"
                description="The lab keeps its agenda around three broad research directions instead of many scattered sub-topics."
            />
            <div className="border border-slate-200 bg-white">
                {researchTopicsData.map((topic, index) => (
                    <article key={topic.id} className="grid gap-2 border-b border-slate-200 px-3 py-3 last:border-b-0 md:grid-cols-[180px_1fr] md:gap-5">
                        <div>
                            <p className="text-[11px] font-bold text-slate-400">0{index + 1}</p>
                            <h3 className="text-base font-extrabold text-slate-950">{topic.title}</h3>
                        </div>
                        <div>
                            <p className="text-sm leading-5 text-slate-600">{topic.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {topic.items.map(item => (
                                    <span key={item} className="border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

const ResearchPhilosophySection = () => (
    <section className="tsi-section">
        <SectionTitle
            eyebrow="Philosophy"
            title="Research that leaves the lab"
            description="We focus on rigorous work that can be tested in realistic markets, communicated clearly, and translated into practical impact."
        />
        <div className="border border-slate-200 bg-white px-3 py-3">
            <blockquote className="border-l-2 border-slate-900 pl-3 text-sm font-semibold leading-5 text-slate-800">
                “Research is meaningful only when its insights leave the lab and change the world.”
            </blockquote>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {[
                    ['Impact-driven', 'Start from concrete problems in finance and markets.'],
                    ['Academically rigorous', 'Build methods and evidence that stand up to top-tier review.'],
                    ['Open and collaborative', 'Share ideas, code, and results when possible.'],
                ].map(([title, body]) => (
                    <div key={title} className="border-t border-slate-100 pt-2 md:border-l md:border-t-0 md:pl-3 md:pt-0">
                        <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                        <p className="mt-0.5 text-sm leading-5 text-slate-600">{body}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const NewsSection = () => {
    const news = [
        { date: 'May 2026', text: "Yoontae Hwang recognized as a Gold Reviewer / Top Reviewer for ICML'26." },
        { date: 'May 2026', text: "Two Financial AI papers accepted to ICML'26." },
        { date: '2025', text: 'TSI Lab will host the Workshop on Rethinking Financial Time-Series at ICAIF-25.', link: 'https://icaif-25-rtfs.github.io/' },
        { date: '2025', text: 'Selected for the Rising Scholar Award by the Korean Academic Society of Business Administration.' },
        { date: 'Sep 2025', text: 'Time Series Intelligence Lab launches at Pusan National University.' },
    ];

    return (
        <section className="tsi-section">
            <SectionTitle eyebrow="News" title="Latest updates" />
            <div className="border border-slate-200 bg-white">
                {news.map((item, index) => (
                    <div key={index} className="grid gap-1 border-b border-slate-100 px-3 py-2.5 last:border-b-0 sm:grid-cols-[105px_1fr] sm:gap-4">
                        <p className="text-[13px] font-bold text-slate-500">{item.date}</p>
                        <p className="text-sm leading-5 text-slate-700">
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-900">
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
                description="A compact list of representative papers. The full searchable archive is available in the Publications tab."
            />
            <ol className="border border-slate-200 bg-white">
                {selectedPapers.map((paper, index) => (
                    <li key={index} className="grid gap-2 border-b border-slate-100 px-3 py-2.5 last:border-b-0 sm:grid-cols-[32px_1fr]">
                        <span className="text-[13px] font-bold text-slate-400">{index + 1}.</span>
                        <div>
                            <h3 className="text-sm font-bold leading-5 text-slate-950">{paper.title}</h3>
                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                {paper.links.map(link => (
                                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">
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
        <div className="border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-700">
            <p><span className="font-semibold text-slate-950">Email:</span> <a href="mailto:yoontae.hwang@pusan.ac.kr" className="underline decoration-slate-300 hover:decoration-slate-900">yoontae.hwang@pusan.ac.kr</a></p>
            <p><span className="font-semibold text-slate-950">Address:</span> Pusan National University, Busan, South Korea</p>
        </div>
    </section>
);

window.HomeTabContent = () => (
    <div className="space-y-5">
        <NewsSection />
        <ResearchTopicsSection />
        <ResearchPhilosophySection />
        <SelectedPapersSection />
        <ContactSection />
    </div>
);
