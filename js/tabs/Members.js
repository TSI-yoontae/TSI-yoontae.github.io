const PrincipalInvestigatorCard = ({ member }) => (
    <article className="pi-profile">
        <div className="pi-portrait"><img src={member.image} alt={member.name} width="360" height="440" /><p className="eyebrow">Principal Investigator</p></div>
        <div className="pi-copy">
            <p className="eyebrow">Meet the principal investigator</p>
            <h2>{member.name}<span lang="ko">{member.koreanName}</span></h2>
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
    const namedMembers = members.filter(member => member.name !== 'TBD');
    return (
        <section className="content-section">
            <SectionHeading title={title}>{namedMembers.length > 0 && <span className="count-label">{namedMembers.length} members</span>}</SectionHeading>
            {namedMembers.length ? <div className="member-grid">{namedMembers.map(member => (
                <article className="member-card" key={member.name}>
                    <div className="member-monogram" aria-hidden="true">{member.name.split(' ').map(name => name[0]).join('')}</div>
                    <div><h3>{member.name}</h3>{member.koreanName && <p lang="ko" className="member-korean">{member.koreanName}</p>}
                        {member.interests?.length > 0 && <p className="member-interests">{member.interests.join(' · ')}</p>}
                    </div>
                </article>
            ))}</div> : <p className="muted">To be announced.</p>}
        </section>
    );
};

window.MembersTabContent = () => {
    const members = window.TSI_Data.membersData || [];
    return (
        <>
            <PageIntro eyebrow="People" title="Members" description="A research group connecting machine learning, time series, and financial decision-making." />
            {members.filter(member => member.status === 'Principal Investigator').map(member => <PrincipalInvestigatorCard key={member.name} member={member} />)}
            <StudentSection title="PhD students" members={members.filter(member => member.status === 'PhD Student')} />
            <StudentSection title="MS students" members={members.filter(member => ['MS Student', 'Master Thesis Track'].includes(member.status))} />
            <div className="inline-callout"><p>Interested in our research culture?</p><a className="text-link" href="#vacant">Read about joining the lab <ArrowIcon /></a></div>
        </>
    );
};
