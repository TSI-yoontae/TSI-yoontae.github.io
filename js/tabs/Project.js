window.ProjectTabContent = () => {
    const projects = [
{
            title: '글로컬R&D',
            year: 2026,
            role: '책임연구원',
            organization: 'National Research Foundation of Korea (NRF)',
            funding: '600,000,000 KRW',
            period: '2026.09 - Present',
        },
        {
            title: 'GLOW-AI 혁신인재양성 교육연구단',
            year: 2025,
            role: '참여연구원',
            organization: '4단계 BK21 사업',
            period: '2025.11 - Present',
        },
        {
            title: '지역산업 혁신을 위한 지역 수요 중심 데이터사이언스 융합인재 양성사업',
            year: 2025,
            role: '참여연구원',
            organization: '과학기술정보통신부 데이터사이언스융합인재양성',
            period: '2025.09 - Present',
        },
        {
            title: 'Sejong Science Fellowship (Oversea Track)',
            year: 2024,
            organization: 'National Research Foundation of Korea (NRF)',
            funding: '70,000,000 KRW',
            period: '2024.09.01 - 2025.08.31',
        },
        {
            title: 'Ph.D. Fellowship',
            year: 2022,
            organization: 'National Research Foundation of Korea (NRF)',
            funding: '40,000,000 KRW',
            period: '2022.06.01 - 2024.05.31',
        },
    ];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">
                    Funded Projects
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#5e6676]">
                    Selected research projects, grants, and fellowships.
                </p>
            </div>

            <div className="border border-[#d8d0c0] bg-[#fffdf8]">
                {projects.map((project) => (
                    <article
                        key={`${project.title}-${project.period}`}
                        className="border-b border-[#e9e2d5] px-3 py-2.5 last:border-b-0"
                    >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <h3 className="text-sm font-bold text-[#172033]">
                                {project.title}
                            </h3>
                            <p className="shrink-0 text-xs font-semibold text-[#746b5d]">
                                {project.year}
                            </p>
                        </div>

                        <p className="mt-1 text-sm leading-5 text-[#5e6676]">
                            {project.organization}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#404958]">
                            {project.role && (
                                <p>
                                    <strong className="text-[#172033]">Role:</strong>{' '}
                                    {project.role}
                                </p>
                            )}

                            {project.funding && (
                                <p>
                                    <strong className="text-[#172033]">Funding:</strong>{' '}
                                    {project.funding}
                                </p>
                            )}

                            <p>
                                <strong className="text-[#172033]">Period:</strong>{' '}
                                {project.period}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
