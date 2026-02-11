window.VacantPositionsTabContent = () => (
    <section className="space-y-8">
        {/* 1. 상단 Vacant Positions 섹션 */}
        <div>
            <h2 className="text-2xl font-semibold">Vacant Positions</h2>
            <p className="text-gray-700 mt-2">
                TSI Lab is actively recruiting passionate researchers and students!<br />
                We welcome applicants for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>PhD Students</li>
                <li>MS Students</li>
                <li>Interns (Undergraduate)</li>
            </ul>
            <p className="pt-2 text-gray-700">
                If you're interested in joining, please send your CV and a short statement of interest to
                <a href="mailto:yoontae.hwang@pusan.ac.kr" className="text-blue-600 hover:underline ml-1">yoontae.hwang@pusan.ac.kr</a>
            </p>
        </div>

        {/* 2. Preferred Profile 및 모집 현황 섹션 */}
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold">Preferred Profile</h3>
            <p className="mt-2 text-gray-700">
                We are looking for students with solid mathematics and programming skills. Demonstrated excellence or active participation in data-science competitions (e.g., Dacon, Kaggle) is highly valued. Please note that achievements from the majority of domestic competitions and awards in South Korea are not considered.
            </p>

            {/* --- [수정된 부분: 톤앤매너 완화 및 구체화] --- */}
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 shadow-sm">
                <h4 className="font-bold text-amber-800 text-sm uppercase mb-2">
                    ⚠️ Important Admission & Funding Policy
                </h4>
                <div className="text-sm text-amber-900 space-y-2">
                    <p>
                        <strong>Strict Pre-contact Requirement:</strong> Unlike general university regulations, official membership in TSI Lab is <strong>strictly limited</strong> to students who have successfully completed the pre-contact process (confirmed within 3 months of admission).
                    </p>
                    <p>
                        <strong>Financial Support Policy:</strong> Students joining without this prior arrangement may still receive academic supervision for their degree research. However, please be aware that <span className="font-bold underline">additional financial support funded by the laboratory (e.g., monthly stipends) will be minimal or unavailable</span> for students who have not completed the pre-contact process.
                    </p>
                </div>
            </div>
            {/* --- [수정된 부분 끝] --- */}

            <div className="mt-8">
                {/* 절취선 (Cut Line) */}
                <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm tracking-wide font-medium">CURRENT STATUS</span>
                    <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
                </div>

                {/* 모집 공지 박스 */}
                <div className="bg-red-50 border border-red-100 rounded-lg p-5 text-center shadow-sm">
                    <h4 className="text-red-700 font-bold text-lg flex justify-center items-center gap-2">
                        <span>🚫</span> MS & Intern Recruitment Closed
                    </h4>

                    <p className="mt-3 text-gray-800 font-medium">
                        We are currently <span className="text-red-600 font-bold underline decoration-2 underline-offset-2">exclusively recruiting PhD students</span>.
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        (Including MS-PhD Integrated Course applicants)
                    </p>

                    <div className="mt-4 flex justify-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-white border border-red-200 rounded-full text-red-600 font-semibold">
                            ✅ PhD / Integrated: Open
                        </span>
                        <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-400 line-through decoration-gray-400">
                            MS / Interns
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Target Journals 섹션 */}
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold">(Mainly) Target Journals & Conference</h3>
            <div className="mt-2 space-y-3 text-gray-700 text-sm">
                <div><h4 className="font-semibold text-gray-800">OR Journals</h4><p>Management Science, Operations Research, European Journal of Operational Research, Annals of Operation Research, INFORMS Journal on Computing</p></div>
                <div><h4 className="font-semibold text-gray-800">Finance Journals</h4><p>Quantitative Finance, Journal of Portfolio Management, Journal of Financial and Quantitative Analysis, Finance Research Letters, Journal of Banking and Finance</p></div>
                <div><h4 className="font-semibold text-gray-800">Other Journals</h4><p>Neural Networks, Pattern Recognition, TMLR, Nature Machine Intelligence, Machine Learning, International Journal of Forecasting</p></div>
                <div><h4 className="font-semibold text-gray-800">Conference</h4><p>KDD, NeurIPS, ICLR, ICML, KDD, EMNLP, ACL, AAAI, AISTATS</p></div>
                <div><h4 className="font-semibold text-gray-800">Info</h4><p>When we decide where to submit our work, we prioritize the prestige of a journal or conference over its rankings. This is especially true in AI, where many 'journals' boast high impact factors (JCR ranking). However, we know that their high ranking is not a guarantee of their quality. Consequently, we prefer not to submit our work to journals, with only a few exceptions.</p></div>
            </div>
        </div>
    </section>
);
