const VacantSectionTitle = ({ title, description }) => (
    <div className="mb-2.5">
        <h3 className="text-lg font-extrabold tracking-tight text-[#172033]">
            {title}
        </h3>

        {description && (
            <p className="mt-1 text-sm leading-5 text-[#5e6676]">
                {description}
            </p>
        )}
    </div>
);

const VacantPhilosophySection = () => (
    <section className="tsi-section">
        <VacantSectionTitle
            title="Research Philosophy"
            description="This section summarizes the lab's research culture for prospective students."
        />

        <div className="border border-[#d8d0c0] bg-[#eceff1] px-3 py-3">
            <blockquote className="border-l-2 border-[#243044] pl-3 text-sm font-semibold leading-5 text-[#172033]">
                “Research is meaningful only when its insights leave the lab
                and change the world.”
            </blockquote>

            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {[
                    [
                        'Impact-driven',
                        'Start from concrete problems in finance and markets.',
                    ],
                    [
                        'Academically rigorous',
                        'Build methods and evidence that stand up to top-tier review.',
                    ],
                    [
                        'Open and collaborative',
                        'Share ideas, code, and results when possible.',
                    ],
                ].map(([title, body]) => (
                    <div
                        key={title}
                        className="border-t border-[#d8d0c0] pt-2 md:border-l md:border-t-0 md:pl-3 md:pt-0"
                    >
                        <h4 className="text-sm font-bold text-[#172033]">
                            {title}
                        </h4>

                        <p className="mt-0.5 text-sm leading-5 text-[#5e6676]">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const vacantProfileCopy = {
    en: {
        title: 'Preferred Profile (Updated September 2026)',
        introduction: 'We are looking for students with solid mathematics and programming skills. Demonstrated excellence or active participation in data-science competitions such as Dacon or Kaggle is highly valued. Achievements from the majority of domestic competitions and awards in South Korea are not considered.',
        policyTitle: 'Lab Admission & Graduation Policy',
        policies: [
            {
                id: 'admission',
                label: 'Prior Contact & Lab Admission',
                text: 'Prior contact with the advisor is mandatory before joining the lab. Applicants who have not contacted the advisor in advance cannot join the lab, regardless of whether they need financial support.',
            },
            {
                id: 'masters',
                label: 'M.S. Graduation',
                text: "Graduation may be extended beyond four semesters if the thesis does not meet the advisor's standards.",
            },
            {
                id: 'doctoral',
                label: 'Ph.D. & Integrated Ph.D. Graduation',
                text: 'A minimum of 4 publications is required to graduate. This total must consist of at least 2 top-tier AI conference papers, plus publications in the target journals listed below.',
            },
            {
                id: 'membership',
                label: 'Continued Lab Membership',
                text: 'Joining the lab does not guarantee continued supervision. Students are expected to demonstrate sustained initiative, ownership, and commitment to research. A student who shows insufficient research motivation or consistently fails to engage seriously in research may be required to find another advisor immediately, without prior warning.',
            },
        ],
        statusTitle: 'Current Status: All Regular Recruitment Closed',
        closedText: 'Recruitment for the Ph.D., MS-Ph.D. integrated, M.S., and internship programs is currently closed.',
        exceptionText: 'However, exceptionally motivated applicants may still be considered on a case-by-case basis if they demonstrate strong preparation and a clear commitment to producing high-impact research.',
        doctoralStatus: 'Ph.D. / Integrated: Closed',
        mastersStatus: 'M.S. / Internships: Closed',
        exceptionStatus: 'Exceptional Applicants May Be Considered',
    },
    ko: {
        title: '지원자 요건 및 안내 (2026년 9월 수정)',
        introduction: '수학과 프로그래밍 기초가 탄탄한 학생을 찾습니다. Dacon, Kaggle 등 데이터사이언스 경진대회의 참여 경험과 성과를 중요하게 평가합니다. 그 외 대부분의 국내 대회 수상 실적은 평가에 반영하지 않습니다.',
        policyTitle: '연구실 합류 및 졸업 기준',
        policies: [
            {
                id: 'admission',
                label: '사전 컨택 및 연구실 합류',
                text: '연구실 합류 전 지도교수와의 사전 컨택이 필수입니다. 재정 지원 필요 여부와 관계없이, 사전 컨택 없이 연구실에 합류할 수 없습니다.',
            },
            {
                id: 'masters',
                label: '석사 졸업',
                text: '학위논문이 지도교수의 기준에 미치지 못하면 수학 기간이 4학기를 초과할 수 있습니다.',
            },
            {
                id: 'doctoral',
                label: '박사·석박사통합 졸업',
                text: '최상위 AI 학회 논문 2편 이상과 아래 명시된 목표 학술지 논문을 포함해, 총 4편 이상의 논문이 필요합니다.',
            },
            {
                id: 'membership',
                label: '지도 및 연구실 소속 유지',
                text: '연구실 합류가 지속적인 지도를 보장하지는 않습니다. 학생은 연구를 주도적으로 수행하고 지속적으로 참여해야 합니다. 연구 의지가 부족하거나 성실한 연구 참여가 지속적으로 이루어지지 않을 경우, 사전 경고 없이 즉시 지도교수 변경을 요구받을 수 있습니다.',
            },
        ],
        statusTitle: '모집 현황: 모든 정규 모집 마감',
        closedText: '현재 박사, 석박사통합, 석사 및 인턴 과정의 정규 모집은 마감되었습니다.',
        exceptionText: '다만, 연구 준비가 충분하고 우수한 연구 성과를 내고자 하는 의지가 뚜렷한 지원자는 예외적으로 검토할 수 있습니다.',
        doctoralStatus: '박사 / 석박사통합: 마감',
        mastersStatus: '석사 / 인턴: 마감',
        exceptionStatus: '예외적 개별 검토 가능',
    },
};

const VacantPreferredProfileSection = () => {
    const [language, setLanguage] = React.useState('en');
    const copy = vacantProfileCopy[language];

    return (
        <section className="tsi-section">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div lang={language}>
                    <VacantSectionTitle title={copy.title} />
                </div>

                <div role="group" aria-label="Preferred Profile language" className="mb-2.5 flex shrink-0 gap-1">
                    {[
                        ['en', 'English'],
                        ['ko', '한국어'],
                    ].map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            lang={value}
                            aria-pressed={language === value}
                            aria-controls="preferred-profile-content"
                            onClick={() => setLanguage(value)}
                            className={`border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243044] focus-visible:ring-offset-2 ${
                                language === value
                                    ? 'border-[#172033] bg-[#172033] text-[#fffdf8]'
                                    : 'border-[#c8bead] bg-[#eee8dc] text-[#2f3847] hover:border-[#172033] hover:bg-[#e4dccd]'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div id="preferred-profile-content" lang={language}>
                <p className="mt-1 text-sm leading-5 text-[#404958]">
                    {copy.introduction}
                </p>

                <div className="mt-3 border border-[#b99a4b] bg-[#f1e7cf] p-3">
                    <h4 className="text-sm font-extrabold text-[#5b4315]">
                        {copy.policyTitle}
                    </h4>

                    <div className="mt-2 space-y-2 text-sm leading-5 text-[#4b3a1b]">
                        {copy.policies.map(policy => (
                            <p key={policy.id}>
                                <strong>{policy.label}:</strong>{' '}{policy.text}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-3 border border-[#b45a4a] bg-[#f4ded8] p-3">
                    <h4 className="text-sm font-extrabold text-[#87382c]">
                        {copy.statusTitle}
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-[#404958]">
                        <strong className="text-[#87382c]">{copy.closedText}</strong>{' '}
                        {copy.exceptionText}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="border border-[#b45a4a] bg-[#e8e2d4] px-2 py-1 text-[#746b5d] line-through">
                            {copy.doctoralStatus}
                        </span>
                        <span className="border border-[#d8d0c0] bg-[#e8e2d4] px-2 py-1 text-[#746b5d] line-through">
                            {copy.mastersStatus}
                        </span>
                        <span className="border border-[#b45a4a] bg-[#fffdf8] px-2 py-1 text-[#87382c]">
                            {copy.exceptionStatus}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

window.VacantPositionsTabContent = () => (
    <section className="space-y-5">
        <div>
            <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">
                Vacant Positions
            </h2>
        </div>

        <VacantPhilosophySection />
        <VacantPreferredProfileSection />

        <section className="tsi-section">
            <VacantSectionTitle title="Target Journals & Conferences" />

            <div className="mt-2 border border-[#d8d0c0] bg-[#fffdf8]">
                {[
                    [
                        'OR Journals',
                        'Management Science, Operations Research, European Journal of Operational Research, Annals of Operations Research, INFORMS Journal on Computing',
                    ],
                    [
                        'Finance Journals',
                        'Quantitative Finance, Journal of Portfolio Management, Journal of Financial and Quantitative Analysis, Finance Research Letters, Journal of Banking and Finance',
                    ],
                    [
                        'Other Journals',
                        'Neural Networks, Pattern Recognition, JMLR, TMLR, Nature Machine Intelligence, Machine Learning, International Journal of Forecasting',
                    ],
                    [
                        'Top Conferences',
                        'KDD, NeurIPS, ICLR, ICML, EMNLP, ACL, AAAI, AISTATS',
                    ],
                    [
                        'Info',
                        'When selecting publication venues, we prioritize academic prestige over quantitative rankings. This principle is especially crucial in AI, where numerical metrics such as JCR rankings do not always align with the most respected venues.',
                    ],
                ].map(([title, body]) => (
                    <div
                        key={title}
                        className="grid gap-1 border-b border-[#e9e2d5] px-3 py-2.5 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-4"
                    >
                        <h4 className="text-sm font-bold text-[#172033]">
                            {title}
                        </h4>

                        <p className="text-sm leading-5 text-[#404958]">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    </section>
);
