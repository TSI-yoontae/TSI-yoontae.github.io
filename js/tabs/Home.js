const { useState } = React;

const ResearchPhilosophySection = () => {
     return (
        <section>
            <h2 className="text-2xl font-semibold">Research Philosophy</h2>
            <div className="mt-4 space-y-3 text-gray-700 leading-relaxed bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <blockquote className="text-gray-800 italic border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-md text-base">
                    "Research is meaningful only when its insights leave the lab and change the world."
                </blockquote>
                <p className="pt-2">Our lab's philosophy is built on three core principles:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li><strong>Impact-Driven Inquiry:</strong> We start our research from real-world challenges in finance and science, ensuring our work has practical relevance and can make a tangible impact.</li>
                    <li><strong>Academic Rigor:</strong> We pursue academic excellence by publishing our findings in top-tier venues, contributing novel theories and robust methodologies to the scientific community.</li>
                    <li><strong>Open & Collaborative Spirit:</strong> We believe the best ideas emerge from collaboration. We actively work with partners worldwide and share our code and findings to accelerate collective progress.</li>
                </ul>
            </div>
        </section>
    );
};

const ResearchTopicsSection = () => {
    const { FinanceIcon, ScienceIcon, ModelIcon, AccordionItem } = window;
    
    const researchTopicsData = [
        { id: 1, icon: <FinanceIcon />, title: "AI in Quantitative Finance", content: [{ topic: "Asset Management", subtopics: ["Decision-focused learning", "Portfolio optimization", "Goal-based investing", "Trading strategy*", "Household Finance",] }, { topic: "Financial Modeling", subtopics: ["Investor behavior modeling", "Asset pricing", "Market making", "Order flow analysis",] }, { topic: "Time-Series for Finance", subtopics: ["Volatility forecasting", "Regime-switching models", "Lead-lag detection", "Return Forecasting",] }] },
        { id: 2, icon: <ScienceIcon />, title: "AI in Science with OAQ", content: [{ topic: "Physics & Climate Modeling", subtopics: ["Physics-Informed Neural Networks", "Climate Dynamics Forecasting",] }, { topic: "General Scientific Applications", subtopics: ["GPS Free Autonomous Navigation*", "Magnetic Object Detection*",] }, { topic: "Sport Science", subtopics: ["Player Performance Modeling & Tracking", "Sports Betting",] }] },
        { id: 3, icon: <ModelIcon />, title: "Foundation Model", content: [{ topic: "Model Architecture & Representation", subtopics: ["Foundation Models for Financial Time Series", "Foundation Models for Sports Analytics"] }, { topic: "Advanced Learning Paradigms", subtopics: ["Temporal Domain Generalization", "Learning Strategy", "Tokenizer",] }] }
    ];
    const [openAccordionId, setOpenAccordionId] = useState(null);

    return (
        <section>
            <h2 className="text-2xl font-semibold">Research interests (AI in Time-Series)</h2>
            <p className="mt-2 text-sm text-gray-600">
                Our research focuses on advancing AI for time-series across various domains. Key topics under intensive study are marked with a (work in progress).
            </p>
            <div className="mt-4 border rounded-lg shadow-md bg-white">
                {researchTopicsData.map(item => (
                    <AccordionItem
                        key={item.id}
                        item={item}
                        isOpen={item.id === openAccordionId}
                        onClick={() => setOpenAccordionId(openAccordionId === item.id ? null : item.id)}
                    />
                ))}
            </div>
        </section>
    );
};

window.HomeTabContent = () => {
    const selectedPapers = [
        { title: "Signature-informed Transformer for Asset Allocation", links: [{ text: "paper", href: "https://arxiv.org/abs/2510.03129" }, { text: "code", href: "https://github.com/Yoontae6719/Signature-Informed-Transformer-For-Asset-Allocation" }] },
        { title: "Decision-informed Neural Networks with Large Language Model Integration for Portfolio Optimization", links: [{ text: "paper", href: "https://arxiv.org/abs/2502.00828" }, { text: "code", href: "https://github.com/Yoontae6719/Decision-informed-Neural-Networks-with-Large-Language-Model-Integration-for-Portfolio-Optimization/tree/main" }] },
        { title: "Geodesic Flow Kernels for Semi-Supervised Learning on Mixed-Variable Tabular Dataset", links: [{ text: "paper", href: "https://arxiv.org/abs/2412.12864" }, { text: "code", href: "https://github.com/Yoontae6719/Geodesic-Flow-Kernels-for-Semi-Supervised-Learning-on-Mixed-Variable-Tabular-Dataset" }, { text: "seminar@UNIST", href: "ppt/GFTab_UNIST.pdf" }] },
        { title: "Temporal Representation Learning for Stock Similarities and Its Applications in Investment Management", links: [{ text: "paper", href: "https://arxiv.org/abs/2407.13751" }, { text: "code", href: "https://github.com/Yoontae6719/SimStock-Representation-Model-for-Stock-Similarities" }, { text: "seminar@SKKU", href: "ppt/SimStock_SKKU.pdf" }] }
    ];

    return (
        <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-semibold">Latest News</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                    <li>📢 We will be hosting the <a href="https://icaif-25-rfts.github.io/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors"> Workshop on Rethinking Financial Time-Series: Foundations, Frontiers, and Future Directions </a> 
            at ICAIF-25. Join us! </li>
                    <li>🏆 Selected for the <span className="font-semibold">Rising Scholar Award (2025)</span> by the Korean Academic Society of Business Administration.</li>
                    <li>📢 The Time Series Intelligence Lab (TSI Lab) will launch in September 2025.</li>
                </ul>
            </section>
            
            <ResearchTopicsSection />
            <ResearchPhilosophySection />

            <section>
                <h2 className="text-2xl font-semibold">Selected Papers</h2>
                <ul className="mt-2 space-y-4">
                    {selectedPapers.map((paper, index) => (
                        <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                            <p className="font-semibold text-gray-800">{paper.title}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                {paper.links.map((link) => (
                                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        [{link.text}]
                                    </a>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <div className="pt-10 border-t border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-gray-700"><strong>Email:</strong> yoontae.hwang@pusan.ac.kr</p>
                <p className="text-gray-700"><strong>Address:</strong> Pusan National University, Busan, South Korea</p>
            </div>
        </div>
    );
};