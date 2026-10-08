// Paper-specific affiliations preserve historical institutions. Member lists
// and the PI's own affiliations do not create collaboration edges.
const networkAuthorName = name => (name || '').replace(/[*†]/g, '').trim().replace(/\s+/g, ' ');
const networkAuthorKey = name => networkAuthorName(name).toLowerCase();
const isNetworkRoot = author => networkAuthorKey(author.name) === 'yoontae hwang';
const getCoauthoredPapers = papers => [...new Map(papers.filter(paper =>
    (paper.authors || []).some(isNetworkRoot) && paper.authors.some(author => !isNetworkRoot(author))
).map(paper => [paper.title, paper])).values()];

const buildResearchNetwork = sourcePapers => {
    const papers = getCoauthoredPapers(sourcePapers);
    const people = new Map();
    const organizations = new Map();
    for (const paper of papers) {
        for (const author of paper.authors.filter(author => !isNetworkRoot(author))) {
            const key = networkAuthorKey(author.name);
            if (!key) continue;
            if (!people.has(key)) people.set(key, {
                id: 'researcher:' + key, name: networkAuthorName(author.name), href: author.href,
                paperTitles: new Set(), institutions: new Map(),
            });
            const person = people.get(key);
            person.paperTitles.add(paper.title);
            for (const name of new Set(author.affiliations || [])) {
                // Independent researchers remain people, not an invented institution.
                if (!name.trim() || /^independent researcher$/i.test(name)) continue;
                if (!organizations.has(name)) organizations.set(name, {
                    id: 'institution:' + name, name, paperTitles: new Set(), researcherIds: new Set(),
                });
                const institution = organizations.get(name);
                institution.paperTitles.add(paper.title);
                institution.researcherIds.add(person.id);
                if (!person.institutions.has(name)) person.institutions.set(name, new Set());
                person.institutions.get(name).add(paper.title);
            }
        }
    }
    const byPaperCount = (a, b) => b.paperCount - a.paperCount || a.name.localeCompare(b.name, 'en');
    const researchers = [...people.values()].map(person => ({
        ...person, kind: 'researcher', paperTitles: [...person.paperTitles], paperCount: person.paperTitles.size,
        institutions: [...person.institutions].map(([name, titles]) => ({
            id: 'institution:' + name, name, paperCount: titles.size,
        })).sort(byPaperCount),
    })).sort(byPaperCount);
    const institutions = [...organizations.values()].map(institution => ({
        ...institution, kind: 'institution', paperTitles: [...institution.paperTitles],
        paperCount: institution.paperTitles.size, researcherIds: [...institution.researcherIds],
    })).sort(byPaperCount);
    return { papers, researchers, institutions };
};

const filterNetworkEntities = (network, kind, query = '') => {
    const value = query.toLowerCase().trim();
    const entities = kind === 'researcher' ? network.researchers : network.institutions;
    if (!value) return entities;
    const names = new Map(network.researchers.map(person => [person.id, person.name]));
    return entities.filter(entity => [entity.name,
        ...(entity.institutions || []).map(institution => institution.name),
        ...(entity.researcherIds || []).map(id => names.get(id)),
    ].join(' ').toLowerCase().includes(value));
};
