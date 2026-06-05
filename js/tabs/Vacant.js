const VacantSectionTitle = ({ title, description }) => (
    <div className="mb-2.5">
        <h3 className="text-lg font-extrabold tracking-tight text-[#172033]">{title}</h3>
        {description && <p className="mt-1 text-sm leading-5 text-[#5e6676]">{description}</p>}
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
                “Research is meaningful only when its insights leave the lab and change the world.”
            </blockquote>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {[
                    ['Impact-driven', 'Start from concrete problems in finance and markets.'],
                    ['Academically rigorous', 'Build methods and evidence that stand up to top-tier review.'],
                    ['Open and collaborative', 'Share ideas, code, and results when possible.'],
                ].map(([title, body]) => (
                    <div key={title} className="border-t border-[#d8d0c0] pt-2 md:border-l md:border-t-0 md:pl-3 md:pt-0">
                        <h4 className="text-sm font-bold text-[#172033]">{title}</h4>
                        <p className="mt-0.5 text-sm leading-5 text-[#5e6676]">{body}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

window.VacantPositionsTabContent = () => (
    <section className="space-y-5">
        <div>
            <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">Vacant Positions</h2>
            <p className="mt-1 text-sm leading-5 text-[#404958]">
                TSI Lab is actively recruiting passionate researchers and students. We welcome applicants for PhD students, MS students, and undergraduate interns.
            </p>
            <p className="mt-1 text-sm leading-5 text-[#404958]">
                Interested applicants should send a CV and a short statement of interest to
                <a href="mailto:yoontae.hwang@pusan.ac.kr" className="ml-1 tsi-link">yoontae.hwang@pusan.ac.kr</a>.
            </p>
        </div>

        <VacantPhilosophySection />

        <section className="tsi-section">
            <VacantSectionTitle title="Preferred Profile (Updated June 2026" />
            <p className="mt-1 text-sm leading-5 text-[#404958]">
                We are looking for students with solid mathematics and programming skills. Demonstrated excellence or active participation in data-science competitions such as Dacon or Kaggle is highly valued. Achievements from the majority of domestic competitions and awards in South Korea are not considered.
            </p>

            <div className="mt-3 border border-[#b99a4b] bg-[#f1e7cf] p-3">
                <h4 className="text-sm font-extrabold text-[#5b4315]">Important Admission, Funding & Graduation Policy</h4>
                <div className="mt-2 space-y-2 text-sm leading-5 text-[#4b3a1b]">
                    <p>
                        <strong>Strict Pre-contact Requirement:</strong> Unlike general university regulations, official membership in TSI Lab is strictly limited to students who have successfully completed the pre-contact process, confirmed within 1 month of admission.
                    </p>
                    <p>
                        <strong>Financial Support Policy:</strong> Students joining without this prior arrangement may still receive academic supervision for their degree research. However, additional financial support funded by the laboratory will be minimal or unavailable for students who have not completed the pre-contact process.
                    </p>
                    <p>
                        <strong>Graduation Policy (MS):</strong> If the thesis work does not meet the advisor's standards, graduation may not be possible within exactly 4 semesters.
                    </p>
                    <p>
                        <strong>Graduation Policy (PhD & Integrated):</strong> Candidates are required to publish at least two paper in a top-tier AI conference. A total of 3 or more publications, including the target journals listed below, are required for graduation.
                    </p>
                </div>
            </div>

            <div className="mt-3 border border-[#b45a4a] bg-[#f4ded8] p-3">
                <h4 className="text-sm font-extrabold text-[#87382c]">Current Status: MS & Intern Recruitment Closed</h4>
                <p className="mt-1 text-sm leading-5 text-[#404958]">
                    We are currently <span className="font-bold text-[#87382c] underline decoration-[#b45a4a]">exclusively recruiting PhD students</span>, including MS-PhD integrated course applicants.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="border border-[#b45a4a] bg-[#fffdf8] px-2 py-1 text-[#87382c]">PhD / Integrated: Open</span>
                    <span className="border border-[#d8d0c0] bg-[#e8e2d4] px-2 py-1 text-[#746b5d] line-through">MS / Interns</span>
                </div>
            </div>
        </section>

        <section className="tsi-section">
            <VacantSectionTitle title="Target Journals & Conferences" />
            <div className="mt-2 border border-[#d8d0c0] bg-[#fffdf8]">
                {[
                    ['OR Journals', 'Management Science, Operations Research, European Journal of Operational Research, Annals of Operation Research, INFORMS Journal on Computing'],
                    ['Finance Journals', 'Quantitative Finance, Journal of Portfolio Management, Journal of Financial and Quantitative Analysis, Finance Research Letters, Journal of Banking and Finance'],
                    ['Other Journals', 'Neural Networks, Pattern Recognition, TMLR, Nature Machine Intelligence, Machine Learning, International Journal of Forecasting'],
                    ['Conference', 'KDD, NeurIPS, ICLR, ICML, EMNLP, ACL, AAAI, AISTATS'],
                    ['Info', "When we decide where to submit our work, we prioritize the prestige of a journal or conference over its rankings. This is especially true in AI, where many journals have high impact factors but are not necessarily preferred publication venues."],
                ].map(([title, body]) => (
                    <div key={title} className="grid gap-1 border-b border-[#e9e2d5] px-3 py-2.5 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-4">
                        <h4 className="text-sm font-bold text-[#172033]">{title}</h4>
                        <p className="text-sm leading-5 text-[#404958]">{body}</p>
                    </div>
                ))}
            </div>
        </section>
    </section>
);
