const navigation = [
    ['home', 'Home'], ['members', 'Members'], ['publications', 'Publications'], ['research-explorer', 'Research Explorer'],
    ['project', 'Projects'], ['teaching', 'Teaching'], ['for-students', 'For Students'],
    ['vacant', 'Vacant Positions'], ['year-in-review', 'Year in Review'],
];

const readLocation = () => {
    const [candidate, query = ''] = window.location.hash.slice(1).split('?');
    return { tab: navigation.some(([id]) => id === candidate) ? candidate : 'home', query: new URLSearchParams(query).get('q') || '' };
};

const App = () => {
    const [location, setLocation] = React.useState(readLocation);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const mainRef = React.useRef(null);
    const menuRef = React.useRef(null);
    React.useEffect(() => {
        const navigate = () => {
            setLocation(readLocation());
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            mainRef.current?.focus({ preventScroll: true });
        };
        window.addEventListener('hashchange', navigate);
        return () => window.removeEventListener('hashchange', navigate);
    }, []);
    React.useEffect(() => {
        const label = navigation.find(([id]) => id === location.tab)[1];
        document.title = (location.tab === 'home' ? 'Time Series Intelligence' : label) + ' | TSI Lab';
    }, [location.tab]);
    React.useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = event => {
            if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus(); }
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [menuOpen]);

    const content = {
        home: <window.HomeTabContent />,
        members: <window.MembersTabContent />,
        publications: <window.PublicationsTabContent key={location.query} initialQuery={location.query} />,
        'research-explorer': <window.ResearchExplorerTabContent />,
        project: <window.ProjectTabContent />,
        teaching: <window.TeachingTabContent />,
        'for-students': <window.ForStudentsTabContent />,
        vacant: <window.VacantPositionsTabContent />,
        'year-in-review': <window.YearInReviewTabContent />,
    };

    return (
        <>
            <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
            <header className="site-header">
                <div className="header-inner">
                    <a className="brand" href="#home" aria-label="TSI Lab home">
                        <LabMark /><span>TSI Lab<span className="brand-caption">Time Series Intelligence</span></span>
                    </a>
                    <span className="university-label">Pusan National University<br /><span>Graduate School of Data Science</span></span>
                    <a className="header-contact text-link" href="mailto:yoontae.hwang@pusan.ac.kr">Get in touch <ArrowIcon diagonal /></a>
                    <button ref={menuRef} className="menu-button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
                    </button>
                </div>
                <nav id="main-navigation" aria-label="Main navigation" className={'main-nav' + (menuOpen ? ' is-open' : '')}>
                    <div className="nav-inner">
                        {navigation.map(([id, label]) => <a key={id} href={'#' + id} aria-current={location.tab === id ? 'page' : undefined}
                            onClick={() => setMenuOpen(false)}>{label}</a>)}
                    </div>
                </nav>
            </header>
            <main id="main-content" ref={mainRef} tabIndex="-1" className="site-main">
                <div key={location.tab} className="page-enter">{content[location.tab]}</div>
            </main>
            <footer className="site-footer">
                <div className="footer-top">
                    <div><a className="brand" href="#home"><LabMark /><span>TSI Lab</span></a><p>Time Series Intelligence Lab<br />Pusan National University · Busan, South Korea</p></div>
                    <div className="footer-contact"><p className="eyebrow">Contact</p><a className="text-link" href="mailto:yoontae.hwang@pusan.ac.kr">yoontae.hwang@pusan.ac.kr <ArrowIcon diagonal /></a></div>
                </div>
                <div className="footer-bottom"><span>© {new Date().getFullYear()} TSI Lab</span><div><a href="#publications">Research</a><a href="#vacant">Prospective students</a><a href="#year-in-review">Year in Review</a></div></div>
            </footer>
        </>
    );
};

createRoot(document.getElementById('root')).render(<App />);
