const MemberSectionHeader = ({ title, description }) => (
    <div className="border-b border-slate-200 pb-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>}
    </div>
);

const PrincipalInvestigatorCard = ({ member }) => {
    const [showAwards, setShowAwards] = React.useState(false);
    const links = member.links || {};

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row">
                <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="h-32 w-32 flex-none rounded-2xl object-cover shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/E2E8F0/4A5568?text=TSI'; }}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Principal Investigator</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                        {member.name} <span className="font-semibold text-slate-500">({member.koreanName})</span>
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {links.scholar && <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950">Google Scholar</a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950">LinkedIn</a>}
                        {links.OAQ && <a href={links.OAQ} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950">OAQ</a>}
                        {member.email && <a href={`mailto:${member.email}`} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950">Email</a>}
                    </div>
                    {member.bio && <p className="mt-5 text-sm leading-7 text-slate-700">{member.bio}</p>}

                    {member.awards && member.awards.length > 0 && (
                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                            <button
                                onClick={() => setShowAwards(!showAwards)}
                                className="flex w-full items-center justify-between text-left text-sm font-bold text-slate-950"
                            >
                                <span>Awards and Positions</span>
                                <span className="text-slate-500">{showAwards ? '−' : '+'}</span>
                            </button>
                            {showAwards && (
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                                    {[...member.awards].sort((a, b) => b.year - a.year).map((award, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="w-12 flex-none font-semibold text-slate-500">{award.year}</span>
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
            <section className="space-y-4">
                <MemberSectionHeader title={title} />
                <p className="text-sm italic text-slate-500">To be announced.</p>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            <MemberSectionHeader title={title} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <li key={`${member.name}-${index}`} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                            {member.name}{member.koreanName ? <span className="font-medium text-slate-500"> ({member.koreanName})</span> : null}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

const MentorCard = ({ member }) => {
    const links = member.links || {};

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4">
                {member.image && (
                    <img
                        src={member.image}
                        alt={`${member.name} profile`}
                        className="h-16 w-16 flex-none rounded-xl object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x160/E2E8F0/4A5568?text=TSI'; }}
                    />
                )}
                <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-950">
                        {member.name} {member.koreanName && <span className="font-medium text-slate-500">({member.koreanName})</span>}
                    </h3>
                    {member.currentPosition && <p className="mt-1 text-sm text-slate-600">{member.currentPosition}</p>}
                    {member.expertise && <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-slate-900">Expertise:</span> {member.expertise}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {links.scholar && <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">Google Scholar</a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">LinkedIn</a>}
                    </div>
                </div>
            </div>
        </article>
    );
};

const MentorSection = ({ members }) => {
    if (!members || members.length === 0) return null;

    return (
        <section className="space-y-4">
            <MemberSectionHeader
                title="Mentoring"
                description="Industry mentors provide focused guidance on applied research and career paths."
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
        <section className="space-y-10">
            <div>
                <MemberSectionHeader
                    title="Members"
                    description="Student information is intentionally kept as a simple name list for readability."
                />
            </div>
            <section className="space-y-4">
                <MemberSectionHeader title="Principal Investigator" />
                <div className="space-y-4">
                    {pi.map((member, index) => <PrincipalInvestigatorCard key={`${member.name}-${index}`} member={member} />)}
                </div>
            </section>
            <StudentNameList title="PhD Students" members={phdStudents} />
            <StudentNameList title="MS Students" members={msStudents} />
            <MentorSection members={industryMentors} />
        </section>
    );
};
