const ArrowIcon = ({ diagonal = false }) => (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
);

const PageIntro = ({ title, children }) => (
    <header className="page-intro">
        <div>
            <h1 tabIndex="-1" id="page-title">{title}</h1>
        </div>
        {children}
    </header>
);

const SectionHeading = ({ title, description, children }) => (
    <div className="section-heading">
        <div>
            <h2>{title}</h2>
            {description && <p className="section-description">{description}</p>}
        </div>
        {children}
    </div>
);

const ResourceLinks = ({ links = [] }) => (
    <div className="resource-links">
        {links.map((link, index) => (
            <a key={link.href + '-' + index} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.text}<ArrowIcon diagonal />
            </a>
        ))}
    </div>
);

const FilterButton = ({ active, onClick, children, ...props }) => (
    <button type="button" className={'filter-button' + (active ? ' is-active' : '')} aria-pressed={active} onClick={onClick} {...props}>{children}</button>
);

const EmptyState = ({ children }) => <div className="empty-state">{children}</div>;
