window.VacantPositionsTabContent = () => (
    <section className="space-y-8">
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
        
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold">Preferred Profile</h3>
            <p className="mt-2 text-gray-700">
                We are looking for students with solid mathematics and programming skills. Demonstrated excellence or active participation in data-science competitions (e.g., Dacon, Kaggle) is highly valued. Please note that achievements from the majority of domestic competitions and awards in South Korea are not considered.
            </p>

            {/* --- [수정된 부분 시작] 절취선 및 박사 과정 모집 강조 --- */}
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
            {/* --- [수정된 부분 끝] --- */}

        </div>

        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold">Ongoing Research</h3>
            <div className="mt-4 space-y-4 text-gray-700">
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">1) Conditional Portfolio Construction for Retail Investors</h4>
                    <p className="mt-1">
                        Retail investors often hold only one or two assets, which leaves them highly exposed to risk. We are developing an optimization method that, given a user’s current (small) holdings, recommends up to K additional assets to improve diversification.
                    </p>
                    <p className="mt-2 text-sm italic">
                        Prerequisites: familiarity with submodularity, the envelope theorem, and convex optimization.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">2) Financial Foundation Model</h4>
                    <p className="mt-1">
                        We aim to build a single model that, from OHLCV data, can handle multiple forecasting tasks—return, volume, and volatility—across assets from various countries, with strong zero-shot performance. This project requires a solid background in deep learning.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">3) Stop loss adjusted Label</h4>
                    <p className="mt-1">
                        Conventional labeling methods often fail to capture the path-dependent nature of financial returns, leading to suboptimal trading decisions. This project aims to develop an advanced labeling technique that dynamically adjusts for stop-loss and take-profit levels, better reflecting real-world trading scenarios. By creating more realistic training signals, we expect to significantly improve the risk-adjusted performance of machine learning-based trading strategies.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">4) How much alpha fits in a candle? </h4>
                    <p className="mt-1">
                        This research establishes the theoretical upper bound on the predictive information a single OHLCV bar contains about future market direction. We derive a hard, computable limit on the performance of any trading model, revealing how this limit is fundamentally constrained by the bar's duration and the market's underlying predictability.
                    </p>
                    <p className="mt-2 text-sm italic">
                        Prerequisites: familiarity with Probability and Stochastic Processes, Information Theory and Mathematical Statistics
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-lg text-gray-800">Additional Interests (DL)</h4>
                        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                            <li><strong>Finance:</strong> volume forecasting, limit order book (LOB) modeling</li>
                            <li><strong>Science:</strong> physics-informed neural networks (PINNs)</li>
                            <li><strong>Sports:</strong> sports betting modeling</li>
                            <li><strong>General time series:</strong> tokenization, mixture-of-expert</li>
                        </ul>
                    <p className="mt-2 text-sm">
                        These are the topics I’m most focused on at the moment.
                    </p>
                </div>
            </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold">(Mainly) Target Journals & Conference</h3>
            <div className="mt-2 space-y-3 text-gray-700 text-sm">
                <div><h4 className="font-semibold text-gray-800">OR Journals</h4><p>Management Science, Operations Research, European Journal of Operational Research, Annals of Operation Research, INFORMS Journal on Computing</p></div>
                <div><h4 className="font-semibold text-gray-800">Finance Journals</h4><p>Quantitative Finance, Journal of Portfolio Management, Journal of Financial and Quantitative Analysis, Finance Research Letters, Journal of Banking and Finance</p></div>
                <div><h4 className="font-semibold text-gray-800">Other Journals</h4><p>Neural Networks, Pattern Recognition, TMLR, Nature Machine Intelligence, Machine Learning, International Journal of Forecasting</p></div>
                <div><h4 className="font-semibold text-gray-800">Conference</h4><p>KDD, NeurIPS, ICLR, ICML, KDD, EMNLP, ACL, AAAI, AISTATS</p></div>
                <div><h4 className="font-semibold text-gray-800">Info</h4><p>When we decide where to submit our work, we prioritize the prestige of a journal or conference over its rankings. This is especially true in AI, where many 'journals' boast high impact factors (JCR ranking). However, we know that their high ranking is not a guarantee of their quality. Consequently, we prefer not to submit our work to journals, with only a few exceptions.    </p></div>
            </div>
        </div>
    </section>
);
