const { useState, useEffect } = React;

function App() {
    const validTabs = ['home', 'members', 'collaborators', 'publications', 'teaching', 'project', 'for-students', 'vacant'];
    
    const getTabFromHash = () => {
        const hash = window.location.hash.replace('#', '');
        return validTabs.includes(hash) ? hash : 'home';
    };
    
    const [activeTab, setActiveTab] = useState(getTabFromHash());

    useEffect(() => {
        window.location.hash = activeTab;
    }, [activeTab]);

    useEffect(() => {
        const handleHashChange = () => {
            setActiveTab(getTabFromHash());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderContent = () => {
        switch(activeTab) {
            case 'home': return <window.HomeTabContent />;
            case 'members': return <window.MembersTabContent />;
            case 'collaborators': return <window.CollaboratorTabContent />;
            case 'publications': return <window.PublicationsTabContent />;
            case 'teaching': return <window.TeachingTabContent />;
            case 'project': return <window.ProjectTabContent />;
            case 'for-students': return <window.ForStudentsTabContent />;
            case 'vacant': return <window.VacantPositionsTabContent />;
            default: return <window.HomeTabContent />;
        }
    };
    
    const TabButton = ({ value, children }) => {
        const isActive = activeTab === value;
        const classes = `px-3 sm:px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`;
        return <button onClick={() => setActiveTab(value)} className={classes}>{children}</button>;
    };

    return (
        <div className="p-4 sm:p-8 space-y-10 max-w-6xl mx-auto">
            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Time Series Intelligence Lab (TSI Lab)
                </h1>
                <p className="text-md sm:text-lg text-center text-gray-600 mt-2">
                    Advancing AI-driven Time Series Research
                </p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    <a href="mailto:yoontae.hwang@pusan.ac.kr" className="hover:underline">
                        📩 Contact: yoontae.hwang@pusan.ac.kr
                    </a>
                </p>
            </header>
            
            <nav className="w-full">
                <div className="flex justify-center flex-wrap gap-1 sm:gap-2 bg-gray-100 p-1 rounded-lg shadow-inner">
                    <TabButton value="home">Home</TabButton>
                    <TabButton value="members">Members</TabButton>
                    <TabButton value="collaborators">Collaborators</TabButton>
                    <TabButton value="publications">Publications</TabButton>
                    <TabButton value="teaching">Teaching</TabButton>
                    <TabButton value="project">Project</TabButton>
                    <TabButton value="for-students">For Students</TabButton>
                    <TabButton value="vacant">Vacant Positions</TabButton>
                </div>
            </nav>

            <main className="mt-6 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
                {renderContent()}
            </main>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);