const normalizePublicationText = (value) => (value || '').toString().toLowerCase();

const getPublicationYear = (paper) => {
    const text = `${paper.venue || ''} ${paper.title || ''}`;
    const fullYear = text.match(/20\d{2}/);
    if (fullYear) return Number(fullYear[0]);

    const shortYear = text.match(/'(\d{2})/);
    if (shortYear) return 2000 + Number(shortYear[1]);

    return null;
};

const getPublicationKind = (id = '') => {
    const cleanId = id.replace(/\[|\]/g, '');
    if (cleanId.startsWith('C')) return 'Conference';
    if (cleanId.startsWith('J')) return 'Journal';
    if (cleanId.startsWith('S')) return 'Submitted';
    if (cleanId.startsWith('W')) return 'Work in Progress';
    return 'Paper';
};

const getResearchAreas = (paper) => {
    const text = normalizePublicationText(`${paper.title || ''} ${paper.venue || ''} ${(paper.topics || []).join(' ')}`);
    const areas = [];

    if (/(portfolio|financial|finance|asset|stock|trading|volatility|investor|household|black-litterman|risk|price index|optimization)/.test(text)) {
        areas.push('AI in Finance');
    }
    if (/(betting|polymarket|sport|sports|mention market|prediction market|market)/.test(text)) {
        areas.push('AI in Market');
    }
    if (/(foundation|llm|large language|language model|time-mqa|representation learning)/.test(text)) {
        areas.push('Foundation Model');
    }

    return areas.length > 0 ? [...new Set(areas)] : ['Other AI'];
};

const PublicationStat = ({ label, value }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-3xl font-extrabold text-slate-950">{value}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
);

const FilterButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            active
                ? 'bg-slate-950 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
    >
        {children}
    </button>
);

const AuthorList = ({ authors }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visibleAuthors = expanded ? authors : authors.slice(0, 6);
    const hiddenCount = Math.max(authors.length - visibleAuthors.length, 0);

    return (
        <div className="text-sm leading-6 text-slate-600">
            {visibleAuthors.map((author, index) => (
                <React.Fragment key={`${author.name}-${index}`}>
                    {author.href ? (
                        <a
                            href={author.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:underline ${author.isHighlight ? 'font-bold text-slate-950' : ''}`}
                        >
                            {author.name}
                        </a>
                    ) : (
                        <span className={author.isHighlight ? 'font-bold text-slate-950' : ''}>{author.name}</span>
                    )}
                    {index < visibleAuthors.length - 1 && ', '}
                </React.Fragment>
            ))}
            {hiddenCount > 0 && (
                <button onClick={() => setExpanded(true)} className="ml-2 text-xs font-bold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
                    +{hiddenCount} more
                </button>
            )}
        </div>
    );
};

const PublicationCard = ({ paper }) => {
    const links = paper.links || [];
    const topics = paper.topics || [];
    const kind = getPublicationKind(paper.id);
    const year = getPublicationYear(paper);
    const areas = paper.areas || getResearchAreas(paper);
    const cleanId = (paper.id || '').replace(/\[|\]/g, '');

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex flex-none items-center gap-3 lg:w-32 lg:flex-col lg:items-start">
                    <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-slate-950 px-3 text-sm font-extrabold text-white">
                        {cleanId || 'Paper'}
                    </span>
                    <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{kind}</p>
                        {year && <p className="text-xs font-semibold text-slate-500">{year}</p>}
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                        <h3 className="text-base font-extrabold leading-6 text-slate-950 sm:text-lg">{paper.title}</h3>
                        {links.length > 0 && (
                            <div className="flex flex-none flex-wrap gap-2">
                                {links.map((link, index) => (
                                    <a
                                        key={`${link.href}-${index}`}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {(paper.authors || []).length > 0 && <div className="mt-2"><AuthorList authors={paper.authors || []} /></div>}
                    {paper.venue && <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{paper.venue}</p>}
                    {paper.award && <p className="mt-2 text-sm font-semibold text-rose-600">{paper.award}</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                        {areas.map(area => (
                            <span key={area} className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                                {area}
                            </span>
                        ))}
                        {topics.map(topic => (
                            <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

const PublicationListSection = ({ title, description, papers }) => {
    if (papers.length === 0) return null;

    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                    {description && <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>}
                </div>
                <p className="text-sm font-semibold text-slate-500">{papers.length} papers</p>
            </div>
            <div className="space-y-3">
                {papers.map((paper, index) => (
                    <PublicationCard key={`${paper.id}-${paper.title}-${index}`} paper={paper} />
                ))}
            </div>
        </section>
    );
};

window.PublicationsTabContent = () => {
    if (!window.TSI_Data) {
        return <div className="p-4 text-slate-500">Loading data...</div>;
    }

    const publications = window.TSI_Data.publications || [];
    const workingPapers = window.TSI_Data.workingPapers || [];
    const allPapers = window.TSI_Data.allPapers || [...publications, ...workingPapers];

    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeType, setActiveType] = React.useState('all');
    const [activeAreas, setActiveAreas] = React.useState([]);
    const [activeTags, setActiveTags] = React.useState([]);

    const enrichedPapers = React.useMemo(() => {
        return allPapers.map((paper, index) => ({
            ...paper,
            sourceType: publications.includes(paper) ? 'publication' : 'working',
            areas: getResearchAreas(paper),
            year: getPublicationYear(paper),
            originalIndex: index,
        }));
    }, [allPapers, publications]);

    const detailedTags = React.useMemo(() => {
        const tagCounts = new Map();
        enrichedPapers.forEach(paper => {
            (paper.topics || []).forEach(topic => tagCounts.set(topic, (tagCounts.get(topic) || 0) + 1));
        });
        return Array.from(tagCounts.entries())
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([topic]) => topic);
    }, [enrichedPapers]);

    const areaOptions = ['AI in Finance', 'AI in Market', 'Foundation Model', 'Other AI'].filter(area =>
        enrichedPapers.some(paper => paper.areas.includes(area))
    );

    const filteredPapers = React.useMemo(() => {
        const query = normalizePublicationText(searchQuery);

        return enrichedPapers.filter(paper => {
            const searchable = normalizePublicationText([
                paper.title,
                paper.venue,
                (paper.authors || []).map(author => author.name).join(' '),
                (paper.topics || []).join(' '),
                (paper.areas || []).join(' '),
            ].join(' '));

            const matchesQuery = query === '' || searchable.includes(query);
            const matchesType = activeType === 'all' || paper.sourceType === activeType;
            const matchesAreas = activeAreas.length === 0 || activeAreas.some(area => paper.areas.includes(area));
            const matchesTags = activeTags.length === 0 || activeTags.some(tag => (paper.topics || []).includes(tag));

            return matchesQuery && matchesType && matchesAreas && matchesTags;
        });
    }, [searchQuery, activeType, activeAreas, activeTags, enrichedPapers]);

    const filteredPublications = filteredPapers.filter(paper => paper.sourceType === 'publication');
    const filteredWorkingPapers = filteredPapers.filter(paper => paper.sourceType === 'working');

    const toggleArea = (area) => {
        setActiveAreas(prev => prev.includes(area) ? prev.filter(item => item !== area) : [...prev, area]);
    };

    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setActiveType('all');
        setActiveAreas([]);
        setActiveTags([]);
    };

    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Publications</p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Readable research archive</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        Search across title, author, venue, research area, and topic. Cards keep venue, authors, links, awards, and topic tags visible without turning the page into a dense bibliography.
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                        <strong>C</strong>: Conference · <strong>J</strong>: Journal · <strong>S</strong>: Submitted · <strong>W</strong>: Work in progress · <strong>*</strong>: equal contribution · <strong>†</strong>: corresponding author
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <PublicationStat label="Total papers" value={allPapers.length} />
                    <PublicationStat label="Publications" value={publications.length} />
                    <PublicationStat label="Working papers" value={workingPapers.length} />
                </div>
            </div>

            <div className="sticky top-0 z-10 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by title, author, venue, area, or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-slate-900"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <button onClick={resetFilters} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950">
                        Reset
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {[
                        ['all', 'All'],
                        ['publication', 'Publications'],
                        ['working', 'Working Papers'],
                    ].map(([value, label]) => (
                        <FilterButton key={value} active={activeType === value} onClick={() => setActiveType(value)}>{label}</FilterButton>
                    ))}
                </div>

                <div className="mt-4 space-y-3">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Research area</p>
                        <div className="flex flex-wrap gap-2">
                            {areaOptions.map(area => (
                                <FilterButton key={area} active={activeAreas.includes(area)} onClick={() => toggleArea(area)}>{area}</FilterButton>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Detailed tags</p>
                        <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto pr-1">
                            {detailedTags.map(tag => (
                                <FilterButton key={tag} active={activeTags.includes(tag)} onClick={() => toggleTag(tag)}>{tag}</FilterButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-sm font-semibold text-slate-500">
                Showing {filteredPapers.length} of {allPapers.length} papers
            </div>

            <PublicationListSection
                title="Publications"
                description="Accepted or published journal and conference papers."
                papers={filteredPublications}
            />

            <PublicationListSection
                title="Working Papers"
                description="Submitted manuscripts and work in progress."
                papers={filteredWorkingPapers}
            />

            {filteredPapers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <p className="font-semibold text-slate-700">No papers match the current filters.</p>
                    <button onClick={resetFilters} className="mt-3 text-sm font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
};
