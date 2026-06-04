const SectionTitle = ({ eyebrow, title, description }) => (
    <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>}
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
        <section className="space-y-6">
            <SectionTitle
                eyebrow="Research Topics"
                title="Three core directions"
                description="TSI Lab keeps the research agenda focused around financial intelligence, market intelligence, and foundation models for financial time series."
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {researchTopicsData.map((topic, index) => (
                    <article key={topic.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-slate-950">{topic.title}</h3>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                                0{index + 1}
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{topic.description}</p>
                        <ul className="mt-6 space-y-3">
                            {topic.items.map(item => (
                                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-800">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-slate-900"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
};

const ResearchPhilosophySection = () => (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SectionTitle
            eyebrow="Philosophy"
            title="Research that leaves the lab"
            description="We focus on rigorous research that can be tested in realistic markets, communicated clearly, and translated into practical impact."
        />
        <blockquote className="mt-6 border-l-4 border-slate-900 pl-5 text-base font-medium leading-7 text-slate-800">
            “Research is meaningful only when its insights leave the lab and change the world.”
        </blockquote>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
                ['Impact-driven', 'Start from concrete problems in finance and markets.'],
                ['Academically rigorous', 'Publish methods and evidence that stand up to top-tier review.'],
                ['Open and collaborative', 'Share ideas, code, and results when possible.'],
            ].map(([title, body]) => (
                <div key={title} className="rounded-xl bg-slate-50 p-4">
                    <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
            ))}
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
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle eyebrow="News" title="Latest updates" />
            </div>
            <div className="mt-6 divide-y divide-slate-100">
                {news.map((item, index) => (
                    <div key={index} className="grid gap-2 py-4 sm:grid-cols-[120px_1fr] sm:gap-6">
                        <p className="text-sm font-bold text-slate-500">{item.date}</p>
                        <p className="text-sm leading-6 text-slate-700">
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
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
        <section className="space-y-6">
            <SectionTitle
                eyebrow="Selected Papers"
                title="AI conference papers"
                description="A compact overview of representative conference papers. The full searchable list is available in the Publications tab."
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {selectedPapers.map((paper, index) => (
                    <article key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-bold leading-6 text-slate-950">{paper.title}</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {paper.links.map(link => (
                                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950">
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

window.HomeTabContent = () => (
    <div className="space-y-10">
        <NewsSection />
        <ResearchTopicsSection />
        <ResearchPhilosophySection />
        <SelectedPapersSection />
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle eyebrow="Contact" title="Get in touch" />
            <div className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
                <p><span className="font-semibold text-slate-950">Email:</span> yoontae.hwang@pusan.ac.kr</p>
                <p><span className="font-semibold text-slate-950">Address:</span> Pusan National University, Busan, South Korea</p>
            </div>
        </section>
    </div>
);
