window.TeachingTabContent = () => {
    const courses = [
        {
            title: 'Optimization For Data Science (Convex Optimization)',
            term: '1st Semester, 2026',
            links: [{ text: 'Lecture Notes - Week 1', href: 'https://TSI-yoontae.github.io/js/tabs/convex/week1_convex.pdf' }],
        },
        { title: 'Python Programming', term: '2nd Semester, 2025', links: [] },
        { title: 'Financial Application', term: '2nd Semester, 2025 / 1st Semester, 2026', links: [] },
    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Teaching</h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">Courses and teaching materials.</p>
            </div>
            <div className="border border-slate-200 bg-white">
                {courses.map(course => (
                    <div key={course.title} className="grid gap-1 border-b border-slate-100 px-3 py-2.5 last:border-b-0 sm:grid-cols-[1fr_210px] sm:gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-slate-950">{course.title}</h3>
                            {course.links.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                    {course.links.map(link => (
                                        <a key={link.href} href={link.href} className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900" target="_blank" rel="noopener noreferrer">
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-medium text-slate-500 sm:text-right">{course.term}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
