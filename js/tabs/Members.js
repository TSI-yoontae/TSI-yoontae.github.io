const MemberSectionHeader = ({ title, description }) => (
    <div className="mb-2.5">
        <h2 className="tsi-heading text-xl">{title}</h2>
        {description && <p className="mt-1 max-w-4xl text-sm leading-5 text-[#5e6676]">{description}</p>}
    </div>
);

const PrincipalInvestigatorCard = ({ member }) => {
    const [showAwards, setShowAwards] = React.useState(false);
    const links = member.links || {};

    return (
        <article className="tsi-panel p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="h-28 w-28 flex-none border border-[#d8d0c0] bg-[#eceff1] object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/ECEFF1/172033?text=TSI'; }}
                />
                <div className="min-w-0 flex-1">
                    <p className="tsi-kicker">Principal Investigator</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-[#172033]">
                        {member.name} <span className="font-semibold text-[#746b5d]">({member.koreanName})</span>
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {links.scholar && <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="tsi-link text-xs">Google Scholar</a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="tsi-link text-xs">LinkedIn</a>}
                        {member.email && <a href={`mailto:${member.email}`} className="tsi-link text-xs">Email</a>}
                    </div>
                    {member.bio && <p className="mt-2 text-sm leading-5 text-[#404958]">{member.bio}</p>}

                    {member.awards && member.awards.length > 0 && (
                        <div className="mt-3 border-t border-[#e9e2d5] pt-2">
                            <button
                                onClick={() => setShowAwards(!showAwards)}
                                className="flex items-center gap-2 text-left text-sm font-bold text-[#172033]"
                            >
                                <span>Awards and Positions</span>
                                <span className="text-[#8a6f3d]">{showAwards ? '−' : '+'}</span>
                            </button>
                            {showAwards && (
                                <ul className="mt-2 space-y-1 text-sm leading-5 text-[#404958]">
                                    {[...member.awards].sort((a, b) => Number(b.year) - Number(a.year)).map((award, index) => (
                                        <li key={index} className="grid gap-2 sm:grid-cols-[70px_1fr]">
                                            <span className="font-semibold text-[#746b5d]">{award.year}</span>
                                            <span><strong className="text-[#172033]">{award.title}</strong>, {award.organization}</span>
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
                <p className="text-sm italic text-[#5e6676]">To be announced.</p>
            </section>
        );
    }

    return (
        <section className="tsi-section">
            <MemberSectionHeader title={title} />
            <ul className="grid grid-cols-1 border border-[#d8d0c0] bg-[#fffdf8] sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                    <li key={`${member.name}-${index}`} className="border-b border-[#e9e2d5] px-3 py-2 text-sm font-semibold text-[#172033] sm:border-r lg:[&:nth-child(3n)]:border-r-0">
                        {member.name}{member.koreanName ? <span className="font-medium text-[#746b5d]"> ({member.koreanName})</span> : null}
                    </li>
                ))}
            </ul>
        </section>
    );
};

window.MembersTabContent = () => {
    const membersData = window.TSI_Data.membersData || [];
    const pi = membersData.filter(m => m.status === 'Principal Investigator');
    const phdStudents = membersData.filter(m => m.status === 'PhD Student');
    const msStudents = membersData.filter(m => m.status === 'MS Student' || m.status === 'Master Thesis Track');

    return (
        <section className="space-y-5">
            <section className="tsi-section">
                <MemberSectionHeader title="Principal Investigator" />
                <div className="space-y-2">
                    {pi.map((member, index) => <PrincipalInvestigatorCard key={`${member.name}-${index}`} member={member} />)}
                </div>
            </section>
            <StudentNameList title="PhD Students" members={phdStudents} />
            <StudentNameList title="MS Students" members={msStudents} />
        </section>
    );
};
