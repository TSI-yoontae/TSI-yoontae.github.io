const { Fragment } = React;

window.FinanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

window.ModelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18v-6"></path><path d="M9 15h6"></path>
    </svg>
);

window.ScienceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.5A4.5 4.5 0 0 0 18 5c-1.25 0-2.5 1-4 1-1.5 0-2.75-1-4-1a4.5 4.5 0 0 0-4.5 4.5c0 4.5 3 12.5 6 12.5s2.5-1.06 4-1.06z"></path>
        <path d="M12 2.15c1.5 0 2.75-1.06 4-1.06a4.5 4.5 0 0 1 4.5 4.5c0 4.5-3 12.5-6 12.5s-2.5 1.06-4 1.06-2.75-1.06-4-1.06A4.5 4.5 0 0 1 3 5.5c0-4.5 3-12.5 6-12.5s2.5 1.06 4 1.06z"></path>
    </svg>
);

window.AccordionItem = ({ item, isOpen, onClick }) => (
    <div className="border-b last:border-b-0">
        <header onClick={onClick} className="flex justify-between items-center p-4 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                {item.icon} {item.title}
            </h3>
            <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </header>
        {isOpen && (
            <section className="overflow-hidden p-4 pt-0">
                <div className="space-y-4 text-gray-700">
                    {item.content.map((section, index) => (
                        <div key={index}>
                            <h4 className="font-semibold text-md text-gray-800">{section.topic}</h4>
                            <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-sm">
                                {section.subtopics.map((sub, subIndex) => (
                                    <li key={subIndex} dangerouslySetInnerHTML={{ __html: sub.replace(/\*/g, ' <span class="text-gray-500 italic text-xs">(work in progress)</span>') }} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        )}
    </div>
);