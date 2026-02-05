window.TeachingTabContent = () => (
    <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Teaching</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4">
            {/* Optimization For Data Science */}
            <li>
                <strong>Optimization For Data Science (Convex Optimization)</strong>
                <br/> 
                1st Semester, 2026
                <br/>
                {/* Week 1 강의노트 링크 반영 */}
                <a 
                    href="https://TSI-yoontae.github.io/js/tabs/convex/week1_convex.pdf" 
                    className="text-blue-600 hover:underline text-sm inline-flex items-center mt-1"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    [Lecture Notes - Week 1]
                </a>
            </li>

            {/* Python Programming */}
            <li>
                <strong>Python Programming</strong>
                <br/>
                2nd Semester, 2025
            </li>

            {/* Financial Application */}
            <li>
                <strong>Financial Application</strong>
                <br/>
                2nd Semester, 2025 / 1st Semester, 2026
            </li>
        </ul>
    </section>
);
