window.TSI_Data = {};

window.TSI_Data.reviewStartYear = 2025;
window.TSI_Data.news = [
    { date: 'Oct 2026', category: 'Publication', text: 'Eight papers from TSI Lab accepted to ICAIF 2026, including four oral presentations.' },
    {
        date: 'Sep 2026',
        category: 'Academic service',
        text: "Yoontae Hwang will serve as an organizer of the workshop \"FinFM: Foundation Models and Generative AI for Finance\" at AAAI'27.",
        link: 'https://finfm.finhorizons.org/',
        organizing: { title: 'FinFM: Foundation Models and Generative AI for Finance', venue: "AAAI'27", role: 'Organizer' },
    },
    { date: 'Sep 2026', category: 'Publication', text: "One paper (Graph Neural Network) accepted to NeurIPS'26 (Top Tier AI Conference; CORE A*)." },
    { date: 'Sep 2026', category: 'Publication', text: "One paper accepted to Expert systems with applications(6/109; Top 5.5%)." },
    { date: 'Aug 2026', category: 'Research funding', text: "한국연구재단(NRF) 글로컬R&D 사업 선정, 3년간 최대 6억 원 연구비 확보" },
    { date: 'Jun 2026', category: 'Publication', text: "One paper accepted to Journal of Applied Physics." },
    { date: 'May 2026', category: 'Recognition', text: "Yoontae Hwang recognized as a Gold Reviewer (Top Reviewer) for ICML'26." },
    { date: 'May 2026', category: 'Publication', text: "Two Financial AI papers accepted to ICML'26 (Top Tier AI Confernece; CORE A*)." },
    {
        date: 'Dec 2025',
        category: 'Academic service',
        text: 'TSI Lab will host the Workshop on Rethinking Financial Time-Series at ICAIF-25.',
        link: 'https://icaif-25-rtfs.github.io/',
        organizing: { title: 'Workshop on Rethinking Financial Time-Series (RTFS)', venue: "ICAIF'25", role: 'Organizer' },
    },
    { date: 'Dec 2025', category: 'Recognition', text: 'Selected for the Rising Scholar Award by the Korean Academic Society of Business Administration.' },
    { date: 'Sep 2025', category: 'Lab milestone', text: 'Time Series Intelligence Lab launches at Pusan National University.' },
];
 
// Verified venue statistics. Reference years are displayed separately from paper years.
// Sources, denominators, and unavailable metrics are documented in README.md.
window.TSI_Data.conferenceRankings = {
    NeurIPS: { rank: 'A*', source: 'https://portal.core.edu.au/conf-ranks/?search=NeurIPS&by=all&source=all&sort=atitle&page=1' },
    ICML: { rank: 'A*', source: 'https://portal.core.edu.au/conf-ranks/?search=ICML&by=all&source=all&sort=atitle&page=1' },
    ACL: { rank: 'A*', source: 'https://portal.core.edu.au/conf-ranks/196/' },
    AAAI: { rank: 'A*', source: 'https://portal.core.edu.au/conf-ranks/?search=AAAI&by=all&source=all&sort=atitle&page=1' },
    KDD: { rank: 'A*', source: 'https://portal.core.edu.au/conf-ranks/26/' },
};
window.TSI_Data.venueMetrics = {
    'neurips-2026': {
        conference: 'NeurIPS',
        acceptance: { rate: 24.52, year: 2025, source: 'https://blog.neurips.cc/2025/09/30/reflections-on-the-2025-review-process-from-the-program-committee-chairs/' },
    },
    'icml-2026-position': {
        conference: 'ICML',
        acceptance: { rate: 100 * 215 / 742, year: 2026, source: 'https://www.linkedin.com/posts/icmlconf_decision-notifications-are-being-released-activity-7455685189479055361-PXq3' },
    },
    'icml-2026-main': {
        conference: 'ICML',
        acceptance: { rate: 100 * 6552 / 24661, year: 2026, source: 'https://media.icml.cc/Conferences/ICML2026/ICML2026_Fact_Sheet.pdf' },
    },
    'icaif-2025': {
        acceptance: { rate: 100 * 113 / 349, year: 2025, source: 'https://www.linkedin.com/posts/6estates_icaif2025-aiinfinance-financialai-activity-7402715238133125120-fZu5' },
        oral: { selected: 54, accepted: 113, year: 2025, source: 'https://icaif25.org/overview/' },
    },
    'acl-2025': {
        conference: 'ACL',
        acceptance: { rate: 20.3, year: 2025, source: 'https://aclanthology.org/2025.acl-long.0.pdf' },
    },
    'aaai-2025': {
        conference: 'AAAI',
        acceptance: { rate: 23.4, year: 2025, source: 'https://aaai.org/wp-content/uploads/2025/06/Sponsorship-Infographic-v2.pdf' },
    },
    'kdd-2024': {
        conference: 'KDD',
        acceptance: { rate: 100 * 411 / 2046, year: 2024, source: 'https://dbjapan.dbsj.org/archives/list/dbjapan@dbsj.org/thread/WLM3OFAMFXYZDJZM2ZSEXMHAOUPHNAOH/' },
    },
    'icaif-2023': {
        acceptance: { rate: 100 * 79 / 200, year: 2023, source: 'https://note.com/japan_d2/n/n6e06bf3a07c2' },
    },
    'quantitative-finance': {
        acceptance: { rate: 23, year: 2025, source: 'https://www.tandfonline.com/action/journalInformation?journalCode=rquf20&show=instructions' },
    },
};

window.TSI_Data.publications = [
    // Keep NeurIPS and ICML papers at the top of the archive.
    {
        id: "[C17]",
        title: "HoTS: Homophily-Aware Temperature Scaling for Graph Neural Network Calibration",
        authors: [
            { name: "In Woo Tae", affiliations: ["UNIST"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Yongjae Lee†", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST", "LinqAlpha"] }
        ],
        venue: "NeurIPS 2026 · Main Track · Accepted",
        metricsKey: 'neurips-2026',
        links: [
            { text: "paper", href: "https://openreview.net/forum?id=woxrGUwgJ3" },
            { text: "arXiv", href: "https://arxiv.org/abs/2609.32426" }
        ],
        topics: ["Graph Neural Networks", "Deep Learning"]
    },
    { 
        id: "[C16]",
        title: "Evaluating LLMs in Finance Requires Explicit Bias Consideration", 
        authors: [ 
            { name: "Yaxuan Kong*", href: "https://scholar.google.com/citations?user=NWq7sGMAAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Hoyoung Lee*", affiliations: ["UNIST"] },
            { name: "Yoontae Hwang*", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Alejandro Lopez-Lira", affiliations: ["University of Florida"] },
            { name: "Bradford Levy", affiliations: ["University of Chicago Booth School of Business"] },
            { name: "Dhagash Mehta", affiliations: ["BlackRock"] },
            { name: "Qingsong Wen", href: "https://scholar.google.com/citations?user=vjPJvwYAAAAJ&hl=en", affiliations: ["Squirrel Ai Learning", "University of Oxford"] },
            { name: "Chanyeol Choi", affiliations: ["LinqAlpha"] },
            { name: "Yongjae Lee†", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] },
            { name: "Stefan Zohren†", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] }
        ], 
        venue: "ICML 2026 · Position Track",
        metricsKey: 'icml-2026-position',
        links: [ { text: "paper", href: "https://arxiv.org/pdf/2602.14233v1" } ], 
        topics: ["Large Language Models", "Finance", "Bias"] 
    },
    { 
        id: "[C15]",
        title: "Signature-informed Transformer for Asset Allocation", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] }
        ], 
        venue: "ICML 2026 · Main Track",
        metricsKey: 'icml-2026-main',
        links: [ 
            { text: "paper", href: "https://arxiv.org/abs/2510.03129" }, 
            { text: "code", href: "https://github.com/Yoontae6719/Signature-Informed-Transformer-For-Asset-Allocation" } 
        ], 
        topics: ["Portfolio Theory", "Deep Learning"] 
    },
    {
        id: "[C14]",
        title: "The Division of Research: Information Access and Independent-Book Capacity in LLM Investment Teams",
        authors: [
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        links: [],
        topics: ["Large Language Models", "Portfolio Theory", "Finance"]
    },
    {
        id: "[C13]",
        title: "AlphaLeak: What ‘Blind’ LLM Trading Benchmarks Still See",
        authors: [
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        presentation: 'Oral',
        links: [],
        topics: ["Large Language Models", "Trading", "Finance"]
    },
    {
        id: "[C12]",
        title: "Semantic Credibility Cold-Start Priors for Novel Insurance Claim Codes with LLM Embeddings",
        authors: [
            { name: "Yejin Kim", href: "https://scholar.google.com/citations?user=RT2PhEsAAAAJ&hl=ko", affiliations: ["Meritz Fire & Marine Insurance"] },
            { name: "Junhyung Kim", affiliations: ["Meritz Fire & Marine Insurance"] },
            { name: "Youngbin Lee", href: "https://scholar.google.com/citations?user=iPgVqcEAAAAJ&hl=ko", affiliations: ["Elice"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        links: [],
        topics: ["Large Language Models", "Finance"]
    },
    {
        id: "[C11]",
        title: "CallRank: Isolating What Changed in Earnings-Call Q&A for Sector Ranking and Cost-Adjusted Alpha",
        authors: [
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Hyeonjun Yeo", affiliations: ["Seoul National University"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        presentation: 'Oral',
        links: [],
        topics: ["Natural Language Processing", "Trading", "Finance"]
    },
    {
        id: "[C10]",
        title: "Decision-Focused Learning of the Gerber Threshold",
        authors: [
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        presentation: 'Oral',
        links: [],
        topics: ["Optimization", "Finance"]
    },
    {
        id: "[C9]",
        title: "SlipClock: A Conditional Displayed-Depth Cost Benchmark for Evaluating Financial AI Strategies in Crypto Futures",
        authors: [
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        links: [],
        topics: ["Trading", "Finance"]
    },
    {
        id: "[C8]",
        title: "Metropolitan Housing Signals for Treasury Duration Risk Management",
        authors: [
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Hyeonjun Yeo", affiliations: ["Seoul National University"] },
            { name: "Gyuil Jung", affiliations: ["Mirae Asset Securities"] },
            { name: "Jeongkyoo You", affiliations: ["Mirae Asset Securities"] },
            { name: "Minsuk Sung", affiliations: ["Korea University"] },
            { name: "Donghwa Seo", affiliations: ["DS Investment & Securities"] },
            { name: "Minjae Lee", affiliations: ["Independent Researcher"] },
            { name: "Seunghan Son", affiliations: ["Independent Researcher"] },
            { name: "Juyeong Lee", affiliations: ["EY Consulting"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        links: [],
        topics: ["Household Finance", "Time-Series Analysis", "Finance"]
    },
    {
        id: "[C7]",
        title: "Neural Estimation of Irreversibility in Real and Simulated Limit Order Book Paths",
        authors: [
            { name: "Hyeonjun Yeo", affiliations: ["Seoul National University"] },
            { name: "Doohwi Cha", affiliations: ["Mirae Asset Securities"] },
            { name: "Yoontae Hwang†", isHighlight: true, affiliations: ["Pusan National University"] }
        ],
        venue: "ICAIF 2026 · Main Track · Accepted",
        metricsKey: 'icaif-2025',
        presentation: 'Oral',
        links: [],
        topics: ["Time-Series Analysis", "Trading", "Deep Learning"]
    },
    {
        id: "[J8]",
        title: "Decision-informed Neural Networks with Large Language Model Integration for Portfolio Optimization",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Yaxuan Kong", href: "https://scholar.google.com/citations?user=NWq7sGMAAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST", "LinqAlpha"] }
        ],
        venue: "Expert Systems with Applications · 2026 · Accepted",
        award: "Rising Scholar Award @the Korean Academic Society of Business Administration 2025",
        links: [
            { text: "paper", href: "https://www.sciencedirect.com/science/article/pii/S0957417426032938" },
            { text: "code", href: "https://github.com/Yoontae6719/Decision-informed-Neural-Networks-with-Large-Language-Model-Integration-for-Portfolio-Optimization/tree/main" }
        ],
        topics: ["Portfolio Theory", "Deep Learning"]
    },
    { 
        id: "[C6]", 
        title: "Forecasting Future Language: Context Design for Mention Markets", 
        authors: [ 
            { name: "Sumin Kim", affiliations: ["LinqAlpha"] },
            { name: "Jihoon Kwon", affiliations: ["LinqAlpha"] },
            { name: "Yoon Kim", affiliations: ["Massachusetts Institute of Technology"] },
            { name: "Ahn Wonbin", affiliations: ["LG AI Research"] },
            { name: "Alejandro Lopez-Lira", affiliations: ["University of Florida"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] },
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Jaewon Lee", affiliations: ["Seoul National University"] },
            { name: "Raffi Khatchadourian", affiliations: ["IBM"] },
            { name: "Chanyeol Choi", affiliations: ["LinqAlpha"] }
        ], 
        venue: "ICLR 2026 · Workshop · Accepted; submitted to another venue",
        links: [ { text: "paper", href: "https://arxiv.org/pdf/2602.21229" } ], 
        topics: ["Natural Language Processing", "Finance"] 
    },
    { 
        id: "[J7]", 
        title: "Portable Single-Beam Atomic Total-Field Magnetometer for Stand-off Magnetic Sensing", 
        authors: [ 
            { name: "Heonsik Lee", affiliations: ["OAQ Co. Ltd."] },
            { name: "Hyunbeen Lee", affiliations: ["OAQ Co. Ltd."] },
            { name: "Minseok Choi", affiliations: ["OAQ Co. Ltd.", "KAIST"] },
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Deok-Young Lee", affiliations: ["OAQ Co. Ltd.", "KAIST", "Arrakis Technologies Corp."] }
        ], 
        venue: "Journal of Applied Physics · 2026",
        links: [ { text: "paper", href: "https://arxiv.org/abs/2601.08716v1" } ], 
        topics: ["AI in Science"] 
    },
    { 
        id: "[J6]", 
        title: "Deep Learning in Asset Management: Architectures, Applications, and Challenges", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Youngbin Lee", href: "https://scholar.google.com/citations?user=iPgVqcEAAAAJ&hl=ko", affiliations: ["Elice"] },
            { name: "Junhyeong Lee", href: "https://www.notion.so/unist-felab/Junhyeong-Lee-f6429c27e45d44ad84222b5232f7d1cb", affiliations: ["UNIST"] },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Jang Ho Kim", href: "https://scholar.google.co.kr/citations?hl=ko&authuser=1&user=uTiqWBMAAAAJ", affiliations: ["Korea University"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=en", affiliations: ["UNIST"] },
            { name: "Woo Chang Kim", href: "https://scholar.google.co.kr/citations?user=7NmBs1kAAAAJ&hl=en", affiliations: ["KAIST"] },
            { name: "Frank J Fabozzi", href: "https://scholar.google.com/citations?user=tqXS4IMAAAAJ&hl=en", affiliations: ["Johns Hopkins University"] }
        ], 
        venue: "The Journal of Portfolio Management · 2025",
        links: [{ text: "paper", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5593850" }], 
        topics: ["Portfolio Theory", "Deep Learning", "Survey"] 
    },
    { 
        id: "[C5]", 
        title: "Fusing Narrative Semantics for Financial Volatility Forecasting", 
        authors: [ 
            { name: "Yaxuan Kong*", href: "https://scholar.google.com/citations?user=NWq7sGMAAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Yoontae Hwang*", isHighlight: true, affiliations: ["Pusan National University"] },
            { name: "Marcus Kaiser", affiliations: ["Deutsche Bank AG"] },
            { name: "Chris Vryonides", affiliations: ["Deutsche Bank AG"] },
            { name: "Roel Oomen", affiliations: ["Deutsche Bank AG"] },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] }
        ], 
        venue: "ICAIF 2025 · Main Track",
        metricsKey: 'icaif-2025',
        award: "Oxford & Deutsche Bank Project", 
        links: [ 
            { text: "paper", href: "https://arxiv.org/abs/2510.20699" }, 
            { text: "code", href: "https://github.com/Yoontae6719/M2VN-Multi-Modal-Learning-Network-for-Volatility-Forecasting" } 
        ], 
        topics: ["Time-Series Analysis", "Deep Learning"] 
    },
    { 
        id: "[C4]", 
        title: "Time-MQA: Time Series Multi-Task Question Answering with Context Enhancement", 
        authors: [ 
            { name: "Yaxuan Kong*", href: "https://scholar.google.com/citations?user=NWq7sGMAAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Yiyuan Yang*", href: "https://scholar.google.co.kr/citations?user=FUuGvZIAAAAJ&hl=en", affiliations: ["University of Oxford", "PyPOTS Research"] },
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["University of Oxford"] },
            { name: "Wenjie Du", href: "https://scholar.google.com/citations?user=j9qvUg0AAAAJ&hl=en", affiliations: ["PyPOTS Research"] },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] },
            { name: "Zhangyang Wang", href: "https://scholar.google.com/citations?user=pxFyKAIAAAAJ&hl=en", affiliations: ["University of Texas at Austin"] },
            { name: "Ming Jin", href: "https://scholar.google.com/citations?user=I2xvKaIAAAAJ&hl=en", affiliations: ["Griffith University"] },
            { name: "Qingsong Wen", href: "https://scholar.google.com/citations?user=vjPJvwYAAAAJ&hl=en", affiliations: ["University of Oxford", "Squirrel Ai Learning"] }
        ], 
        venue: "ACL 2025 · Main Track",
        metricsKey: 'acl-2025',
        links: [ 
            { text: "paper", href: "https://arxiv.org/abs/2503.01875" }, 
            { text: "Hugging Face", href: "https://huggingface.co/Time-MQA" } 
        ], 
        topics: ["Time-Series Analysis", "Deep Learning"] 
    },
    { 
        id: "[C3]", 
        title: "Geodesic Flow Kernels for Semi-Supervised Learning on Mixed-Variable Tabular Dataset", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["University of Oxford"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] }
        ], 
        venue: "AAAI 2025 · Main Track",
        metricsKey: 'aaai-2025',
        links: [ 
            { text: "paper", href: "https://arxiv.org/abs/2412.12864" }, 
            { text: "code", href: "https://github.com/Yoontae6719/Geodesic-Flow-Kernels-for-Semi-Supervised-Learning-on-Mixed-Variable-Tabular-Dataset" }, 
            { text: "seminar@UNIST", href: "ppt/GFTab_UNIST.pdf" } 
        ], 
        topics: ["Tabular Modeling", "Deep Learning"] 
    },
    { 
        id: "[C2]", 
        title: "CAFO: Feature-Centric Explanation on Time Series Classification", 
        authors: [ 
            { name: "Jaeho Kim", href: "https://sites.google.com/view/jaeho-kim", affiliations: ["UNIST"] },
            { name: "Seok-ju Hahn", href: "https://vaseline555.github.io/", affiliations: ["UNIST"] },
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] },
            { name: "Junghye Lee", href: "https://d3mlab.snu.ac.kr/members/principal-investigator", affiliations: ["Seoul National University"] },
            { name: "Seulki Lee", href: "https://scholar.google.com/citations?hl=en&user=qhI7uVMAAAAJ", affiliations: ["UNIST"] }
        ], 
        venue: "KDD 2024 · Research Track",
        metricsKey: 'kdd-2024',
        award: "Best Poster Award, @UNIST AI Tech Workshop 2024", 
        links: [ 
            { text: "paper", href: "https://arxiv.org/abs/2406.01833" }, 
            { text: "code", href: "https://github.com/eai-lab/CAFO" } 
        ], 
        topics: ["Time-Series Analysis", "Deep Learning"] 
    },
    { 
        id: "[C1]", 
        title: "SimStock : Representation Model for Stock Similarities", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] },
            { name: "Junhyeong Lee", href: "https://www.notion.so/unist-felab/Junhyeong-Lee-f6429c27e45d44ad84222b5232f7d1cb", affiliations: ["UNIST"] },
            { name: "Daham Kim", href: "https://www.linkedin.com/in/daham-kim/", affiliations: ["Cornell University"] },
            { name: "Seunghwan Noh", affiliations: ["UNIST"] },
            { name: "Joohwan Hong", href: "https://www.notion.so/unist-felab/Joohwan-Hong-Ph-D-a93266780e6a407a866e8b7ec7d47129", affiliations: ["UNIST"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] }
        ], 
        venue: "ICAIF 2023 · Main Track",
        metricsKey: 'icaif-2023',
        presentation: 'Oral',
        links: [ 
            { text: "paper", href: "https://dl.acm.org/doi/10.1145/3604237.3626888" }, 
            { text: "code", href: "https://github.com/Yoontae6719/SimStock-Representation-Model-for-Stock-Similarities" }, 
            { text: "seminar@SKKU", href: "ppt/SimStock_SKKU.pdf" } 
        ], 
        topics: ["Trading", "Deep Learning"] 
    },
    { 
        id: "[J5]", 
        title: "Heterogeneous Trading Behaviors of Individual Investors", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] },
            { name: "Junpyo Park", href: "https://www.notion.so/unist-felab/Junpyo-Park-187b74eaaae847a98175664018bebea8", affiliations: ["UNIST"] },
            { name: "Jang Ho Kim", href: "https://scholar.google.co.kr/citations?hl=ko&authuser=1&user=uTiqWBMAAAAJ", affiliations: ["Korea University"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] },
            { name: "Frank J Fabozzi", href: "https://scholar.google.com/citations?user=tqXS4IMAAAAJ&hl=en", affiliations: ["Johns Hopkins University"] }
        ], 
        venue: "Finance Research Letters (FRL) · 2023",
        links: [{ text: "paper", href: "https://www.sciencedirect.com/science/article/abs/pii/S1544612324005117" }], 
        topics: ["Trading", "Deep Learning"] 
    },
    { 
        id: "[J4]", 
        title: "Identifying household finance heterogeneity via deep clustering", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] },
            { name: "Frank J Fabozzi", href: "https://scholar.google.com/citations?user=tqXS4IMAAAAJ&hl=en", affiliations: ["EDHEC Business School"] }
        ], 
        venue: "Annals of Operations Research (ANOR) · 2023",
        links: [{ text: "paper", href: "https://link.springer.com/article/10.1007/s10479-022-04900-3" }], 
        topics: ["Household Finance", "Deep Learning"] 
    },
    { 
        id: "[J3]", 
        title: "Household Financial Health: A Machine Learning Approach for Data-Driven Diagnosis and Prescription", 
        authors: [ 
            { name: "Kyeongbin Kim*", href: "https://www.linkedin.com/in/kimkyle95/", affiliations: ["UNIST"] },
            { name: "Yoontae Hwang*", isHighlight: true, isUnderlined: false, affiliations: ["UNIST"] },
            { name: "Dongcheol Lim", href: "https://www.linkedin.com/in/dongclim0613/", affiliations: ["Seoul National University"] },
            { name: "Suhyeon Kim", href: "https://www.linkedin.com/in/sh-kim1026/", affiliations: ["Kyungpook National University"] },
            { name: "Junghye Lee", href: "https://d3mlab.snu.ac.kr/members/principal-investigator", affiliations: ["Seoul National University"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] }
        ], 
        venue: "Quantitative Finance (QF) · 2023",
        metricsKey: 'quantitative-finance',
        award: "Commendation Award, @Commissioner of Statistics Korea 2020", 
        links: [{ text: "paper", href: "https://www.tandfonline.com/doi/full/10.1080/14697688.2023.2254335" }], 
        topics: ["Household Finance", "Deep Learning"] 
    },
    { 
        id: "[J2]", 
        title: "Stop-loss adjusted labels for machine learning-based trading of risky assets", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] },
            { name: "Junpyo Park", href: "https://www.notion.so/unist-felab/Junpyo-Park-187b74eaaae847a98175664018bebea8", affiliations: ["UNIST"] },
            { name: "Dong-Young Lim", href: "https://sites.google.com/view/dlim/group?authuser=0", affiliations: ["UNIST"] },
            { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] }
        ], 
        venue: "Finance Research Letters (FRL) · 2023",
        links: [ 
            { text: "paper", href: "https://www.sciencedirect.com/science/article/abs/pii/S1544612323006578" }, 
            { text: "code", href: "https://github.com/Yoontae6719/Stop-loss-adjusted-labels" } 
        ], 
        topics: ["Trading", "Deep Learning"] 
    },
    { 
        id: "[J1]", 
        title: "A Study on the Estimation of Apartment Price Index: Focused on the Machine Learning Algorithm", 
        authors: [{ name: "Yoontae Hwang", isHighlight: true, affiliations: ["Sangmyung University"] }],
        venue: "Journal of Money & Finance (KMFA) · 2019 · South Korea",
        links: [{ text: "paper", href: "https://kiss.kstudy.com/Detail/Ar?key=3707638" }], 
        topics: ["Household Finance", "Time-Series Analysis", "Deep Learning"] 
    }
];

window.TSI_Data.workingPapers = [

    {
        id: "[S]",
        title: "Trading Time Effect",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true },
            { name: "Jae Gyeong Choi" }
        ],
        venue: "Finance Journal, 2026.05",
        links: [ { text: "code", href: "https://github.com/TSI-yoontae/Trading-Time-and-the-Allocation-of-Global-Information" }, ],
    },
    {
        id: "[W]",
        title: "Stop Loss Decisions",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true },
            { name: "Mihai Cucuringu" }
        ],
        venue: "Finance Journal, 2026.07",
        links: [ { text: "code", href: "https://github.com/TSI-yoontae/Counterfactual-First-Passage-Learning-for-Stop-Loss-Decisions" }, ],
    },
    {
        id: "[W]",
        title: "Signature-V2",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true },
            { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en" }
        ],
        venue: "Top AI Conference",
        links: []
    },
    {
        id: "[W]",
        title: "Denoising Predictive Closure",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true }
        ],
        venue: "Top AI Conference",
        links: []
    },
    { 
        id: "[S]", 
        title: "Portfolio Preference Elicitation in Institutional Crossing Markets", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University"] }
        ], 
        venue: "Optimization journal",
        links: [ { text: "paper", href: "https://arxiv.org/abs/2605.21409" }, { text: "code", href: "https://github.com/TSI-yoontae/Portfolio-Preference-Elicitation-in-Institutional-Crossing-Markets" }, ],
        topics: ["Portfolio Theory", "Optimization"] 
    },
    { id: "[S]", title: "Temporal Representation Learning for Stock Similarities and Its Applications in Investment Management", authors: [ { name: "Yoontae Hwang", isHighlight: true, affiliations: ["UNIST"] }, { name: "Stefan Zohren", href: "https://scholar.google.co.uk/citations?user=mtNQD-8AAAAJ&hl=en", affiliations: ["University of Oxford"] }, { name: "Yongjae Lee", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] }, ], venue: "Finance Journal, 2024.12", award: "Best Paper Award @the Korean Academic Society of Business Administration 2024", links: [ { text: "paper", href: "https://arxiv.org/abs/2407.13751" }, { text: "code", href: "https://github.com/Yoontae6719/SimStock-Representation-Model-for-Stock-Similarities" }, ], topics: ["Trading", "Portfolio Theory", "Deep Learning"] },
    { id: "[S]", title: "LLM-Enhanced Black-Litterman Portfolio Optimization", authors: [ { name: "Youngbin Lee*", href: "https://scholar.google.com/citations?user=iPgVqcEAAAAJ&hl=ko", affiliations: ["Elice", "AI Quant Lab, MODULABS"] }, { name: "Yejin Kim*", href: "https://scholar.google.com/citations?user=RT2PhEsAAAAJ&hl=ko", affiliations: ["Meritz Fire & Marine Insurance", "AI Quant Lab, MODULABS"] }, { name: "Juhyeong Kim", affiliations: ["Mirae Asset Global Investments", "AI Quant Lab, MODULABS"] }, { name: "Suin Kim", affiliations: ["Elice"] }, { name: "Yoontae Hwang†", isHighlight: true },  { name: "Yongjae Lee†", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] } ], venue: "Finance Journal, 2024.12", links: [ { text: "paper", href: "https://arxiv.org/abs/2504.14345" }, { text: "code", href: "https://github.com/youngandbin/LLM-BLM" }, ], topics: ["Trading", "Portfolio Theory", "Deep Learning"] },
    { id: "[W]", title: "Decision by Supervised Learning", authors: [ { name: "Juhyeong Kim", affiliations: ["Mirae Asset Global Investments", "AI Quant Lab, MODULABS"] }, { name: "Sungyoon Cho" }, { name: "Youngbin Lee", affiliations: ["Elice", "AI Quant Lab, MODULABS"] }, { name: "Yejin Kim", affiliations: ["Meritz Fire & Marine Insurance", "AI Quant Lab, MODULABS"] }, { name: "Yongmin Choi" },   { name: "Yoontae Hwang†", isHighlight: true },  { name: "Yongjae Lee†", href: "https://scholar.google.co.kr/citations?user=dAMXPRcAAAAJ&hl=ko", affiliations: ["UNIST"] } ], venue: "Finance Journal, 2026.02", links: [ { text: "paper", href: "https://arxiv.org/abs/2503.13544" }, { text: "code", href: "https://github.com/DSLwDE/DSLwDE" }, ], topics: ["Trading", "Portfolio Theory", "Deep Learning"] },
    { 
        id: "[S]", 
        title: "NavFormer: IGRF Forecasting in Moving Coordinate Frames", 
        authors: [ 
            { name: "Yoontae Hwang", isHighlight: true, affiliations: ["Pusan National University", "OAQ Co. Ltd.", "Arrakis Technologies Corp."] },
            { name: "Dongwoo Lee", affiliations: ["KAIST"] },
            { name: "Minseok Choi", affiliations: ["OAQ Co. Ltd.", "Arrakis Technologies Corp.", "KAIST"] },
            { name: "Yong Sup Ihn", affiliations: ["Agency for Defense Development"] },
            { name: "Daham Kim", href: "https://www.linkedin.com/in/daham-kim/", affiliations: ["OAQ Co. Ltd.", "Arrakis Technologies Corp."] },
            { name: "Deok-Young Lee", affiliations: ["OAQ Co. Ltd.", "Arrakis Technologies Corp.", "KAIST"] }
        ], 
        venue: "Submitted to Top AI Confernece",
        links: [ { text: "paper", href: "https://arxiv.org/pdf/2601.18800" } ], 
        topics: ["Time-Series Analysis", "AI in Science"]  
    },
];

window.TSI_Data.allPapers = [...window.TSI_Data.publications, ...window.TSI_Data.workingPapers];


window.TSI_Data.membersData = [
    { 
        name: "Prof. Yoontae Hwang", 
        koreanName: "황윤태", 
        status: "Principal Investigator", 
        image: "/image_yoontae.png", 
        email: "yoontae.hwang@pusan.ac.kr", 
        bio: `I am an Assistant Professor at the Graduate School of Data Science, Pusan National University, South Korea, starting from September 2025. Prior to this, I worked as a Postdoctoral Researcher at the University of Oxford under the Sejong Science Fellowship, collaborating with Professor Stefan Zohren. I received my Ph.D. in Industrial Engineering from UNIST in 2024, where I was advised by Professor Yongjae Lee. Guided by the belief that “Research is meaningful only when its insights leave the lab and change the world,” our laboratory not only submits its findings to the most prestigious journals and conferences but also pursues research capable of driving substantial real-world impact.`, 
        links: { scholar: "https://scholar.google.co.kr/citations?user=sdbNclwAAAAJ&hl", linkedin: "https://www.linkedin.com/in/yoontae" },
        awards: [
            { title: "Advisor (Industry Position; until Feb. 2026)", year: 2026, organization: "OAQ" },
            { title: "Rising Scholar Award", year: 2025, organization: "Korean Academic Society of Business Administration" },
            { title: "Best Paper Award", year: 2024, organization: "Korean Academic Society of Business Administration" },
            { title: "Best Poster Award", year: 2024, organization: "UNIST AI Tech Workshop" },
            { title: "Commendation Award", year: 2020, organization: "Commissioner of Statistics Korea" },
        ]
    },
    { name: "정은기", status: "PhD Student" },
    { name: "윤동현", status: "MS Student" },
    { name: "양승현", status: "MS Student" },
    { name: "편재윤", status: "MS Student" },
    { name: "정승길", status: "MS Student" },
    { name: "김태환", status: "MS Student" },
    { name: "김연주", status: "MS Student" },
    { name: "강지석", status: "MS Student" },
    { name: "김형철", status: "MS Student" },
    { name: "박지수", status: "MS Student" },
    { name: "박수혜", status: "MS Student" },
    { name: "박은지", status: "MS Student" },
    { name: "이종혁", status: "MS Student" },
    { name: "이승후", status: "MS Student" },
    { name: "서민걸", status: "MS Student" },
    { name: "백승민", status: "MS Student" },
];
