window.TeachingTabContent = () => {
    const courses = [
        {
            title: 'Optimization For Data Science (Convex Optimization)',
            term: '1st Semester, 2026',
            links: [{ text: 'Convex Set & Convex Function (To be updated)', href: 'https://TSI-yoontae.github.io/js/tabs/convex/week1_convex.pdf' }],
            links: [{ text: 'Convex Optimization Problem', href: 'https://TSI-yoontae.github.io/js/tabs/convex/4_Convex_Optimization_Problem.pdf' }],
            links: [{ text: 'Lagrange Duality (Part 1)', href: 'https://TSI-yoontae.github.io/js/tabs/convex/5_Lagrange_part_1.pdf' }],
            links: [{ text: 'Lagrange Duality (Part 2)', href: 'https://TSI-yoontae.github.io/js/tabs/convex/5_Lagrange_part_2.pdf' }],
            links: [{ text: 'Dual Conjugacy', href: 'https://TSI-yoontae.github.io/js/tabs/convex/7_Conjugacy.pdf' }],
            links: [{ text: 'Decision Focused Learning (Implicit Layer)', href: 'https://TSI-yoontae.github.io/js/tabs/convex/8_DFL.pdf' }],
            links: [{ text: 'First-Order Optimization Methods', href: 'https://TSI-yoontae.github.io/js/tabs/convex/9_Optimization.pdf' }],
        },
        { title: 'Python Programming', term: '2nd Semester, 2025 / 1st Semester, 2026', links: [] },
        { title: 'Financial Application', term: '2nd Semester, 2025', links: [] },
    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">Teaching</h2>
                <p className="mt-1 text-sm leading-5 text-[#5e6676]">Courses and teaching materials.</p>
            </div>
            <div className="border border-[#d8d0c0] bg-[#fffdf8]">
                {courses.map(course => (
                    <div key={course.title} className="grid gap-1 border-b border-[#e9e2d5] px-3 py-2.5 last:border-b-0 sm:grid-cols-[1fr_210px] sm:gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-[#172033]">{course.title}</h3>
                            {course.links.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                    {course.links.map(link => (
                                        <a key={link.href} href={link.href} className="text-xs font-semibold text-[#5e6676] underline decoration-[#c3b8a5] hover:text-[#172033] hover:decoration-[#1f4e5f]" target="_blank" rel="noopener noreferrer">
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-medium text-[#746b5d] sm:text-right">{course.term}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
