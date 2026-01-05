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
        <div className="mt-4 text-red-600 font-medium">
            <p className="font-bold mb-2">Important Notice on Recruitment & Membership:</p>
            <p className="mb-2">Recruitment for Lab Researchers and Master's thesis advisees is conducted separately.</p>
            
            <ul className="list-disc pl-5 space-y-1">
            <li>
                <span className="font-bold">Lab Researchers (Official Members; MS, PhD Candidate):</span> Candidates must contact the lab before admission or within two months.
            </li>
            <li>
                <span className="font-bold">Master's Thesis Track (Academic Service):</span> Selection occurs after six months. Please note that this track is an academic guidance role and does not confer official lab membership or a place on the Member list.
            </li>
            </ul>
        </div>
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
                <div><h4 className="font-semibold text-gray-800">Info</h4><p>When we decide where to submit our work, we prioritize the prestige of a journal or conference over its rankings. This is especially true in AI, where many 'journals' boast high impact factors (JCR ranking). However, we know that their high ranking is not a guarantee of their quality. Consequently, we prefer not to submit our work to journals, with only a few exceptions.   </p></div>
            </div>
        </div>
    </section>
);