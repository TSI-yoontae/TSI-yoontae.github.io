window.TeachingTabContent = () => {
    const courses = [
        {
            title: 'Optimization For Data Science (Convex Optimization)',
            term: '1st Semester, 2026',
            links: [
                { text: 'Convex Set & Convex Function (To be updated)', href: 'js/tabs/convex/week1_convex.pdf' },
                { text: 'Convex Optimization Problem', href: 'js/tabs/convex/4_Convex_Optimization_Problem.pdf' },
                { text: 'Lagrange Duality (Part 1)', href: 'js/tabs/convex/5_Lagrange_part_1.pdf' },
                { text: 'Lagrange Duality (Part 2)', href: 'js/tabs/convex/6_Lagrange_part_2.pdf' },
                { text: 'Dual Conjugacy', href: 'js/tabs/convex/7_Conjugacy.pdf' },
                { text: 'Decision Focused Learning (Implicit Layer)', href: 'js/tabs/convex/8_DFL.pdf' },
                { text: 'First-Order Optimization Methods', href: 'js/tabs/convex/9_Optimization.pdf' },
            ],
        },
        { title: 'Foundation Models', term: '2nd Semester, 2026', links: [] },
        { title: 'Financial Application', term: '2nd Semester, 2025 / 2nd Semester, 2026', links: [] },
        { title: 'Python Programming', term: '2nd Semester, 2025 / 1st Semester, 2026', links: [] },

    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">Teaching</h2>
                <p className="mt-1 text-sm leading-5 text-[#5e6676]">Courses and teaching materials.</p>
            </div>
            <div className="border border-[#d8d0c0] bg-[#fffdf8]">
                {courses.map(course => (
                    <div key={course.title} className="grid gap-2 border-b border-[#e9e2d5] px-4 py-3 last:border-b-0 md:grid-cols-[1fr_280px] md:gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-[#172033]">{course.title}</h3>
                            {course.links.length > 0 && (
                                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                                    {course.links.map(link => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="block border border-[#e9e2d5] bg-[#f8f5ed] px-2 py-1.5 text-xs font-semibold text-[#5e6676] no-underline hover:border-[#b7aa91] hover:bg-[#fffdf8] hover:text-[#172033]"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="mr-1 text-[#8a6f3d]">•</span>
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-medium text-[#746b5d] md:text-right">{course.term}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
