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

const PublicationStat = ({ label, value }) => (
    <span className="inline-flex items-baseline gap-1 border border-[#d8d0c0] bg-[#eceff1] px-2 py-1 text-xs text-[#5e6676]">
        <strong className="text-sm text-[#172033]">{value}</strong>
        {label}
    </span>
);

const FilterButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`border px-2.5 py-1 text-xs font-semibold transition-colors ${
            active
                ? 'border-[#172033] bg-[#172033] text-[#fffdf8]'
                : 'border-[#c8bead] bg-[#eee8dc] text-[#2f3847] hover:border-[#172033] hover:bg-[#e4dccd]'
        }`}
    >
        {children}
    </button>
);

const AuthorList = ({ authors }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visibleAuthors = expanded ? authors : authors.slice(0, 8);
    const hiddenCount = Math.max(authors.length - visibleAuthors.length, 0);

    return (
        <div className="text-[13px] leading-5 text-[#5e6676]">
            {visibleAuthors.map((author, index) => (
                <React.Fragment key={`${author.name}-${index}`}>
                    {author.href ? (
                        <a
                            href={author.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:underline ${author.isHighlight ? 'font-bold text-[#172033]' : ''}`}
                        >
                            {author.name}
                        </a>
                    ) : (
                        <span className={author.isHighlight ? 'font-bold text-[#172033]' : ''}>{author.name}</span>
                    )}
                    {index < visibleAuthors.length - 1 && ', '}
                </React.Fragment>
            ))}
            {hiddenCount > 0 && !expanded && (
                <button onClick={() => setExpanded(true)} className="ml-2 text-xs font-bold text-[#1f4e5f] underline decoration-[#b7aa91] hover:decoration-[#1f4e5f]">
                    +{hiddenCount} more
                </button>
            )}
            {expanded && authors.length > 8 && (
                <button onClick={() => setExpanded(false)} className="ml-2 text-xs font-bold text-[#1f4e5f] underline decoration-[#b7aa91] hover:decoration-[#1f4e5f]">
                    show less
                </button>
            )}
        </div>
    );
};

const PublicationEntry = ({ paper }) => {
    const links = paper.links || [];
    const kind = getPublicationKind(paper.id || '');
    const year = paper.year || getPublicationYear(paper);

    return (
        <article className="grid border-b border-[#e9e2d5] last:border-b-0 hover:bg-[#f1f3f4] md:grid-cols-[92px_1fr]">
            <div className="flex items-center gap-2 border-b border-[#e9e2d5] bg-[#eceff1] px-2 py-2 md:block md:border-b-0 md:border-r md:border-[#d8d0c0]">
                <span className="inline-flex min-w-10 justify-center border border-[#aeb5c1] bg-[#fffdf8] px-2 py-0.5 text-[12px] font-extrabold text-[#172033]">
                    {paper.id}
                </span>
                <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#746b5d] md:mt-1 md:block md:space-y-0.5">
                    <p>{kind}</p>
                    {year && <p>{year}</p>}
                </div>
            </div>

            <div className="px-3 py-2.5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-[15px] font-extrabold leading-5 text-[#172033]">{paper.title}</h3>
                    {links.length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
                            {links.map((link, index) => (
                                <a
                                    key={`${link.href}-${index}`}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-[#1f4e5f] underline decoration-[#b7aa91] hover:text-[#172033] hover:decoration-[#1f4e5f]"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {(paper.authors || []).length > 0 && <div className="mt-1"><AuthorList authors={paper.authors || []} /></div>}
                {paper.venue && <p className="mt-1 text-[13px] font-medium leading-5 text-[#746b5d]">{paper.venue}</p>}
                {paper.award && <p className="mt-1 text-[13px] font-semibold leading-5 text-[#9a3412]">{paper.award}</p>}
            </div>
        </article>
    );
};

const PublicationListSection = ({ title, description, papers }) => {
    if (papers.length === 0) return null;

    return (
        <section className="tsi-section">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-extrabold tracking-tight text-[#172033]">{title}</h2>
                    {description && <p className="text-sm leading-5 text-[#5e6676]">{description}</p>}
                </div>
                <p className="text-xs font-semibold text-[#746b5d]">{papers.length} papers</p>
            </div>
            <div className="border border-[#d8d0c0] bg-[#fffdf8]">
                {papers.map((paper, index) => (
                    <PublicationEntry key={`${paper.id}-${paper.title}-${index}`} paper={paper} />
                ))}
            </div>
        </section>
    );
};

window.PublicationsTabContent = () => {
    if (!window.TSI_Data) {
        return <div className="p-3 text-[#5e6676]">Loading data...</div>;
    }

    const publications = window.TSI_Data.publications || [];
    const workingPapers = window.TSI_Data.workingPapers || [];
    const allPapers = window.TSI_Data.allPapers || [...publications, ...workingPapers];

    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeType, setActiveType] = React.useState('all');

    const enrichedPapers = React.useMemo(() => {
        return allPapers.map((paper, index) => ({
            ...paper,
            sourceType: index < publications.length ? 'publication' : 'working',
            year: getPublicationYear(paper),
            originalIndex: index,
        }));
    }, [allPapers, publications]);

    const filteredPapers = React.useMemo(() => {
        const query = normalizePublicationText(searchQuery);

        return enrichedPapers.filter(paper => {
            const searchable = normalizePublicationText([
                paper.id,
                paper.title,
                paper.venue,
                paper.award,
                (paper.authors || []).map(author => author.name).join(' '),
            ].join(' '));

            const matchesQuery = query === '' || searchable.includes(query);
            const matchesType = activeType === 'all' || paper.sourceType === activeType;

            return matchesQuery && matchesType;
        });
    }, [searchQuery, activeType, enrichedPapers]);

    const filteredPublications = filteredPapers.filter(paper => paper.sourceType === 'publication');
    const filteredWorkingPapers = filteredPapers.filter(paper => paper.sourceType === 'working');

    const resetFilters = () => {
        setSearchQuery('');
        setActiveType('all');
    };

    return (
        <section className="space-y-5">
            <div>
                <p className="tsi-kicker">Publications</p>
                <div className="mt-0.5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-[#172033]">Readable research archive</h2>
                        <p className="mt-1 max-w-4xl text-sm leading-5 text-[#5e6676]">
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        <PublicationStat label="total" value={allPapers.length} />
                        <PublicationStat label="pub." value={publications.length} />
                        <PublicationStat label="working" value={workingPapers.length} />
                    </div>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#746b5d]">
                    <strong>C</strong>: Conference · <strong>J</strong>: Journal · <strong>S</strong>: Submitted · <strong>W</strong>: Work in progress · <strong>*</strong>: equal contribution · <strong>†</strong>: corresponding author
                </p>
            </div>

            <div className="border border-[#d8d0c0] bg-[#eceff1] p-3">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search title, author, or venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-[#c8bead] bg-[#fffdf8] px-3 py-2 pl-8 text-sm text-[#172033] outline-none transition focus:border-[#172033]"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#746b5d]">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <button onClick={resetFilters} className="border border-[#c8bead] bg-[#fffdf8] px-3 py-2 text-xs font-bold text-[#2f3847] transition-colors hover:border-[#172033] hover:text-[#172033]">
                        Reset
                    </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                        ['all', 'All'],
                        ['publication', 'Publication'],
                        ['working', 'Working Papers'],
                    ].map(([value, label]) => (
                        <FilterButton key={value} active={activeType === value} onClick={() => setActiveType(value)}>{label}</FilterButton>
                    ))}
                </div>
            </div>

            <div className="text-sm font-semibold text-[#746b5d]">
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
                <div className="border border-dashed border-[#c8bead] bg-[#fffdf8] p-5 text-center">
                    <p className="font-semibold text-[#404958]">No papers match the current filters.</p>
                    <button onClick={resetFilters} className="mt-2 text-sm font-bold text-[#1f4e5f] underline decoration-[#b7aa91] hover:decoration-[#1f4e5f]">
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
};
