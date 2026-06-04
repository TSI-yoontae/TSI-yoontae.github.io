window.ProjectTabContent = () => {
    const projects = [
        { title: 'Sejong Science Fellowship (Oversea Track)', year: 2024, organization: 'National Research Foundation of Korea (NRF)', funding: '70,000,000 KRW', period: '2024.09.01 to 2025.08.31' },
        { title: 'Ph.D. Fellowship', year: 2022, organization: 'National Research Foundation of Korea (NRF)', funding: '40,000,000 KRW', period: '2022.06.01 to 2024.05.31' },
    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">Funded Projects</h2>
                <p className="mt-1 text-sm leading-5 text-[#5e6676]">Selected research grants and fellowships.</p>
            </div>
            <div className="border border-[#d8d0c0] bg-[#fffdf8]">
                {projects.map(project => (
                    <article key={project.title} className="border-b border-[#e9e2d5] px-3 py-2.5 last:border-b-0">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <h3 className="text-sm font-bold text-[#172033]">{project.title}</h3>
                            <p className="text-xs font-semibold text-[#746b5d]">{project.year}</p>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-[#5e6676]">{project.organization}</p>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#404958]">
                            <p><strong className="text-[#172033]">Funding:</strong> {project.funding}</p>
                            <p><strong className="text-[#172033]">Period:</strong> {project.period}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
