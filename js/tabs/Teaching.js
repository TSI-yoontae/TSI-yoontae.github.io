const labCourses = [
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

window.TeachingTabContent = () => (
    <>
        <PageIntro title="Teaching" />
        <div className="course-grid">
            {labCourses.map((course, index) => (
                <article className="course-card" key={course.title}>
                    <div className="course-meta"><span className="mono">0{index + 1}</span><span>{course.term}</span></div>
                    <h2>{course.title}</h2>
                    {course.links.length > 0 ? <details className="disclosure course-materials" open>
                        <summary>Course materials <span className="count-label">{course.links.length} resources</span><span className="disclosure-symbol" aria-hidden="true">+</span></summary>
                        <ul>{course.links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.text}</span><span className="file-type">PDF <ArrowIcon diagonal /></span></a></li>)}</ul>
                    </details> : <p className="course-no-materials">Materials will be shared when available.</p>}
                </article>
            ))}
        </div>
        <div className="inline-callout"><p>Looking for a starting point?</p><a className="text-link" href="#for-students">Explore the reading list <ArrowIcon /></a></div>
    </>
);
