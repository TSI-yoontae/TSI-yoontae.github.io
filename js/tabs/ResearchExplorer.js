const ResearchFigure = ({ figure, title }) => {
    const dialogRef = React.useRef(null);
    const [unavailable, setUnavailable] = React.useState(false);
    React.useEffect(() => { setUnavailable(false); }, [figure?.src]);
    if (!figure || unavailable) return null;
    return <>
        <figure className="research-figure">
            <button className="figure-preview" onClick={() => dialogRef.current?.showModal()} aria-label={'Enlarge figure: ' + title} aria-haspopup="dialog">
                <img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} decoding="async" onError={() => setUnavailable(true)} />
                <span className="figure-expand">Enlarge figure <span aria-hidden="true">↗</span></span>
            </button>
            <figcaption><span><strong>{figure.label}.</strong> {figure.caption}</span><a href={figure.source} target="_blank" rel="noopener noreferrer">Source <ArrowIcon diagonal /></a></figcaption>
        </figure>
        <dialog ref={dialogRef} className="figure-dialog" aria-label={'Research figure: ' + title} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
            <div className="figure-dialog-header"><p>{title}</p><button autoFocus onClick={() => dialogRef.current.close()} aria-label="Close figure">Close <span aria-hidden="true">×</span></button></div>
            <div className="figure-dialog-image"><img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} /></div>
            <p className="figure-dialog-caption"><strong>{figure.label}.</strong> {figure.caption} <a href={figure.source} target="_blank" rel="noopener noreferrer">View source ↗</a></p>
        </dialog>
    </>;
};

window.ResearchExplorerTabContent = () => {
    const publications = window.TSI_Data.publications || [];
    const workingPapers = window.TSI_Data.workingPapers || [];
    const papers = React.useMemo(() => [
        ...publications.map(paper => ({ ...paper, status: 'Published / accepted' })),
        ...workingPapers.map(paper => ({ ...paper, status: 'Working paper' })),
    ], [publications, workingPapers]);
    const areas = [
        { label: 'All research', topics: null },
        { label: 'Finance & Markets', topics: ['Portfolio Theory', 'Trading', 'Household Finance', 'Finance', 'Optimization'] },
        { label: 'Time Series', topics: ['Time-Series Analysis', 'AI in Science'] },
        { label: 'Language Models', topics: ['Large Language Models', 'Natural Language Processing', 'Bias'] },
        { label: 'Graph & Tabular', topics: ['Graph Neural Networks', 'Tabular Modeling'] },
    ];
    const [area, setArea] = React.useState('All research');
    const [query, setQuery] = React.useState('');
    const [scope, setScope] = React.useState('All');
    const [year, setYear] = React.useState(null);
    const [selectedTitle, setSelectedTitle] = React.useState(papers[0]?.title);
    const listRef = React.useRef(null);
    const documentRef = React.useRef(null);
    const years = [...new Set(papers.map(getPublicationYear))].filter(Boolean).sort((a, b) => b - a);
    const activeTopics = areas.find(item => item.label === area)?.topics;
    const filtered = papers.filter(paper => (!activeTopics || (paper.topics || []).some(label => activeTopics.includes(label)))
        && (!year || getPublicationYear(paper) === year)
        && (scope === 'All' || (scope === 'Published' ? paper.status !== 'Working paper' : paper.status === 'Working paper'))
        && normalizePublicationText([paper.title, paper.venue, ...(paper.authors || []).map(author => author.name), ...(paper.topics || [])].join(' ')).includes(normalizePublicationText(query)));
    const selected = filtered.find(paper => paper.title === selectedTitle) || filtered[0];
    // A code repository alone is not a public manuscript; unlinked drafts stay text-only.
    const canShowFigure = selected && (selected.status !== 'Working paper' || selected.links?.some(link => link.text.toLowerCase() === 'paper'));
    const figure = canShowFigure ? window.TSI_Data.paperFigures?.[selected.title] : null;
    React.useEffect(() => { if (documentRef.current) documentRef.current.scrollTop = 0; }, [selected?.title]);
    React.useEffect(() => { if (listRef.current) listRef.current.scrollTop = 0; }, [area, query, scope, year]);
    const related = selected ? papers.filter(paper => paper.title !== selected.title && (paper.topics || []).some(label => (selected.topics || []).includes(label)))
        .sort((a, b) => (b.topics || []).filter(label => selected.topics?.includes(label)).length - (a.topics || []).filter(label => selected.topics?.includes(label)).length).slice(0, 3) : [];
    const reset = () => { setArea('All research'); setQuery(''); setScope('All'); setYear(null); };
    const openRelated = paper => { reset(); setSelectedTitle(paper.title); };
    return (
        <>
            <PageIntro title="Research Explorer" />
            <section className="research-desk" aria-label="Interactive research archive">
                <div className="desk-toolbar">
                    <span className="desk-label"><span className="terminal-dot" /> TSI / RESEARCH</span>
                    <label className="desk-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search research explorer</span><input type="search" placeholder="Search title, author, or keyword" value={query} onChange={event => setQuery(event.target.value)} /></label>
                    <button className="desk-reset" onClick={reset}>Reset filters</button>
                </div>
                <div className="desk-controls">
                    <div className="desk-areas" role="group" aria-label="Research area">
                        {areas.map(item => <button key={item.label} aria-pressed={area === item.label} onClick={() => setArea(item.label)}>{item.label}</button>)}
                    </div>
                    <label className="desk-year"><span className="sr-only">Explorer year</span><select value={year || ''} onChange={event => setYear(event.target.value ? Number(event.target.value) : null)}><option value="">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
                </div>
                <div className="desk-layout">
                    <div className="desk-results">
                        <div className="desk-results-header">
                            <div className="desk-scope" role="group" aria-label="Explorer publication status">
                                {['All', 'Published', 'Working'].map(value => <button key={value} aria-pressed={scope === value} onClick={() => setScope(value)}>{value}</button>)}
                            </div>
                            <p role="status">{filtered.length} {filtered.length === 1 ? 'paper' : 'papers'}{year ? ' · ' + year : ''}</p>
                        </div>
                        <div ref={listRef} className="desk-paper-list" role="region" tabIndex="0" aria-label="Matching papers, scroll to browse">
                            {filtered.map(paper => <button key={paper.title} className={'desk-paper' + (selected?.title === paper.title ? ' is-selected' : '')} aria-pressed={selected?.title === paper.title} onClick={() => setSelectedTitle(paper.title)}>
                                <span className="desk-paper-meta"><span>{paper.id} · {getPublicationYear(paper) || 'In progress'}</span><span>{getPublicationKind(paper.id)}</span></span>
                                <strong>{paper.title}</strong>
                            </button>)}
                            {!filtered.length && <div className="desk-empty"><h3>No matching papers.</h3><p>Try a different topic or clear the filters.</p><button onClick={reset}>Clear filters</button></div>}
                        </div>
                    </div>
                    <section ref={documentRef} className="desk-document" tabIndex="0" aria-label="Selected paper, scroll for details">
                        {selected ? <>
                            <p className="document-status">{selected.status} <span>{selected.id}</span></p>
                            <h2>{selected.title}</h2>
                            <p className="sr-only" role="status">Selected paper: {selected.title}</p>
                            <AuthorList authors={selected.authors || []} />
                            <p className="document-venue">{selected.venue}</p>
                            {selected.award && <p className="publication-award">{selected.award}</p>}
                            <ResearchFigure key={selected.title} figure={figure} title={selected.title} />
                            {(selected.links || []).length ? <ResourceLinks links={selected.links} /> : <p className="fine-print">Manuscript link to be added.</p>}
                            {(selected.topics || []).length > 0 && <div className="document-topics"><h3>Research topics</h3><div>{selected.topics.map(label => <button key={label} onClick={() => { reset(); setQuery(label); }}>{label} <span aria-hidden="true">↗</span></button>)}</div></div>}
                            {related.length > 0 && <div className="related-papers"><h3>Related papers</h3>{related.map(paper => <button key={paper.title} onClick={() => openRelated(paper)}><span>{paper.title}</span><ArrowIcon /></button>)}</div>}
                        </> : <div className="desk-empty"><h2>Select a paper</h2><p>Paper details and source links will appear here.</p></div>}
                    </section>
                </div>
            </section>
        </>
    );
};
