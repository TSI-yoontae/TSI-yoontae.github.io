const { useState } = React;

const MemberCard = ({ member }) => {
    const isPI = member.status === 'Principal Investigator';
    const nameSize = isPI ? 'text-xl' : 'text-lg';
    const koreanNameSize = isPI ? 'text-lg' : 'text-base';
    const [showAwards, setShowAwards] = useState(false);

    // PI(교수님)인 경우: 기존 디자인 (사진 포함, 가로 배치)
    if (isPI) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start gap-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <img 
                    src={member.image} 
                    alt={`${member.name} 프로필 사진`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg flex-shrink-0 mx-auto sm:mx-0 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/E2E8F0/4A5568?text=Error'; }}
                />
                <div className="flex-grow flex flex-col h-full">
                    <div>
                        <h3 className={`${nameSize} font-bold text-gray-900`}>
                            {member.name} <span className={`${koreanNameSize} font-medium text-gray-600`}>({member.koreanName})</span>
                        </h3>
                        {member.currentPosition && <p className="text-md font-semibold text-purple-600">{member.currentPosition}</p>}
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
                            {member.links.scholar && <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Google Scholar</a>}
                            {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">LinkedIn</a>}
                            {member.links.OAQ && <a href={member.links.OAQ} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">OAQ</a>}
                            {member.email && <span className="text-sm text-gray-600">Email: {member.email}</span>}
                        </div>
                         {member.expertise && (
                            <p className="text-sm text-gray-800 mt-1">
                                <span className="font-semibold">Expertise:</span> {member.expertise}
                            </p>
                        )}
                    </div>

                    <div className="flex-grow">
                        {member.bio && <p className="text-sm text-gray-700 mt-2 leading-relaxed">{member.bio}</p>}
                    </div>

                    <div className="mt-auto pt-2">
                        {/* Awards Section for PI only */}
                        {member.awards && member.awards.length > 0 && (
                            <div className="pt-2">
                                <div className="border-t border-gray-200 pt-3">
                                    <button
                                        onClick={() => setShowAwards(!showAwards)}
                                        className="flex justify-between items-center w-full text-left font-semibold text-purple-700 hover:text-purple-800 transition-colors"
                                    >
                                        <span>🏆 Awards and Positions </span>
                                        <svg className={`w-5 h-5 transform transition-transform duration-200 ${showAwards ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    {showAwards && (
                                        <div className="mt-2 pl-2 space-y-2">
                                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                                {member.awards.sort((a, b) => b.year - a.year).map((award, index) => (
                                                    <li key={index}>
                                                        <strong>{award.title}</strong> ({award.year}), <em>{award.organization}</em>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 학생/기타 멤버인 경우: 사진 없음, 텍스트 중심 디자인
    return (
        <div className="bg-white p-5 rounded-lg shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col">
            <div>
                <h3 className={`${nameSize} font-bold text-gray-900`}>
                    {member.name} <span className={`${koreanNameSize} font-medium text-gray-600`}>({member.koreanName})</span>
                </h3>
                {member.currentPosition && <p className="text-md font-semibold text-purple-600 mt-1">{member.currentPosition}</p>}
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 my-2">
                    {member.links.scholar && <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Google Scholar</a>}
                    {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">LinkedIn</a>}
                    {member.email && <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">Email</a>}
                    
                    {member.status === 'Alumni' && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">Alumni</span>
                    )}
                    {member.status === 'Industry Mentor' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Industry Mentor</span>
                    )}
                </div>
                 {member.expertise && (
                    <p className="text-sm text-gray-800 mt-1">
                        <span className="font-semibold">Expertise:</span> {member.expertise}
                    </p>
                )}
            </div>

            <div className="flex-grow">
                {member.bio && <p className="text-sm text-gray-700 mt-2 leading-relaxed">{member.bio}</p>}
            </div>
            
            {/* Interests Section (학생들 연구주제) */}
            {member.interests && member.interests.length > 0 && (
                <div className="pt-3 border-t border-gray-100 mt-auto">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Research Interests</h4>
                    <div className="flex flex-wrap gap-2">
                        {member.interests.map((interest, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const MemberSection = ({ title, members, description }) => {
    const showTBD = members.length === 0 || members.every(m => m.name === "TBD");
    const isGridSection = title !== 'Principal Investigator';
    
    // PI 섹션은 공간을 넉넉하게, 학생 섹션은 그리드로 배치
    let className = "space-y-6"; 
    if (isGridSection) {
        className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold border-b pb-2 text-gray-800">{title}</h2>
            {description && (
                <p className="mt-2 mb-4 text-sm text-gray-600">{description}</p>
            )}
            <div className={showTBD ? 'mt-4' : 'mt-6'}>
                {showTBD ? (
                    <p className="text-gray-500 italic">To be determined.</p>
                ) : (
                    <div className={className}>
                        {members.map((member, idx) => <MemberCard key={member.name + idx} member={member} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

window.MembersTabContent = () => {
    const membersData = window.TSI_Data.membersData;
    
    // 데이터 필터링
    const pi = membersData.filter(m => m.status === 'Principal Investigator');
    const phdStudents = membersData.filter(m => m.status === 'PhD Student');
    
    // [수정] Master Thesis Track과 MS Students를 모두 'MS Students'로 통합
    // 데이터상 status가 'MS Student'인 것들을 모두 가져옴 (데이터 파일에서 통일시킬 예정)
    const msStudents = membersData.filter(m => m.status === 'MS Student' || m.status === 'Master Thesis Track');
    
    const industryMentors = membersData.filter(m => m.status === 'Industry Mentor');
    const alumni = membersData.filter(m => m.status === 'Alumni');

    return (
        <section className="space-y-16 mb-20">
            <MemberSection title="Principal Investigator" members={pi} />
            
            <MemberSection title="PhD Students" members={phdStudents} />
            
            {/* 통합된 MS Students 섹션 */}
            <MemberSection 
                title="MS Students" 
                members={msStudents} 
                description="Graduate students in the Master of Science program."
            />
            
            <MemberSection 
                title="Mentoring" 
                members={industryMentors} 
                description="Our mentors are experts who provide guidance on specific industry career paths."
            />
            
            <MemberSection title="Alumni" members={alumni} />
        </section>
    );
};
