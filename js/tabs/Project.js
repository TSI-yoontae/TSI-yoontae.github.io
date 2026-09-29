window.TSI_Data.projects = [
    {
        title: '2026학년도 신진교수 지원사업',
        year: 2026,
        role: '책임연구자',
        organization: 'Pusan National University (국립대육성사업)',
        funding: '20,000,000 KRW',
        period: '2026.10 - Present',
    },
    {
        title: '글로컬 R&D (with University of Oxford)',
        year: 2026,
        role: '책임연구자',
        organization: 'National Research Foundation of Korea (NRF)',
        funding: '600,000,000 KRW',
        period: '2026.09 - Present',
    },
    {
        title: '기업 공시자료의 한계가치에 관한 연구',
        year: 2026,
        role: '책임연구자',
        organization: '한국금융학회',
        funding: '10,000,000 KRW',
        period: '2026.09 - Present',
    },
    {
        title: '글로벌데이터리더양성사업 (with National University of Singapore)',
        year: 2026,
        role: '참여연구원(세부책임)',
        organization: 'National Research Foundation of Korea (NRF)',
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

const getProjectStatus = (project, now = new Date()) => {
    const dates = (project.period || '').match(/\d{4}\.\d{2}(?:\.\d{2})?/g) || [];
    if (!dates.length) return 'Ongoing';
    const month = date => Number(date.slice(0, 4)) * 12 + Number(date.slice(5, 7));
    const currentMonth = now.getFullYear() * 12 + now.getMonth() + 1;
    if (month(dates[0]) > currentMonth) return 'Upcoming';
    if (!/present|ongoing/i.test(project.period) && dates[1] && month(dates[1]) < currentMonth) return 'Completed';
    return 'Ongoing';
};

const ProjectEntry = ({ project, showStatus = false }) => (
    <article className="project-entry">
        <div className="project-year"><span className="mono">{project.year}</span>{showStatus && <span className={'project-status status-' + getProjectStatus(project).toLowerCase()}>{getProjectStatus(project)}</span>}</div>
        <div className="project-body"><h3 lang={/[가-힣]/.test(project.title) ? 'ko' : undefined}>{project.title}</h3><p className="project-organization">{project.organization}</p>
            <dl className="project-details">
                {project.role && <div><dt>Role</dt><dd lang="ko">{project.role}</dd></div>}
                <div><dt>Period</dt><dd>{project.period}</dd></div>
            </dl>
        </div>
        {project.funding && <div className="project-funding"><strong>{project.funding.replace(' KRW', '')}</strong><span>KRW · full project period</span></div>}
    </article>
);

window.ProjectTabContent = () => {
    const projects = window.TSI_Data.projects || [];
    const [status, setStatus] = React.useState('All');
    const filtered = projects.filter(project => status === 'All' || getProjectStatus(project) === status);
    return (
        <>
            <PageIntro title="Funded Projects" />
            <div className="section-heading">
                <div className="filter-group" role="group" aria-label="Project status">{['All', 'Ongoing', 'Upcoming', 'Completed'].map(item =>
                    <FilterButton key={item} active={item === status} onClick={() => setStatus(item)}>{item}</FilterButton>)}</div>
                <p className="count-label" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
            </div>
            <div className="project-list">{filtered.map(project => <ProjectEntry key={project.title} project={project} showStatus />)}</div>
            {!filtered.length && <EmptyState>No projects are listed in this category.</EmptyState>}
            <p className="fine-print">Amounts, where available, cover the full project period. Principal investigator and participating researcher roles are included.</p>
        </>
    );
};
