const PrincipalInvestigatorCard = ({ member }) => (
    <article className="pi-profile">
        <div className="pi-portrait"><img src={member.image} alt={member.koreanName} width="360" height="440" /><p className="eyebrow" lang="ko">연구책임자</p></div>
        <div className="pi-copy">
            <h2 lang="ko">{member.koreanName}</h2>
            <ResourceLinks links={[
                ...(member.links?.scholar ? [{ text: 'Google Scholar', href: member.links.scholar }] : []),
                ...(member.links?.linkedin ? [{ text: 'LinkedIn', href: member.links.linkedin }] : []),
                ...(member.email ? [{ text: 'Email', href: 'mailto:' + member.email }] : []),
            ]} />
            <p className="pi-bio">{member.bio}</p>
            {member.awards?.length > 0 && <details className="disclosure">
                <summary>Awards and positions<span aria-hidden="true" className="disclosure-symbol">+</span></summary>
                <ul className="awards-list">{[...member.awards].sort((a, b) => b.year - a.year).map(award =>
                    <li key={award.title}><span className="mono">{award.year}</span><div><strong>{award.title}</strong><p>{award.organization}</p></div></li>
                )}</ul>
            </details>}
        </div>
    </article>
);

const StudentSection = ({ title, members }) => {
    const namedMembers = members.filter(member => member.name !== 'TBD')
        .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    return (
        <section className="content-section" lang="ko">
            <SectionHeading title={title}>{namedMembers.length > 0 && <span className="count-label">{namedMembers.length}명</span>}</SectionHeading>
            {namedMembers.length ? <ul className="student-list">{namedMembers.map(member => (
                <li key={member.name}>{member.name}</li>
            ))}</ul> : <p className="muted">등록된 학생이 없습니다.</p>}
        </section>
    );
};

window.MembersTabContent = () => {
    const members = window.TSI_Data.membersData || [];
    return (
        <>
            <PageIntro title="Members" />
            {members.filter(member => member.status === 'Principal Investigator').map(member => <PrincipalInvestigatorCard key={member.name} member={member} />)}
            <StudentSection title="박사과정" members={members.filter(member => member.status === 'PhD Student')} />
            <StudentSection title="석사과정" members={members.filter(member => ['MS Student', 'Master Thesis Track'].includes(member.status))} />
            <div className="inline-callout"><a className="text-link" href="#vacant">Read about joining the lab <ArrowIcon /></a></div>
        </>
    );
};
