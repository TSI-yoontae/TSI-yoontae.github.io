const terminalModes = [
    { id: 'forecast', label: 'Forecast', description: 'EWMA forecast · 50 / 80% probability bands', hint: 'Move to set the origin. Click to resample.', aria: 'Simulated prices with a median forecast and 50 and 80 percent probability bands.' },
    { id: 'allocate', label: 'Allocate', description: 'Momentum allocation · equal-weight benchmark', hint: 'Move to inspect portfolio weights and returns.', aria: 'Simulated portfolio wealth compared with an equal-weight benchmark. Asset weights are stacked below.' },
    { id: 'book', label: 'Order book', description: 'Cumulative depth · spread · order flow', hint: 'Move to inspect bid and ask depth.', aria: 'Simulated cumulative bid and ask depth, with individual price-level quantities below.' },
];

const ResearchTerminal = () => {
    const [mode, setMode] = React.useState('forecast');
    const [paused, setPaused] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [unavailable, setUnavailable] = React.useState(false);
    const canvasRef = React.useRef(null);
    const engineRef = React.useRef(null);
    const tabsRef = React.useRef([]);
    const current = terminalModes.find(item => item.id === mode);

    React.useEffect(() => {
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const engine = window.TSITerminal.create(canvasRef.current, { reducedMotion: motion.matches });
        engineRef.current = engine;
        if (!engine) setUnavailable(true);
        const onPreference = event => setPaused(event.matches);
        motion.addEventListener('change', onPreference);
        return () => { motion.removeEventListener('change', onPreference); engine?.destroy(); engineRef.current = null; };
    }, []);
    React.useEffect(() => { engineRef.current?.setMode(mode); }, [mode]);
    React.useEffect(() => { engineRef.current?.setPaused(paused); }, [paused]);

    const selectByKey = (event, index) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? terminalModes.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : -1) + terminalModes.length) % terminalModes.length;
        setMode(terminalModes[next].id);
        tabsRef.current[next]?.focus();
    };

    return <section className="research-terminal" aria-labelledby="terminal-heading">
        <header className="terminal-header"><h2 id="terminal-heading"><span aria-hidden="true">◧</span> TSI / Terminal</h2><span className="simulation-label">Simulated data</span></header>
        <div className="terminal-tabs" role="tablist" aria-label="Terminal views">
            {terminalModes.map((item, index) => <button key={item.id} ref={node => { tabsRef.current[index] = node; }}
                id={'terminal-tab-' + item.id} type="button" role="tab" aria-selected={mode === item.id}
                aria-controls="terminal-panel" tabIndex={mode === item.id ? 0 : -1}
                onClick={() => setMode(item.id)} onKeyDown={event => selectByKey(event, index)}>
                <span aria-hidden="true">0{index + 1}</span>{item.label}
            </button>)}
        </div>
        <div id="terminal-panel" role="tabpanel" aria-labelledby={'terminal-tab-' + mode}>
            <div className="terminal-chart">
                <canvas ref={canvasRef} role="img" tabIndex="0" aria-label={current.aria} aria-describedby="terminal-keyboard">{current.aria}</canvas>
                {unavailable && <p className="terminal-unavailable">This browser cannot display the interactive chart.</p>}
            </div>
            <div className="terminal-caption"><p>{current.description}</p><p>{current.hint}</p></div>
        </div>
        <div className="terminal-actions">
            <span>Illustrative · no market feed</span>
            <button type="button" disabled={unavailable} aria-label={paused ? 'Play simulation' : 'Pause simulation'} onClick={() => setPaused(value => !value)}>
                <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? 'Play' : 'Pause'}
            </button>
        </div>
        <p id="terminal-keyboard" className="sr-only">Use left and right arrow keys on the chart to inspect data. In Forecast, press Enter to resample. Escape clears the inspection.</p>
    </section>;
};
