const ArrowIcon = ({ diagonal = false }) => (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
);

const LabMark = () => (
    <svg aria-hidden="true" width="34" height="34" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <g stroke="#f3f3f3" strokeWidth="1.8" strokeLinecap="round">
            <path d="M7 20c4-17 8 17 13 0s9 17 13 0" />
            <path d="M7 27c4-17 8 17 13 0s9 17 13 0M7 13c4-17 8 17 13 0s9 17 13 0" opacity=".45" />
        </g>
    </svg>
);

const PageIntro = ({ eyebrow, title, description, children }) => (
    <header className="page-intro">
        <div>
            <p className="eyebrow">{eyebrow || 'Time Series Intelligence Lab'}</p>
            <h1 tabIndex="-1" id="page-title">{title}</h1>
            {description && <p className="page-description">{description}</p>}
        </div>
        {children}
    </header>
);

const SectionHeading = ({ eyebrow, title, description, children }) => (
    <div className="section-heading">
        <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
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
