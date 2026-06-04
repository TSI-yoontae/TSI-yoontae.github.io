window.VacantPositionsTabContent = () => (
    <section className="space-y-5">
        <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Vacant Positions</h2>
            <p className="mt-1 text-sm leading-5 text-slate-700">
                TSI Lab is actively recruiting passionate researchers and students. We welcome applicants for PhD students, MS students, and undergraduate interns.
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-700">
                Interested applicants should send a CV and a short statement of interest to
                <a href="mailto:yoontae.hwang@pusan.ac.kr" className="ml-1 font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-900">yoontae.hwang@pusan.ac.kr</a>.
            </p>
        </div>

        <section className="tsi-section">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-950">Preferred Profile</h3>
            <p className="mt-1 text-sm leading-5 text-slate-700">
                We are looking for students with solid mathematics and programming skills. Demonstrated excellence or active participation in data-science competitions such as Dacon or Kaggle is highly valued. Achievements from the majority of domestic competitions and awards in South Korea are not considered.
            </p>

            <div className="mt-3 border border-amber-300 bg-amber-50 p-3">
                <h4 className="text-sm font-extrabold text-amber-900">Important Admission, Funding & Graduation Policy</h4>
                <div className="mt-2 space-y-2 text-sm leading-5 text-amber-950">
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
                        <strong>Graduation Policy (PhD & Integrated):</strong> Candidates are required to publish at least one paper in a top-tier AI conference. A total of 2 or more publications, including the target journals listed below, are required for graduation.
                    </p>
                </div>
            </div>

            <div className="mt-3 border border-red-200 bg-red-50 p-3">
                <h4 className="text-sm font-extrabold text-red-700">Current Status: MS & Intern Recruitment Closed</h4>
                <p className="mt-1 text-sm leading-5 text-slate-800">
                    We are currently <span className="font-bold text-red-700 underline decoration-red-300">exclusively recruiting PhD students</span>, including MS-PhD integrated course applicants.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="border border-red-200 bg-white px-2 py-1 text-red-700">PhD / Integrated: Open</span>
                    <span className="border border-slate-200 bg-slate-100 px-2 py-1 text-slate-400 line-through">MS / Interns</span>
                </div>
            </div>
        </section>

        <section className="tsi-section">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-950">Target Journals & Conferences</h3>
            <div className="mt-2 border border-slate-200 bg-white">
                {[
                    ['OR Journals', 'Management Science, Operations Research, European Journal of Operational Research, Annals of Operation Research, INFORMS Journal on Computing'],
                    ['Finance Journals', 'Quantitative Finance, Journal of Portfolio Management, Journal of Financial and Quantitative Analysis, Finance Research Letters, Journal of Banking and Finance'],
                    ['Other Journals', 'Neural Networks, Pattern Recognition, TMLR, Nature Machine Intelligence, Machine Learning, International Journal of Forecasting'],
                    ['Conference', 'KDD, NeurIPS, ICLR, ICML, EMNLP, ACL, AAAI, AISTATS'],
                    ['Info', "When we decide where to submit our work, we prioritize the prestige of a journal or conference over its rankings. This is especially true in AI, where many journals have high impact factors but are not necessarily preferred publication venues."],
                ].map(([title, body]) => (
                    <div key={title} className="grid gap-1 border-b border-slate-100 px-3 py-2.5 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-4">
                        <h4 className="text-sm font-bold text-slate-950">{title}</h4>
                        <p className="text-sm leading-5 text-slate-700">{body}</p>
                    </div>
                ))}
            </div>
        </section>
    </section>
);
