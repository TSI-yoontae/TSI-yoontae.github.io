const networkShortNames = {
    'University of Chicago Booth School of Business': 'Chicago Booth',
    'Massachusetts Institute of Technology': 'MIT',
    'Seoul National University': 'Seoul National Univ.',
    'Kyungpook National University': 'Kyungpook Nat’l Univ.',
    'Mirae Asset Global Investments': 'Mirae Asset Global',
    'Meritz Fire & Marine Insurance': 'Meritz Insurance',
    'DS Investment & Securities': 'DS Investment',
    'Arrakis Technologies Corp.': 'Arrakis Technologies',
    'Agency for Defense Development': 'Agency for Defense Development',
};

const networkPaperLabel = count => count + ' coauthored ' + (count === 1 ? 'paper' : 'papers');

const networkLabelLines = (name, maxLength = 21) => {
    const words = (networkShortNames[name] || name).split(' ');
    const lines = [''];
    for (const word of words) {
        const last = lines.length - 1;
        if (lines[last] && lines[last].length + word.length + 1 > maxLength) lines.push(word);
        else lines[last] += (lines[last] ? ' ' : '') + word;
    }
    return lines;
};

const NetworkGraph = ({ entities, selectedId, paperCount, onSelect }) => {
    const [hoveredId, setHoveredId] = React.useState(null);
    const [compact, setCompact] = React.useState(() => window.matchMedia('(max-width: 760px)').matches);
    React.useEffect(() => {
        const media = window.matchMedia('(max-width: 760px)');
        const update = () => setCompact(media.matches);
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    const patternId = 'network-grid-' + React.useId().replace(/:/g, '');
    const centerX = compact ? 180 : 360;
    const radiusX = compact ? 108 : 245;
    const visible = entities.slice(0, compact ? 6 : 10);
    const selected = entities.find(entity => entity.id === selectedId);
    if (selected && !visible.some(entity => entity.id === selectedId)) visible[visible.length - 1] = selected;
    const points = visible.map((entity, index) => {
        const angle = -Math.PI / 2 + index * 2 * Math.PI / visible.length;
        return { ...entity, x: centerX + radiusX * Math.cos(angle), y: 185 + 145 * Math.sin(angle) };
    });
    const focusedId = visible.some(entity => entity.id === hoveredId) ? hoveredId : selectedId;
    const activate = (event, id) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(id); }
    };
    return <div className="network-graph">
        <svg viewBox={'0 0 ' + (compact ? 360 : 720) + ' 395'} role="group" aria-label="Coauthorship network. Select a researcher or institution to view shared papers.">
            <defs><pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="currentColor" /></pattern></defs>
            <rect width={compact ? 360 : 720} height="395" fill={'url(#' + patternId + ')'} className="network-grid" />
            <ellipse cx={centerX} cy="185" rx={radiusX} ry="145" className="network-orbit" />
            {points.map(point => <line key={'edge-' + point.id} x1={centerX} y1="185" x2={point.x} y2={point.y}
                className={'network-edge' + (focusedId === point.id ? ' is-active' : '')}
                style={{ strokeWidth: 1 + Math.min(3, Math.sqrt(point.paperCount) / 2), opacity: focusedId && focusedId !== point.id ? .3 : 1 }} />)}
            <g className="network-root" role="button" tabIndex="0" aria-label="Show all collaborations" aria-pressed={!selectedId}
                onClick={() => onSelect(null)} onKeyDown={event => activate(event, null)}>
                <circle cx={centerX} cy="185" r={compact ? 46 : 55} />
                <text x={centerX} y="170" className="network-root-label">TSI LAB</text>
                <text x={centerX} y="192" className="network-root-name">Yoontae Hwang</text>
                <text x={centerX} y="211" className="network-root-count">{paperCount} papers</text>
            </g>
            {points.map(point => {
                const lines = networkLabelLines(point.name, compact ? 17 : 21);
                return <g key={point.id} className={'network-node' + (point.id === selectedId ? ' is-selected' : '')}
                    role="button" tabIndex="0" aria-label={point.name + ', ' + networkPaperLabel(point.paperCount)} aria-pressed={point.id === selectedId}
                    onClick={() => onSelect(point.id)} onKeyDown={event => activate(event, point.id)}
                    onMouseEnter={() => setHoveredId(point.id)} onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(point.id)} onBlur={() => setHoveredId(null)}>
                    <title>{point.name + ' · ' + networkPaperLabel(point.paperCount)}</title>
                    <circle className="network-hit" cx={point.x} cy={point.y} r="23" />
                    <circle className="network-node-dot" cx={point.x} cy={point.y} r={6 + Math.min(7, Math.sqrt(point.paperCount) * 1.5)} />
                    <text className="network-node-name" x={point.x} y={point.y + 27} textAnchor="middle">
                        {lines.map((line, index) => <tspan key={index} x={point.x} dy={index ? 16 : 0}>{line}</tspan>)}
                    </text>
                    <text className="network-node-count" x={point.x} y={point.y + 44 + (lines.length - 1) * 16} textAnchor="middle">{point.paperCount} {point.paperCount === 1 ? 'paper' : 'papers'}</text>
                </g>;
            })}
        </svg>
        <p className="network-graph-caption"><span>{visible.length} of {entities.length} connections shown</span><span>Line weight · shared papers</span></p>
    </div>;
};

const ResearchNetwork = ({ papers, onOpenPaper }) => {
    const [topic, setTopic] = React.useState('all');
    const [year, setYear] = React.useState('all');
    const [scope, setScope] = React.useState('all');
    const [kind, setKind] = React.useState('researcher');
    const [query, setQuery] = React.useState('');
    const [selectedId, setSelectedId] = React.useState(null);
    const detailRef = React.useRef(null);
    const listRef = React.useRef(null);
    const coauthored = React.useMemo(() => getCoauthoredPapers(papers), [papers]);
    const topics = React.useMemo(() => [...new Set(coauthored.flatMap(paper => paper.topics || []))].sort(), [coauthored]);
    const years = React.useMemo(() => [...new Set(coauthored.map(getPublicationYear))].filter(Boolean).sort((a, b) => b - a), [coauthored]);
    const network = React.useMemo(() => buildResearchNetwork(coauthored.filter(paper =>
        (topic === 'all' || (paper.topics || []).includes(topic))
        && (year === 'all' || getPublicationYear(paper) === Number(year))
        && (scope === 'all' || paper.status === 'Published / accepted')
    )), [coauthored, topic, year, scope]);
    const entities = React.useMemo(() => filterNetworkEntities(network, kind, query), [network, kind, query]);
    const selected = entities.find(entity => entity.id === selectedId);
    const paperTitles = new Set((selected ? [selected] : entities).flatMap(entity => entity.paperTitles));
    const relatedPapers = network.papers.filter(paper => (!query.trim() && !selected) || paperTitles.has(paper.title));
    const connections = selected?.kind === 'researcher' ? selected.institutions
        : selected ? network.researchers.filter(person => selected.researcherIds.includes(person.id)) : [];
    const reset = () => { setTopic('all'); setYear('all'); setScope('all'); setQuery(''); setSelectedId(null); };
    const selectConnection = entity => { setKind(entity.id.startsWith('institution:') ? 'institution' : 'researcher'); setQuery(''); setSelectedId(entity.id); };
    React.useEffect(() => { if (detailRef.current) detailRef.current.scrollTop = 0; }, [selected?.id, topic, year, scope, query]);
    React.useEffect(() => { if (listRef.current) listRef.current.scrollTop = 0; }, [kind, topic, year, scope, query]);
    return <section className="research-network" aria-label="Collaboration network">
        <div className="network-toolbar">
            <div className="network-heading"><span className="eyebrow">COAUTHORSHIP</span><h2>Research network</h2></div>
            <label><span>Topic</span><select aria-label="Network topic" value={topic} onChange={event => { setTopic(event.target.value); setSelectedId(null); }}>
                <option value="all">All topics</option>{topics.map(value => <option key={value} value={value}>{value}</option>)}
            </select></label>
            <label><span>Year</span><select aria-label="Network year" value={year} onChange={event => { setYear(event.target.value); setSelectedId(null); }}>
                <option value="all">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}
            </select></label>
            <label><span>Papers</span><select aria-label="Network paper status" value={scope} onChange={event => { setScope(event.target.value); setSelectedId(null); }}>
                <option value="all">All papers</option><option value="published">Published &amp; accepted</option>
            </select></label>
            <button className="text-button" onClick={reset}>Reset</button>
        </div>
        <div className="network-controls">
            <div className="filter-group" role="group" aria-label="Network entity type">
                <FilterButton active={kind === 'researcher'} onClick={() => { setKind('researcher'); setSelectedId(null); }}>Researchers <span>{network.researchers.length}</span></FilterButton>
                <FilterButton active={kind === 'institution'} onClick={() => { setKind('institution'); setSelectedId(null); }}>Institutions <span>{network.institutions.length}</span></FilterButton>
            </div>
            <label className="network-search"><span className="sr-only">Search network</span><input type="search" placeholder="Find a researcher or institution…" value={query} onChange={event => { setQuery(event.target.value); setSelectedId(null); }} /></label>
            <span className="network-result-count" role="status">{networkPaperLabel(relatedPapers.length)}</span>
            <button className="network-jump text-button" onClick={() => detailRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })}>View papers ↓</button>
        </div>
        <div className="network-layout">
            <div className="network-overview">
                {entities.length ? <NetworkGraph entities={entities} selectedId={selected?.id} paperCount={network.papers.length} onSelect={setSelectedId} />
                    : <div className="network-empty"><h3>No matching connections</h3><p>Try a different topic, year, or name.</p><button className="text-button" onClick={reset}>Clear filters</button></div>}
                <div className="network-directory-heading"><h3>{kind === 'researcher' ? 'Researchers' : 'Institutions'}</h3><span>{entities.length} connections</span></div>
                <div className="network-directory" role="region" aria-label="All matching connections" tabIndex="0" ref={listRef}>
                    <ul>{entities.map(entity => <li key={entity.id}><button aria-pressed={entity.id === selected?.id} onClick={() => setSelectedId(entity.id)}>
                        <span>{entity.name}</span><span className="mono">{entity.paperCount}<span className="sr-only"> coauthored {entity.paperCount === 1 ? 'paper' : 'papers'}</span></span>
                    </button></li>)}</ul>
                </div>
            </div>
            <section className="network-detail" aria-label="Collaboration details" tabIndex="0" ref={detailRef}>
                <div className="network-detail-heading">
                    <span className="eyebrow">{selected ? selected.kind : 'Overview'}</span>
                    <h2>{selected?.name || 'All collaborations'}</h2>
                    <p role="status">{relatedPapers.length} coauthored {relatedPapers.length === 1 ? 'paper' : 'papers'}{topic !== 'all' ? ' · ' + topic : ''}</p>
                    {selected && <button className="text-button" onClick={() => setSelectedId(null)}>All connections <span aria-hidden="true">↗</span></button>}
                </div>
                {connections.length > 0 && <div className="network-connections">
                    <h3>{selected.kind === 'researcher' ? 'Affiliations in these papers' : 'Researchers'}</h3>
                    <div>{connections.map(entity => <button key={entity.id} onClick={() => selectConnection(entity)}>{entity.name}<ArrowIcon /></button>)}</div>
                </div>}
                <div className="network-papers">
                    <h3>Shared papers <span>{relatedPapers.length}</span></h3>
                    {relatedPapers.map(paper => <button className="network-paper" key={paper.title} onClick={() => onOpenPaper(paper)}>
                        <span className="network-paper-meta">{paper.id} · {getPublicationYear(paper) || 'In progress'} · {paper.status === 'Working paper' ? 'Working paper' : getPublicationKind(paper.id)}</span>
                        <span className="network-paper-title">{paper.title}<ArrowIcon /></span>
                    </button>)}
                    {!relatedPapers.length && <p className="network-no-papers">No coauthored papers match these filters.</p>}
                </div>
            </section>
        </div>
    </section>;
};
