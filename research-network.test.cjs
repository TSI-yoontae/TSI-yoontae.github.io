const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const helpers = vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'js/research-network-data.js'), 'utf8')
    + '\n({buildResearchNetwork, getCoauthoredPapers, filterNetworkEntities})');
const build = papers => JSON.parse(JSON.stringify(helpers.buildResearchNetwork(papers)));
const root = { name: 'Yoontae Hwang†', affiliations: ['PI-only institution'] };
const paper = (title, authors) => ({ title, authors: [root, ...authors] });

test('counts papers once per institution even with several coauthors and duplicate records', () => {
    const first = paper('Paper A', [{ name: 'Alice*', affiliations: ['Oxford', 'Oxford'] }, { name: 'Bob', affiliations: ['Oxford'] }]);
    const network = build([first, first, paper('Paper B', [{ name: 'Alice†', affiliations: ['Oxford'] }])]);
    assert.equal(network.papers.length, 2);
    assert.equal(network.researchers.length, 2);
    assert.equal(network.researchers[0].name, 'Alice');
    assert.equal(network.researchers[0].paperCount, 2);
    assert.equal(network.institutions.length, 1);
    assert.equal(network.institutions[0].paperCount, 2);
    assert.equal(network.institutions[0].researcherIds.length, 2);
});

test('does not infer an institution for an unaffiliated or independent researcher', () => {
    const network = build([paper('Paper', [{ name: 'Alice' }, { name: 'Bob', affiliations: ['Independent Researcher'] }])]);
    assert.equal(network.researchers.length, 2);
    assert.equal(network.institutions.length, 0);
    assert.equal(network.researchers[0].institutions.length, 0);
});

test('filtered papers retain only the affiliations recorded in that subset', () => {
    const older = paper('Older', [{ name: 'Alice', affiliations: ['Oxford'] }]);
    const newer = paper('Newer', [{ name: 'Alice', affiliations: ['UNIST', 'LinqAlpha'] }]);
    assert.equal(build([older, newer]).institutions.length, 3);
    assert.deepEqual(build([older]).researchers[0].institutions.map(item => item.name), ['Oxford']);
    assert.deepEqual(build([newer]).institutions.map(item => item.name).sort(), ['LinqAlpha', 'UNIST']);
});

test('excludes solo work and papers without the PI; does not merge similar names', () => {
    const network = build([{title:'Solo',authors:[root]}, {title:'Other',authors:[{name:'Alice'}]},
        paper('Together', [{name:'Juhyeong Kim'}, {name:'Junhyung Kim'}])]);
    assert.equal(network.papers.length, 1);
    assert.equal(network.researchers.length, 2);
    assert.equal(build([]).papers.length, 0);
});

test('search resolves people by institution and institutions by their actual coauthors', () => {
    const network = build([paper('A', [{name:'Alice',affiliations:['Oxford']}]), paper('B',[{name:'Bob',affiliations:['UNIST']}])]);
    assert.equal(helpers.filterNetworkEntities(network, 'researcher', ' OXFORD ')[0].name, 'Alice');
    assert.equal(helpers.filterNetworkEntities(network, 'institution', 'Alice')[0].name, 'Oxford');
    assert.equal(helpers.filterNetworkEntities(network, 'institution', 'not listed').length, 0);
});

test('live records connect only verified author affiliations and preserve bilingual member counts', () => {
    const context = {window:{}};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'js/data.js'), 'utf8'), context);
    const data = context.window.TSI_Data;
    const network = build(data.allPapers);
    const hots = build(data.publications.filter(item => item.id === '[C17]'));
    assert.equal(network.papers.length, 31);
    assert.equal(hots.researchers.length, 2);
    assert.deepEqual(hots.institutions.map(item => item.name).sort(), ['LinqAlpha', 'UNIST']);
    assert.equal(data.membersData.filter(member => member.status === 'MS Student').length, 15);
    assert.equal(data.membersData.filter(member => member.status === 'PhD Student').length, 1);
    assert(data.membersData.every(member => member.englishName?.trim()));
});
