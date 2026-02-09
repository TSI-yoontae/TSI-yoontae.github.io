/**
 * 1. DATA SECTION
 * 요청하신 4개의 논문 정보를 업데이트하여 구성했습니다.
 * - NavFormer: 저자 순서 변경
 * - Forecasting Future Language: 저자 대거 추가 및 제목/Venue 변경
 * - Position Paper: 제목 변경, 공동 1저자(*) 표시
 * - Homophily: 교신 저자(†) 표시 및 신규 추가
 */

const publicationsList = [
    {
        id: "2024",
        title: "NavFormer: IGRF Forecasting in Moving Coordinate Frames",
        authors: [
            { name: "Yoontae Hwang", isHighlight: true },
            { name: "Dongwoo Lee" },
            { name: "Minseok Choi" },
            { name: "Yong Sup Ihn" },
            { name: "Daham Kim" },
            { name: "Deok-Young Lee" }
        ],
        venue: "Submit", // 구체적인 학회명이 있다면 수정해주세요
        topics: ["Time-Series Analysis", "Deep Learning"],
        links: [{ text: "Paper", href: "#" }]
    }
];

const workingPapersList = [
    {
        id: "2025",
        title: "Forecasting Future Language: Context Design for Mention Markets",
        authors: [
            { name: "Sumin Kim" },
            { name: "Jihoon Kwon" },
            { name: "Yoon Kim" },
            { name: "Ahn Wonbin" },
            { name: "Alejandro Lopez-Lira" },
            { name: "Yongjae Lee" },
            { name: "Yoontae Hwang", isHighlight: true },
            { name: "Jaewon Lee" },
            { name: "Raffi Khatchadourian" },
            { name: "Chanyeol Choi" }
        ],
        venue: "Submit (AI Conf Workshop)",
        topics: ["Deep Learning", "Trading"],
        links: []
    },
    {
        id: "2025",
        title: "Evaluating LLMs in Finance Requires Explicit Bias Consideration",
        authors: [
            { name: "Yaxuan Kong*" },
            { name: "Hoyoung Lee*" },
            { name: "Yoontae Hwang*", isHighlight: true },
            { name: "Alejandro Lopez-Lira" },
            { name: "Bradford Levy" },
            { name: "Dhagash Mehta" },
            { name: "Qingsong Wen" },
            { name: "Chanyeol Choi" },
            { name: "Yongjae Lee" },
            { name: "Stefan Zohren" }
        ],
        venue: "Submit",
        topics: ["Deep Learning", "Survey", "AI in Science"],
        links: []
    },
    {
        id: "2025",
        title: "Homophily and Entropy Temperature Scaling for Graph Neural Networks",
        authors: [
            { name: "In Woo Tae" },
            { name: "Yoontae Hwang†", isHighlight: true }, // 교신 저자 표시
            { name: "Yongjae Lee†" } // 교신 저자 표시
        ],
        venue: "Submit",
        topics: ["Deep Learning", "Tabular Modeling"],
        links: []
    }
];

// window 객체에 데이터 할당
window.TSI_Data = {
    publications: publicationsList,
    workingPapers: workingPapersList,
    allPapers: [...publicationsList, ...workingPapersList]
};


/**
 * 2. REACT COMPONENT SECTION
 * 제공해주신 UI 코드를 그대로 유지하되, 위 데이터를 렌더링합니다.
 */

const { useState, useMemo, Fragment } = React;

const PublicationItem = ({ item }) => (
    <li className="space-y-1 py-4 border-b last:border-b-0">
        <p className="text-lg font-semibold text-gray-800">{item.id} {item.title}</p>
        <div className="text-gray-600">
            {item.authors.map((author, index) => (
                <Fragment key={index}>
                    {author.href ? (
                        <a href={author.href} target="_blank" rel="noopener noreferrer" className={`hover:underline ${author.isHighlight ? 'font-bold text-purple-600' : ''}`}>
                            {author.name}
                        </a>
                    ) : (
                        <span className={`${author.isHighlight ? 'font-bold text-purple-600' : ''}`}>{author.name}</span>
                    )}
                    {index < item.authors.length - 1 && ', '}
                </Fragment>
            ))}
        </div>
        <p className="text-gray-500 text-sm">{item.venue}</p>
        {item.award && (
            <p className="text-sm italic" style={{ color: item.awardColor || 'red' }}>
                {item.award}
            </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-blue-600">
                {item.links.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        [{link.text}]
                    </a>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                {item.topics.map(topic => (
                    <span key={topic} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {topic}
                    </span>
                ))}
            </div>
        </div>
    </li>
);

window.PublicationsTabContent = () => {
    // 위에서 정의한 window.TSI_Data를 가져옵니다.
    const publications = window.TSI_Data.publications;
    const workingPapers = window.TSI_Data.workingPapers;
    const allPapers = window.TSI_Data.allPapers;

    const allTopics = useMemo(() => [
        "Time-Series Analysis", "Deep Learning", "Tabular Modeling", "AI in Science",
        "Trading", "Portfolio Theory", "Household Finance", "Survey",
    ], []);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTopics, setActiveTopics] = useState([]);

    const filteredPapers = useMemo(() => {
        return allPapers.filter(paper => {
            const query = searchQuery.toLowerCase();
            const matchesQuery = query === '' ||
                paper.title.toLowerCase().includes(query) ||
                paper.authors.some(a => a.name.toLowerCase().includes(query)) ||
                paper.venue.toLowerCase().includes(query);
            
            const matchesTopics = activeTopics.length === 0 ||
                activeTopics.every(topic => paper.topics.includes(topic));

            return matchesQuery && matchesTopics;
        });
    }, [searchQuery, activeTopics, allPapers]);

    const toggleTopic = (topic) => {
        setActiveTopics(prev =>
            prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
        );
    };

    const filteredPublications = filteredPapers.filter(p => publications.includes(p));
    const filteredWorkingPapers = filteredPapers.filter(p => workingPapers.includes(p));

    return (
        <section className="space-y-8">
            <div className="p-4 bg-white rounded-lg shadow-md sticky top-0 z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by title, author, venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <button onClick={() => { setSearchQuery(''); setActiveTopics([]); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                        Reset Filters
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Filter by Topic:</p>
                    <div className="flex flex-wrap gap-2">
                        {allTopics.map(topic => {
                            const isActive = activeTopics.includes(topic);
                            return (
                                <button
                                    key={topic}
                                    onClick={() => toggleTopic(topic)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {topic}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {filteredPublications.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold">Publications</h2>
                    <p className="mt-2 text-sm text-gray-600"><strong>J</strong>: Journal / <strong>C</strong>: Conference / <strong>*</strong>: equal contribution / <strong>†</strong>: corresponding author </p>
                    <ul className="mt-4">
                        {filteredPublications.map((item, index) => <PublicationItem key={index} item={item} />)}
                    </ul>
                </div>
            )}

            {filteredWorkingPapers.length > 0 && (
                <div className="pt-4">
                    <h2 className="text-2xl font-semibold">Working Paper</h2>
                    <p className="mt-2 text-sm text-gray-600"><strong>S</strong>: Submitted / <strong>W</strong>: Work in progress / <strong>*</strong>: equal contribution / <strong>†</strong>: corresponding author </p>
                    <ul className="mt-4">
                        {filteredWorkingPapers.map((item, index) => <PublicationItem key={index} item={item} />)}
                    </ul>
                </div>
            )}

            {filteredPapers.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No publications match your criteria.</p>
                </div>
            )}
        </section>
    );
};
