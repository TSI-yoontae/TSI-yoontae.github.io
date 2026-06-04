function App() {
    const validTabs = ['home', 'members', 'publications', 'teaching', 'project', 'for-students', 'vacant'];
    
    const getTabFromHash = () => {
        const hash = window.location.hash.replace('#', '');
        return validTabs.includes(hash) ? hash : 'home';
    };
    
    const [activeTab, setActiveTab] = React.useState(getTabFromHash());

    React.useEffect(() => {
        window.location.hash = activeTab;
    }, [activeTab]);

    React.useEffect(() => {
        const handleHashChange = () => setActiveTab(getTabFromHash());
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderContent = () => {
        switch(activeTab) {
            case 'home': return <window.HomeTabContent />;
            case 'members': return <window.MembersTabContent />;
            case 'publications': return <window.PublicationsTabContent />;
            case 'teaching': return <window.TeachingTabContent />;
            case 'project': return <window.ProjectTabContent />;
            case 'for-students': return <window.ForStudentsTabContent />;
            case 'vacant': return <window.VacantPositionsTabContent />;
            default: return <window.HomeTabContent />;
        }
    };
    
    const tabs = [
        { value: 'home', label: 'Home' },
        { value: 'members', label: 'Members' },
        { value: 'publications', label: 'Publications' },
        { value: 'teaching', label: 'Teaching' },
        { value: 'project', label: 'Project' },
        { value: 'for-students', label: 'For Students' },
        { value: 'vacant', label: 'Vacant Positions' },
    ];

    const TabButton = ({ value, children }) => {
        const isActive = activeTab === value;
        const classes = `whitespace-nowrap border-r border-[#c8bead] px-3 py-2 text-[13px] font-semibold transition-colors ${
            isActive
                ? 'bg-[#172033] text-[#fffdf8]'
                : 'bg-[#e8e2d4] text-[#2f3847] hover:bg-[#dcd4c4] hover:text-[#172033]'
        }`;
        return <button onClick={() => setActiveTab(value)} className={classes}>{children}</button>;
    };

    return (
        <div className="min-h-screen bg-[#f4f1e8]">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-5 lg:px-6">
                <header className="border border-[#172033] bg-[#243044] px-3 py-3 text-[#fffdf8]">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5b691]">Pusan National University</p>
                            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#fffdf8] sm:text-3xl">
                                Time Series Intelligence Lab <span className="font-semibold text-[#cbd3df]">(TSI Lab)</span>
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#d8dee7]">
                                AI in Finance · AI in Market · Foundation Models for Financial Time Series
                            </p>
                        </div>
                        <a
                            href="mailto:yoontae.hwang@pusan.ac.kr"
                            className="inline-flex w-fit border border-[#69758a] bg-[#1b2434] px-2 py-1 text-sm font-semibold text-[#fffdf8] underline decoration-[#8d9aae] hover:border-[#c5b691] hover:decoration-[#c5b691]"
                        >
                            yoontae.hwang@pusan.ac.kr
                        </a>
                    </div>
                </header>
                
                <nav className="border-x border-b border-[#c8bead] bg-[#e8e2d4]">
                    <div className="flex overflow-x-auto">
                        {tabs.map(tab => (
                            <TabButton key={tab.value} value={tab.value}>{tab.label}</TabButton>
                        ))}
                    </div>
                </nav>

                <main className="mt-4">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
