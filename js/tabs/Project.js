window.ProjectTabContent = () => {
    const projects = [
        { title: 'Sejong Science Fellowship (Oversea Track)', year: 2024, organization: 'National Research Foundation of Korea (NRF)', funding: '70,000,000 KRW', period: '2024.09.01 to 2025.08.31' },
        { title: 'Ph.D. Fellowship', year: 2022, organization: 'National Research Foundation of Korea (NRF)', funding: '40,000,000 KRW', period: '2022.06.01 to 2024.05.31' },
    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Funded Projects</h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">Selected research grants and fellowships.</p>
            </div>
            <div className="border border-slate-200 bg-white">
                {projects.map(project => (
                    <article key={project.title} className="border-b border-slate-100 px-3 py-2.5 last:border-b-0">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <h3 className="text-sm font-bold text-slate-950">{project.title}</h3>
                            <p className="text-xs font-semibold text-slate-500">{project.year}</p>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-slate-600">{project.organization}</p>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
                            <p><strong className="text-slate-900">Funding:</strong> {project.funding}</p>
                            <p><strong className="text-slate-900">Period:</strong> {project.period}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
