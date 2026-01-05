window.ProjectTabContent = () => {
    const projects = [
        { title: "Sejong Science Fellowship (Oversea Track)", year: 2024, organization: "National Research Foundation of Korea (NRF)", funding: "70,000,000 KRW", period: "2024.09.01 to 2025.08.31" },
        { title: "Ph.D. Fellowship", year: 2022, organization: "National Research Foundation of Korea (NRF)", funding: "40,000,000 KRW", period: "2022.06.01 to 2024.05.31" }
    ];
    return (
        <section>
            <h2 className="text-2xl font-semibold">Funded Projects</h2>
            <ul className="mt-4 space-y-4">
                {projects.map(project => (
                    <li key={project.title} className="pb-4 border-b last:border-b-0">
                        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-gray-600">{project.organization}, {project.year}</p>
                        <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-700">
                            <li><strong>Funding:</strong> {project.funding}</li>
                            <li><strong>Period:</strong> {project.period}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
};