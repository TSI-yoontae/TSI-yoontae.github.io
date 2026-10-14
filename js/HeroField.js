const HeroField = () => {
    const hostRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const controlsRef = React.useRef(null);
    const [paused, setPaused] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [available, setAvailable] = React.useState(true);

    React.useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d', { alpha: true });
        if (!host || !canvas || !context) {
            setAvailable(false);
            return;
        }

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const frameInterval = 1000 / 30;
        let width = 0;
        let height = 0;
        let ratio = 1;
        let frame = 0;
        let lastDraw = 0;
        let phase = 0;
        let stopped = paused;
        let inView = true;
        let disposed = false;
        const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

        // A folded surface, not a chart: depth is carried by strand spacing and light.
        const pointAt = (u, v, time) => {
            const bend = Math.sin(u * 2.25 + time) * .31;
            const fold = Math.exp(-Math.pow((u + .05) * 1.45, 2));
            const x = u * 1.42 + v * .17;
            const y = v * .61 + bend + Math.sin(v * 2.3 + u * 1.6 + time * .32) * fold * .22;
            const z = Math.cos(u * 1.8 + time * .7) * .29 + Math.sin(v * 2.1 + u * .85) * .24;
            const turn = -.13 + pointer.x * .035;
            const tilt = -.22 + pointer.y * .025;
            const turnedX = x * Math.cos(turn) + z * Math.sin(turn);
            const turnedZ = -x * Math.sin(turn) + z * Math.cos(turn);
            const liftedY = y * Math.cos(tilt) - turnedZ * Math.sin(tilt);
            const depth = y * Math.sin(tilt) + turnedZ * Math.cos(tilt);
            const perspective = 1 / (1 + depth * .13);
            return {
                x: width * (.5 + turnedX * perspective * .307),
                y: height * (.46 + liftedY * perspective * .34),
                depth,
            };
        };

        const draw = () => {
            if (!width || !height || disposed) return;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, width, height);
            context.lineCap = 'round';
            context.lineJoin = 'round';

            // The brightest edge is deliberately narrow; the navy remains dominant.
            const rows = width < 400 ? 31 : 43;
            const steps = width < 400 ? 72 : 92;
            for (let row = 0; row < rows; row += 1) {
                const v = -1 + (row / (rows - 1)) * 2;
                const edgeFade = Math.pow(Math.sin(Math.PI * row / (rows - 1)), .6);
                const light = .14 + edgeFade * .37;
                const gradient = context.createLinearGradient(width * .03, 0, width * .98, 0);
                gradient.addColorStop(0, 'rgba(207,214,224,0)');
                gradient.addColorStop(.16, `rgba(168,180,196,${light * .45})`);
                gradient.addColorStop(.43, `rgba(235,240,246,${light})`);
                gradient.addColorStop(.7, `rgba(185,197,211,${light * .7})`);
                gradient.addColorStop(1, 'rgba(207,214,224,0)');
                context.strokeStyle = gradient;
                context.lineWidth = row === Math.floor(rows * .47) ? 1.12 : .64;
                context.beginPath();
                for (let step = 0; step <= steps; step += 1) {
                    const u = -1 + (step / steps) * 2;
                    const point = pointAt(u, v, phase);
                    if (step === 0) context.moveTo(point.x, point.y);
                    else context.lineTo(point.x, point.y);
                }
                context.stroke();
            }

            // Sparse cross-strands reveal the surface without turning it into a grid.
            context.lineWidth = .45;
            for (let column = 0; column < 17; column += 1) {
                const u = -1 + column / 8;
                const edgeFade = Math.sin((column / 16) * Math.PI);
                context.strokeStyle = `rgba(193,204,218,${edgeFade * .075})`;
                context.beginPath();
                for (let step = 0; step <= 30; step += 1) {
                    const point = pointAt(u, -1 + step / 15, phase);
                    if (!step) context.moveTo(point.x, point.y);
                    else context.lineTo(point.x, point.y);
                }
                context.stroke();
            }

            // A few quiet highlights along the fold give the silver field depth.
            for (let i = 0; i < 26; i += 1) {
                const u = -.83 + (i / 25) * 1.66;
                const v = Math.sin(i * 2.399) * .88;
                const point = pointAt(u, v, phase);
                const light = Math.sin(Math.PI * (i + 1) / 27) * .35;
                context.fillStyle = `rgba(235,240,247,${light})`;
                context.beginPath();
                context.arc(point.x, point.y, i % 7 === 0 ? 1.05 : .62, 0, Math.PI * 2);
                context.fill();
            }
        };

        const canAnimate = () => !disposed && !stopped && inView && !document.hidden && width > 0 && height > 0;
        const stopLoop = () => {
            if (frame) window.cancelAnimationFrame(frame);
            frame = 0;
            lastDraw = 0;
        };
        const tick = now => {
            frame = 0;
            if (!canAnimate()) { lastDraw = 0; return; }
            const elapsed = lastDraw ? now - lastDraw : frameInterval;
            if (elapsed >= frameInterval) {
                phase += Math.min(elapsed, 80) * .000065;
                pointer.x += (pointer.targetX - pointer.x) * .045;
                pointer.y += (pointer.targetY - pointer.y) * .045;
                draw();
                lastDraw = now;
            }
            frame = window.requestAnimationFrame(tick);
        };
        const syncLoop = () => {
            if (!canAnimate()) stopLoop();
            else if (!frame) frame = window.requestAnimationFrame(tick);
        };
        const resize = () => {
            const bounds = host.getBoundingClientRect();
            width = Math.max(0, bounds.width);
            height = Math.max(0, bounds.height);
            ratio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.max(1, Math.round(width * ratio));
            canvas.height = Math.max(1, Math.round(height * ratio));
            draw();
            syncLoop();
        };
        const pointerMove = event => {
            if (stopped || motionPreference.matches || event.pointerType === 'touch') return;
            const bounds = canvas.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            pointer.targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
            pointer.targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        };
        const pointerLeave = () => { pointer.targetX = 0; pointer.targetY = 0; };
        const preferenceChange = event => { if (event.matches) setPaused(true); };
        const visibilityChange = () => syncLoop();
        const intersection = new IntersectionObserver(entries => {
            inView = entries[0]?.isIntersecting || false;
            syncLoop();
        }, { threshold: 0 });
        const sizing = new ResizeObserver(resize);

        controlsRef.current = {
            setPaused(value) {
                stopped = value;
                if (value) pointerLeave();
                syncLoop();
            },
        };
        canvas.addEventListener('pointermove', pointerMove, { passive: true });
        canvas.addEventListener('pointerleave', pointerLeave);
        document.addEventListener('visibilitychange', visibilityChange);
        motionPreference.addEventListener('change', preferenceChange);
        intersection.observe(host);
        sizing.observe(host);
        resize();

        return () => {
            disposed = true;
            stopLoop();
            intersection.disconnect();
            sizing.disconnect();
            canvas.removeEventListener('pointermove', pointerMove);
            canvas.removeEventListener('pointerleave', pointerLeave);
            document.removeEventListener('visibilitychange', visibilityChange);
            motionPreference.removeEventListener('change', preferenceChange);
            controlsRef.current = null;
        };
    }, []);

    React.useEffect(() => { controlsRef.current?.setPaused(paused); }, [paused]);

    return <div className="hero-field" ref={hostRef} style={{ position: 'relative' }}>
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <button type="button" className="hero-motion-toggle" disabled={!available}
            style={{ position: 'absolute', right: 12, bottom: 12, zIndex: 1 }}
            aria-label={paused ? 'Play background motion' : 'Pause background motion'}
            onClick={() => setPaused(value => !value)}>
            {available ? (paused ? 'Play motion' : 'Pause motion') : 'Motion unavailable'}
        </button>
    </div>;
};
