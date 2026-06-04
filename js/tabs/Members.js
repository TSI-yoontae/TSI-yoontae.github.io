const MemberSectionHeader = ({ title, description }) => (
    <div className="mb-3">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-950">{title}</h2>
        {description && <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-600">{description}</p>}
    </div>
);

const PrincipalInvestigatorCard = ({ member }) => {
    const [showAwards, setShowAwards] = React.useState(false);
    const links = member.links || {};

    return (
        <article className="border border-slate-200 bg-white p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="h-28 w-28 flex-none border border-slate-200 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/E2E8F0/4A5568?text=TSI'; }}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Principal Investigator</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">
                        {member.name} <span className="font-semibold text-slate-500">({member.koreanName})</span>
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {links.scholar && <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">Google Scholar</a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">LinkedIn</a>}
                        {links.OAQ && <a href={links.OAQ} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">OAQ</a>}
                        {member.email && <a href={`mailto:${member.email}`} className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">Email</a>}
                    </div>
                    {member.bio && <p className="mt-2 text-sm leading-5 text-slate-700">{member.bio}</p>}

                    {member.awards && member.awards.length > 0 && (
                        <div className="mt-3 border-t border-slate-100 pt-2">
                            <button
                                onClick={() => setShowAwards(!showAwards)}
                                className="flex items-center gap-2 text-left text-sm font-bold text-slate-950"
                            >
                                <span>Awards and Positions</span>
                                <span className="text-slate-500">{showAwards ? '−' : '+'}</span>
                            </button>
                            {showAwards && (
                                <ul className="mt-2 space-y-1 text-sm leading-5 text-slate-700">
                                    {[...member.awards].sort((a, b) => b.year - a.year).map((award, index) => (
                                        <li key={index} className="grid gap-2 sm:grid-cols-[48px_1fr]">
                                            <span className="font-semibold text-slate-500">{award.year}</span>
                                            <span><strong className="text-slate-900">{award.title}</strong>, {award.organization}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

const StudentNameList = ({ title, members }) => {
    if (!members || members.length === 0) {
        return (
            <section className="tsi-section">
                <MemberSectionHeader title={title} />
                <p className="text-sm italic text-slate-500">To be announced.</p>
            </section>
        );
    }

    return (
        <section className="tsi-section">
            <MemberSectionHeader title={title} />
            <ul className="grid grid-cols-1 border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                    <li key={`${member.name}-${index}`} className="border-b border-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 sm:border-r lg:[&:nth-child(3n)]:border-r-0">
                        {member.name}{member.koreanName ? <span className="font-medium text-slate-500"> ({member.koreanName})</span> : null}
                    </li>
                ))}
            </ul>
        </section>
    );
};

const MentorCard = ({ member }) => {
    const links = member.links || {};

    return (
        <article className="border border-slate-200 bg-white p-3">
            <div className="flex gap-3">
                {member.image && (
                    <img
                        src={member.image}
                        alt={`${member.name} profile`}
                        className="h-14 w-14 flex-none border border-slate-200 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x160/E2E8F0/4A5568?text=TSI'; }}
                    />
                )}
                <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-950">
                        {member.name} {member.koreanName && <span className="font-medium text-slate-500">({member.koreanName})</span>}
                    </h3>
                    {member.currentPosition && <p className="mt-0.5 text-sm leading-5 text-slate-600">{member.currentPosition}</p>}
                    {member.expertise && <p className="mt-1 text-sm leading-5 text-slate-700"><span className="font-semibold text-slate-900">Expertise:</span> {member.expertise}</p>}
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        {links.scholar && <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">Google Scholar</a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 underline decoration-slate-300 hover:text-slate-950 hover:decoration-slate-900">LinkedIn</a>}
                    </div>
                </div>
            </div>
        </article>
    );
};

const MentorSection = ({ members }) => {
    if (!members || members.length === 0) return null;

    return (
        <section className="tsi-section">
            <MemberSectionHeader
                title="Mentoring"
                description="Industry mentors provide focused guidance on applied research and career paths."
            />
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {members.map((member, index) => <MentorCard key={`${member.name}-${index}`} member={member} />)}
            </div>
        </section>
    );
};

window.MembersTabContent = () => {
    const membersData = window.TSI_Data.membersData || [];
    const pi = membersData.filter(m => m.status === 'Principal Investigator');
    const phdStudents = membersData.filter(m => m.status === 'PhD Student');
    const msStudents = membersData.filter(m => m.status === 'MS Student' || m.status === 'Master Thesis Track');
    const industryMentors = membersData.filter(m => m.status === 'Industry Mentor');

    return (
        <section className="space-y-5">
            <div>
                <MemberSectionHeader
                    title="Members"
                    description="Students are listed by name only to keep the page compact and easy to scan."
                />
            </div>
            <section className="tsi-section">
                <MemberSectionHeader title="Principal Investigator" />
                <div className="space-y-2">
                    {pi.map((member, index) => <PrincipalInvestigatorCard key={`${member.name}-${index}`} member={member} />)}
                </div>
            </section>
            <StudentNameList title="PhD Students" members={phdStudents} />
            <StudentNameList title="MS Students" members={msStudents} />
            <MentorSection members={industryMentors} />
        </section>
    );
};
