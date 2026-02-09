const { useState, useMemo, Fragment } = React;

const PublicationItem = ({ item }) => (
    <li className="space-y-1 py-4 border-b last:border-b-0">
        <p className="text-lg font-semibold text-gray-800">{item.id} {item.title}</p>
        <div className="text-gray-600">
            {/* authors가 없을 경우를 대비해 빈 배열 처리 */}
            {(item.authors || []).map((author, index) => (
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
        
        {/* venue가 있을 때만 렌더링 */}
        {item.venue && <p className="text-gray-500 text-sm">{item.venue}</p>}
        
        {item.award && (
            <p className="text-sm italic" style={{ color: item.awardColor || 'red' }}>
                {item.award}
            </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-blue-600">
                {(item.links || []).map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        [{link.text}]
                    </a>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                {(item.topics || []).map(topic => (
                    <span key={topic} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {topic}
                    </span>
                ))}
            </div>
        </div>
    </li>
);

window.PublicationsTabContent = () => {
    // 데이터가 아직 로드되지 않았을 경우를 위한 방어 코드
    if (!window.TSI_Data) {
        return <div className="p-4 text-gray-500">Loading data...</div>;
    }

    const publications = window.TSI_Data.publications || [];
    const workingPapers = window.TSI_Data.workingPapers || [];
    const allPapers = window.TSI_Data.allPapers || [];

    const allTopics = useMemo(() => [
        "Time-Series Analysis", "Deep Learning", "Tabular Modeling", "AI in Science",
        "Trading", "Portfolio Theory", "Household Finance", "Survey",
    ], []);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTopics, setActiveTopics] = useState([]);

    const filteredPapers = useMemo(() => {
        return allPapers.filter(paper => {
            const query = searchQuery.toLowerCase();
            
            // [중요 수정] 데이터가 undefined일 수 있으므로 빈 문자열로 대체 후 처리 (Null Check)
            const titleMatch = (paper.title || '').toLowerCase().includes(query);
            const venueMatch = (paper.venue || '').toLowerCase().includes(query);
            const authorMatch = (paper.authors || []).some(a => (a.name || '').toLowerCase().includes(query));

            const matchesQuery = query === '' || titleMatch || authorMatch || venueMatch;
            
            const matchesTopics = activeTopics.length === 0 ||
                activeTopics.every(topic => (paper.topics || []).includes(topic));

            return matchesQuery && matchesTopics;
        });
    }, [searchQuery, activeTopics, allPapers]);

    const toggleTopic = (topic) => {
        setActiveTopics(prev =>
            prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
        );
    };

    // 참조 비교(includes)가 실패할 경우를 대비해 id 기반 필터링 권장 (데이터 구조에 따라 선택)
    // 여기서는 원본 로직을 유지하되 안전하게 처리
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
                        {/* key는 최상위 엘리먼트에 있어야 합니다 (여기서는 올바르게 되어있음) */}
                        {filteredPublications.map((item, index) => <PublicationItem key={item.id || index} item={item} />)}
                    </ul>
                </div>
            )}

            {filteredWorkingPapers.length > 0 && (
                <div className="pt-4">
                    <h2 className="text-2xl font-semibold">Working Paper</h2>
                    <p className="mt-2 text-sm text-gray-600"><strong>S</strong>: Submitted / <strong>W</strong>: Work in progress / <strong>*</strong>: equal contribution / <strong>†</strong>: corresponding author </p>
                    <ul className="mt-4">
                        {filteredWorkingPapers.map((item, index) => <PublicationItem key={item.id || index} item={item} />)}
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
