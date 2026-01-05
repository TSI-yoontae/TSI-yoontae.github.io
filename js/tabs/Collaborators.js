const { useState, useEffect, useRef } = React;

window.CollaboratorTabContent = () => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [legendData, setLegendData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedAffiliation, setHighlightedAffiliation] = useState(null); 
    const d3Graph = useRef({}); 
    
    const allPapers = window.TSI_Data.allPapers;
    const collaboratorInfo = window.TSI_Data.collaboratorInfo;

    // Effect for D3 Graph Setup
    useEffect(() => {
        const allowedNames = new Set([
            "Yoontae Hwang", "Yaxuan Kong", "Yiyuan Yang", "Stefan Zohren",
            "Wenjie Du", "Zhangyang Wang", "Ming Jin", "Qingsong Wen", "Yongjae Lee", 
            "Seulki Lee", "Dong-Young Lim", "Junhyeong Lee", "Joohwan Hong", 
            "Frank J Fabozzi", "Jang Ho Kim", "Jaeho Kim", "Seok-ju Hahn", 
            "Suhyeon Kim", "Junghye Lee"
        ]);
        const authorPhotos = { "Yoontae Hwang": "/image_yoontae.png", "Youngbin Lee": "/youngbin.png", "Yejin Kim": "/Yejin.jpg" };
        let nodes = {};
        let links = {};
        const affiliations = new Set();
        allPapers.forEach(paper => {
            const authors = paper.authors.map(a => a.name.replace('*', '').trim()).filter(name => allowedNames.has(name));
            for (let i = 0; i < authors.length; i++) {
                for (let j = i + 1; j < authors.length; j++) {
                    const sourceName = authors[i];
                    const targetName = authors[j];
                    const key = [sourceName, targetName].sort().join("-");
                    [sourceName, targetName].forEach(name => {
                        if (!nodes[name]) {
                            const info = collaboratorInfo[name] || { affiliation: "Unknown", scholar: null };
                            nodes[name] = { id: name, collaborations: 0, photo: authorPhotos[name], affiliation: info.affiliation, scholar: info.scholar };
                            affiliations.add(info.affiliation);
                        }
                        nodes[name].collaborations++;
                    });
                    if (links[key]) {
                        links[key].value++;
                    } else {
                        links[key] = { source: sourceName, target: targetName, value: 1 };
                    }
                }
            }
        });
        const graphData = { nodes: Object.values(nodes), links: Object.values(links) };
        
        // D3 Setup
        const container = containerRef.current;
        if (!container) return;
        
        d3.select(svgRef.current).selectAll("*").remove();

        const width = container.clientWidth || 800;
        const height = 600;
        
        const customColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5'];
        const affiliationColor = d3.scaleOrdinal(customColors).domain(Array.from(affiliations).sort());
        setLegendData(affiliationColor.domain().map(d => ({ color: affiliationColor(d), name: d })));

        const simulation = d3.forceSimulation(graphData.nodes)
            .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-350))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(d => (d.id === "Yoontae Hwang" ? 30 : 5 + Math.sqrt(d.collaborations) * 3) + 15));

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("preserveAspectRatio", "xMidYMid meet");

        const stars = d3.range(250).map(() => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.2, delay: Math.random() * 5 + 's' }));
        svg.append("g").attr("class", "star-group").selectAll("circle").data(stars).join("circle").attr("class", "star").attr("cx", d => d.x).attr("cy", d => d.y).attr("r", d => d.r).style("animation-delay", d => d.delay);

        const defs = svg.append('defs');
        graphData.nodes.forEach(node => {
            if (node.photo) {
                defs.append('pattern').attr('id', 'img-' + node.id.replace(/\s+/g, '-')).attr('width', 1).attr('height', 1)
                    .append('image').attr('xlink:href', node.photo).attr('x', 0).attr('y', 0).attr('width', 50).attr('height', 50)
                    .on("error", function() { d3.select(this).attr("xlink:href", "https://placehold.co/50x50/020617/e2e8f0?text=?"); });
            }
        });

        d3Graph.current.link = svg.append("g").attr("class", "links").selectAll("line").data(graphData.links).join("line").attr("stroke-width", d => 1 + Math.sqrt(d.value));
        d3Graph.current.node = svg.append("g").attr("class", "nodes").selectAll("g").data(graphData.nodes).join("g").call(drag(simulation));
        
        d3Graph.current.node.append("circle").attr("class", "glow").attr("r", d => (d.id === "Yoontae Hwang" ? 30 : (5 + Math.sqrt(d.collaborations) * 3) + 4)).attr("fill", d => d.id === "Yoontae Hwang" ? "#f59e0b" : affiliationColor(d.affiliation)).attr("stroke", d => d.id === "Yoontae Hwang" ? "#f59e0b" : affiliationColor(d.affiliation));
        d3Graph.current.node.append("circle").attr("class", "main-circle").attr("r", d => d.id === "Yoontae Hwang" ? 25 : 5 + Math.sqrt(d.collaborations) * 3).attr("fill", d => d.photo ? `url(#img-${d.id.replace(/\s+/g, '-')})` : affiliationColor(d.affiliation)).style("cursor", d => d.scholar ? "pointer" : "default").on("click", (event, d) => { if (d.scholar) { window.open(d.scholar, "_blank", "noopener,noreferrer"); } });
        
        d3Graph.current.labels = d3Graph.current.node.append("text").attr("class", "node-label").text(d => d.id).attr("x", d => (d.id === "Yoontae Hwang" ? 25 : 5 + Math.sqrt(d.collaborations) * 3) + 5).attr("y", 4);
        d3Graph.current.node.append("title").text(d => `${d.id}\nAffiliation: ${d.affiliation}`);

        const linkedByIndex = {};
        graphData.links.forEach(d => { linkedByIndex[`${d.source.index},${d.target.index}`] = 1; });
        const isConnected = (a, b) => linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;

        d3Graph.current.node.on("mouseover", function (event, d) {
            if (searchTerm || highlightedAffiliation) return; 
            d3Graph.current.node.style("opacity", o => isConnected(d, o) ? 1 : 0.15);
            d3Graph.current.link.style("stroke-opacity", o => o.source === d || o.target === d ? 0.9 : 0.1).style("stroke", o => o.source === d || o.target === d ? "#f1f5f9" : "rgba(156, 163, 175, 0.4)");
            d3Graph.current.labels.style("opacity", o => isConnected(d, o) ? 1 : 0.15);
            d3.select(this).style("opacity", 1);
        }).on("mouseout", () => {
            if (searchTerm || highlightedAffiliation) return; 
            d3Graph.current.node.style("opacity", 1);
            d3Graph.current.link.style("stroke-opacity", 1).style("stroke", "rgba(156, 163, 175, 0.4)");
            d3Graph.current.labels.style("opacity", 1);
        });

        simulation.on("tick", () => {
            d3Graph.current.link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
            d3Graph.current.node.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        function drag(simulation) { 
            function dragstarted(event) { if (!event.active) simulation.alphaTarget(0.3).restart(); event.subject.fx = event.subject.x; event.subject.fy = event.subject.y; }
            function dragged(event) { event.subject.fx = event.x; event.subject.fy = event.y; }
            function dragended(event) { if (!event.active) simulation.alphaTarget(0); event.subject.fx = null; event.subject.fy = null; }
            return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
        }

        const handleResize = () => { 
            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                if (newWidth > 0) {
                    svg.attr("viewBox", [0, 0, newWidth, height]);
                    svg.selectAll(".star-group").remove();
                    const newStars = d3.range(250).map(() => ({ x: Math.random() * newWidth, y: Math.random() * height, r: Math.random() * 1.2, delay: Math.random() * 5 + 's'}));
                    svg.insert("g", ":first-child").attr("class", "star-group").selectAll("circle").data(newStars).join("circle").attr("class", "star").attr("cx", d => d.x).attr("cy", d => d.y).attr("r", d => d.r).style("animation-delay", d => d.delay);
                    simulation.force("center", d3.forceCenter(newWidth / 2, height / 2));
                    simulation.alpha(0.3).restart();
                }
            }
        };
        window.addEventListener('resize', handleResize);
        const initTimer = setTimeout(handleResize, 100);

        return () => {
            clearTimeout(initTimer);
            window.removeEventListener('resize', handleResize);
            simulation.stop();
        };
    }, []);

    // Effect for Search Functionality
    useEffect(() => {
        if (!d3Graph.current.node) return;
        
        const term = searchTerm.toLowerCase();

        if (term === "") {
            if (!highlightedAffiliation) {
                d3Graph.current.node.style("opacity", 1);
                d3Graph.current.link.style("stroke-opacity", 1).style("stroke", "rgba(156, 163, 175, 0.4)");
                d3Graph.current.labels.style("opacity", 1);
            }
            return;
        }

        const matchingNodeData = d3Graph.current.node.data().filter(d => d.id.toLowerCase().includes(term));
        const matchingNodeIds = new Set(matchingNodeData.map(d => d.id));

        d3Graph.current.node.style("opacity", d => matchingNodeIds.has(d.id) ? 1 : 0.1);
        d3Graph.current.link
            .style("stroke-opacity", d => (matchingNodeIds.has(d.source.id) && matchingNodeIds.has(d.target.id)) ? 0.9 : 0.05)
            .style("stroke", d => (matchingNodeIds.has(d.source.id) && matchingNodeIds.has(d.target.id)) ? "#f1f5f9" : "rgba(156, 163, 175, 0.4)");
        d3Graph.current.labels.style("opacity", d => matchingNodeIds.has(d.id) ? 1 : 0.1);

    }, [searchTerm]);

    // Effect for Legend Highlighting
    useEffect(() => {
        if (!d3Graph.current.node || searchTerm) return; 

        if (!highlightedAffiliation) {
            d3Graph.current.node.style("opacity", 1);
            d3Graph.current.link.style("stroke-opacity", 1).style("stroke", "rgba(156, 163, 175, 0.4)");
            d3Graph.current.labels.style("opacity", 1);
            return;
        }

        const isAffiliationHighlighted = (d) => d.affiliation === highlightedAffiliation;

        d3Graph.current.node.style("opacity", d => isAffiliationHighlighted(d) ? 1 : 0.1);
        d3Graph.current.labels.style("opacity", d => isAffiliationHighlighted(d) ? 1 : 0.1);
        d3Graph.current.link
            .style("stroke-opacity", d => (isAffiliationHighlighted(d.source) || isAffiliationHighlighted(d.target)) ? 0.9 : 0.05)
            .style("stroke", d => (isAffiliationHighlighted(d.source) || isAffiliationHighlighted(d.target)) ? "#f1f5f9" : "rgba(156, 163, 175, 0.4)");

    }, [highlightedAffiliation, searchTerm]);

    const handleLegendClick = (affiliation) => {
        setSearchTerm(''); 
        setHighlightedAffiliation(prev => prev === affiliation ? null : affiliation);
    };

    return (
        <section>
            <h2 className="text-2xl font-semibold">Collaboration Network (Ph.D Level)</h2>
            <p className="mt-2 text-sm text-gray-600">
                This graph visualizes the collaboration network based on my publications (Note: The network includes collaborators at the Ph.D. level and above). Each node represents a co-author, and its color indicates their affiliation. The size of the node corresponds to the number of collaborations. Click on a collaborator's node to view their profile. You can also click on a legend item to highlight an affiliation.
            </p>
            
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search collaborator by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setHighlightedAffiliation(null); 
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
            </div>

            <div ref={containerRef} className="w-full h-[600px] rounded-lg shadow-md graph-container">
                <svg ref={svgRef} className="w-full h-full"></svg>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mt-4 p-2 bg-gray-100 rounded-lg">
                {legendData.map(item => (
                    <button
                        key={item.name}
                        onClick={() => handleLegendClick(item.name)}
                        className={`flex items-center text-xs transition-all duration-300 rounded-full px-3 py-1 cursor-pointer ${
                            highlightedAffiliation === item.name ? 'bg-white ring-2 ring-purple-500 shadow-lg' : 'bg-gray-200'
                        } ${
                            highlightedAffiliation && highlightedAffiliation !== item.name ? 'opacity-40 hover:opacity-100' : 'opacity-100 hover:bg-gray-300'
                        }`}
                    >
                        <div className="w-3 h-3 rounded-full mr-1.5 shadow-inner flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                    </button>
                ))}
                {highlightedAffiliation && (
                    <button
                        onClick={() => setHighlightedAffiliation(null)}
                        className="text-xs text-purple-600 font-semibold hover:underline ml-2"
                    >
                        Reset View
                    </button>
                )}
            </div>
        </section>
    );
};