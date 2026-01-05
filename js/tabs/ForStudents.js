const RecommendationsSection = () => {
    const recommendations = [
        { category: "Time-Series analysis", items: [{ text: "Time Series Analysis by James D. Hamilton", href: "https://www.jstor.org/stable/j.ctv14jx6sm" }] },
        { category: "Optimization", items: [{ text: "Convex Optimization by Stephen Boyd and Lieven Vandenberghe", href: "https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf" }, { text: "Optimization Methods in Finance by Gerard Cornuejols and Reha Tütüncü", href: "https://www.andrew.cmu.edu/user/gc0v/webpub/book.pdf" }, { text: "Introduction to Stochastic Programming by John R. Birge , François Louveaux", href: "https://link.springer.com/book/10.1007/978-1-4614-0237-4" }, { text: "Reinforcement Learning and Stochastic Optimization: A Unified Framework for Sequential Decisions by Warren B. Powell", href: "https://onlinelibrary.wiley.com/doi/book/10.1002/9781119815068" },] },
        { category: "ML/DL", items: [{ text: "Mathematical Engineering of Deep Learning by Benoit Liquet, Sarat Moka and Yoni Nazarathy", href: "https://deeplearningmath.org/" }, { text: "Alice's Adventures in a Differentiable Wonderland -- Volume I, A Tour of the Land by Simone Scardapane", href: "https://arxiv.org/abs/2404.17625" },] },
        { category: "Fundamental Books", items: [{ text: "Linear Algebra for Data Science by Wanmo Kang and Kyunghyun Cho", href: "https://kyunghyuncho.me/linear-algebra-for-data-science/" }, { text: "Introduction to Mathematical Statistics by Robert Hogg, Joseph McKean, Allen Craig", href: "https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf" }, { text: "Probability: Theory and Examples by Rick Durrett", href: "https://services.math.duke.edu/~rtd/PTE/PTE5_011119.pdf" }, { text: "Principles of Mathematical Analysis by Walter Rudin", href: "https://www.amazon.co.uk/Principles-Mathematical-Analysis-International-Mathematics/dp/0070856133/" }, { text: "Elements of Information Theory by Thomas M. Cover and Joy A. Thomas", href: "http://staff.ustc.edu.cn/~cgong821/Wiley.Interscience.Elements.of.Information.Theory.Jul.2006.eBook-DDU.pdf" },] },
        { category: "Finance", items: [{ text: "Introduction to Risk Parity and Budgeting by Thierry Roncalli", href: "http://www.thierry-roncalli.com/RiskParityBook.html" }, { text: "Quantitative Equity Portfolio Management by Ludwig B. Chincarini and Daehwan Kim", href: "https://www.amazon.com/Quantitative-Equity-Portfolio-Management-Second/dp/1264268920" }, { text: "Investment Science by David G. Luenberger", href: "https://www.amazon.com/Investment-Science-David-G-Luenberger/dp/0199740089" }, { text: "Are markets efficient? (Video) by Eugene Fama and Richard Thaler", href: "#" }, { text: "In Pursuit of the Perfect Portfolio (Video) by Harry M. Markowitz", href: "#" },] },
        { category: "Writing", items: [{ text: "How to ML Paper - A brief Guide by Jakob N. Foerster", href: "https://www.jakobfoerster.com/how-to-ml-paper" }, { text: "How to ML Rebuttal – A Brief Guide by Jakob N. Foerster", href: "https://www.jakobfoerster.com/how-to-rebuttal-ml-paper" }, { text: "How to ML Review — A brief Guide by Jakob N. Foerster", href: "https://www.jakobfoerster.com/how-to-review-ml-paper" }, { text: "Latex & Poster formatting Tips for Writing a Research Paper using LaTeX", href: "https://github.com/guanyingc/latex_paper_writing_tips" },] },
        { category: "Useful website", items: [{ text: "Paper Copilot: Whether the score received at the AI conference is relatively good or bad", href: "https://papercopilot.com/" }, { text: "Cite.GG: Find recent papers that reference the paper you're reading", href: "https://cite.gg/#/" }, { text: "AI Conference Deadline: Countdowns to top CV/NLP/ML/Robotics/AI conference deadlines", href: "https://huggingface.co/spaces/huggingface/ai-deadlines" }, { text: "Operation Research (Top publication): Google Scholar Metrics", href: "https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=eng_operationsresearch" }, { text: "Data Mining & Analysis (Top publication): Google Scholar Metrics", href: "https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=eng_datamininganalysis" }, { text: "Artificial Inteligence (Top publication): Google Scholar Metrics", href: "https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=eng_artificialintelligence" }, { text: "Finance (Top publication): Google Scholar Metrics", href: "https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=bus_finance" },], },
    ];
    return (
        <div>
            <h3 className="text-xl font-semibold">Recommended Books and Guides</h3>
            <div className="mt-2 space-y-4">
                {recommendations.map(rec => (
                    <div key={rec.category}>
                        <h4 className="font-semibold text-gray-800">{rec.category}</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1 mt-1">
                            {rec.items.map(item => (
                                <li key={item.text}>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.ForStudentsTabContent = () => (
    <section className="space-y-8">
        <RecommendationsSection />
    </section>
);