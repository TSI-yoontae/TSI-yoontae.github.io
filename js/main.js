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
        const classes = `whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${
            isActive
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900'
        }`;
        return <button onClick={() => setActiveTab(value)} className={classes}>{children}</button>;
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Pusan National University</p>
                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                                Time Series Intelligence Lab <span className="text-slate-500">(TSI Lab)</span>
                            </h1>
                            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                                AI in Finance · AI in Market · Foundation Models for Financial Time Series
                            </p>
                        </div>
                        <a
                            href="mailto:yoontae.hwang@pusan.ac.kr"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950"
                        >
                            yoontae.hwang@pusan.ac.kr
                        </a>
                    </div>
                </header>
                
                <nav className="mt-6 border-b border-slate-200">
                    <div className="flex gap-5 overflow-x-auto">
                        {tabs.map(tab => (
                            <TabButton key={tab.value} value={tab.value}>{tab.label}</TabButton>
                        ))}
                    </div>
                </nav>

                <main className="mt-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
